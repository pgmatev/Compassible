import { View, Text } from "react-native";
import { useAsync } from "../hooks/useAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { io } from "socket.io-client";

import { useNavigation } from "@react-navigation/native";

export interface Answer {
  answer: string;
  createdAt?: string;
  id: number;
  questionId: number;
  updatedAt?: string;
}

const socket = io("ws://10.108.7.89:3001");

export function Home() {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  useEffect(() => {
    socket.connect();
    // console.log("socket after connect", socket);

    socket.on("session", ({ userId }) => {
      console.log("session,", userId);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [question, setQuestion] = useState<string>();
  const [answers, setAnswers] = useState<Answer[]>();
  const { loading } = useAsync(async () => {
    const response = await fetch(`${baseUrl}/questions`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get question");
    }

    const data = await response.json();

    setQuestion(JSON.stringify(data.question));
    setAnswers(data.answers);
  }, []);

  const { navigate } = useNavigation();

  const { trigger: handleSubmit } = useAsyncAction(async (answer: Answer) => {
    const userId = await AsyncStorage.getItem("userId");

    const response = await fetch(`${baseUrl}/questions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answerId: answer.id, userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to answer");
    }

    navigate("Session");
  });

  if (loading || !answers || !question) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <RadioButtonGroup
        question={question}
        answers={answers}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

// const styles = StyleSheet.create({});
