#include "BluetoothSerial.h"
#include <ESP32Servo.h>

Servo myservo;
const int servoPin = 15;
const int ledPin = 4;
long blinkInterval = 0;
unsigned long previousMillis = 0;
bool ledState = false;

BluetoothSerial SerialBT;

void setup()
{
  Serial.begin(115200);
  myservo.attach(servoPin);
  pinMode(ledPin, OUTPUT);
  
  SerialBT.begin("Compassible");
  Serial.println("The device started, ready to pair");
}

void loop()
{
  if (SerialBT.hasClient())
  {
    if (SerialBT.available())
    {
      String message = SerialBT.readString();
      
      int commaIndex = message.indexOf(',');
      if (commaIndex != -1)
      {
        String firstNumberStr = message.substring(0, commaIndex);
        int firstNumber = firstNumberStr.toInt();
        
        String secondNumberStr = message.substring(commaIndex + 1);
        int secondNumber = secondNumberStr.toInt();
        blinkInterval = secondNumber;
        
        Serial.print("First Number: ");
        Serial.println(firstNumber);
        Serial.print("Second Number: ");
        Serial.println(secondNumber);
        
        if (firstNumber >= 0 && firstNumber <= 180)
        {
          myservo.write(firstNumber);
          Serial.print("Moved to: ");
          Serial.println(firstNumber);
        }
        else
        {
          Serial.println("Invalid input, please enter a number between 0 and 180");
        }
      }
    }
  }
  
  unsigned long currentMillis = millis();
  if (blinkInternal <= 25)
  {
    blinkInteval = 0;
  }
  
  if (currentMillis - previousMillis >= blinkInterval)
  {
    previousMillis = currentMillis;
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
  }
}
