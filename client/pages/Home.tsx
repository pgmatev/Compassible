import { View, Text } from "react-native";
import { useAsync } from "../hooks/useAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useAsyncAction } from "../hooks/useAsyncAction";

interface Answer {
  answer: string;
  createdAt?: string;
  id: number;
  questionId: number;
  updatedAt?: string;
}

export function Home() {
  const [question, setQuestion] = useState<string>();
  const [answers, setAnswers] = useState<string[]>();
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
    console.log("++++", data);

    setQuestion(JSON.stringify(data.question));
    setAnswers(data.answers.map((answer: Answer) => answer.answer));
  }, []);

  const { trigger: handleSubmit } = useAsyncAction(async () => {
    // TODO
    console.log("submitted");
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
