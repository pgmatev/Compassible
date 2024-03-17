import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { Answer } from "../pages/Home";

interface RadioButtonProps {
  option: string;
  isSelected: boolean;
  onPress: () => void;
}

function RadioButton({ option, isSelected, onPress }: RadioButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <View
        style={{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSelected && (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: "black",
            }}
          />
        )}
      </View>
      <Text style={{ marginLeft: 8 }}>{option}</Text>
    </TouchableOpacity>
  );
}

interface RadioButtonGroupProps {
  question: string;
  answers: Answer[];
  onSubmit: (selectedAnswer: Answer) => void;
}

export function RadioButtonGroup({
  question,
  answers,
  onSubmit,
}: RadioButtonGroupProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

  const handleSelectAnswer = (answer: Answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onSubmit(selectedAnswer);
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <Text>{question}</Text>
      {answers.map((answer) => (
        <RadioButton
          key={answer.id}
          option={answer.answer}
          isSelected={answer.id === selectedAnswer?.id}
          onPress={() => handleSelectAnswer(answer)}
        />
      ))}
      <Button
        title="Submit"
        disabled={selectedAnswer === null}
        onPress={handleSubmit}
      />
    </View>
  );
}
