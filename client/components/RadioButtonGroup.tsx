import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

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
  answers: string[];
  onSubmit: (selectedAnswer: string) => void;
}

export function RadioButtonGroup({
  question,
  answers,
  onSubmit,
}: RadioButtonGroupProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onSubmit(answers[selectedAnswer]);
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <Text>{question}</Text>
      {answers.map((answer, index) => (
        <RadioButton
          key={index}
          option={answer}
          isSelected={index === selectedAnswer}
          onPress={() => handleSelectAnswer(index)}
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
