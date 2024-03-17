import { View, Text } from "react-native";
import { useAsync } from "../hooks/useAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useAsyncAction } from "../hooks/useAsyncAction";

export interface Answer {
  answer: string;
  createdAt?: string;
  id: number;
  questionId: number;
  updatedAt?: string;
}

export function Home() {
  const [question, setQuestion] = useState<string>();
  const [answers, setAnswers] = useState<Answer[]>();
  const { loading } = useAsync(async () => {
    const response = await fetch(`http://10.108.7.89:3000/questions`, {
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

  const { trigger: handleSubmit } = useAsyncAction(async (answer: Answer) => {
    // TODO
    // console.log("submitted", answer.id);

    const userId = await AsyncStorage.getItem("userId");

    const response = await fetch(`http://10.108.7.89:3000/questions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answerId: answer.id, userId }),
    });

    console.log(JSON.stringify({ answerId: answer.id, userId }), "==-=-=");

    if (!response.ok) {
      throw new Error("Failed to answer");
    }

    console.log("successfully answered");
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
