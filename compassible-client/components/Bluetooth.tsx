import { useAsync } from "@/hooks/useAsync";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from "react-native";
import BleManager from "react-native-ble-manager";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const Bluetooth = () => {
  useAsync(async () => {
    await requestBluetoothPermission();
    BleManager.start({ showAlert: false });

    bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral
    );
    return () => {
      bleManagerEmitter.removeAllListeners("BleManagerDiscoverPeripheral");
    };
  }, []);

  const handleDiscoverPeripheral = (peripheral: unknown) => {
    // Handle the discovered device here
    console.log("Discovered device:", peripheral);
  };

  const startScan = () => {
    console.log(BleManager.scan, "=== ble manager");
    BleManager.scan([], 5, true)
      .then(() => {
        // Scanning for 5 seconds
        console.log("Scanning...");
      })
      .catch((error) => console.log(error, "=--"));
  };

  // const sendData = (peripheralId, serviceUUID, characteristicUUID, data) => {
  //   BleManager.write(peripheralId, serviceUUID, characteristicUUID, data)
  //     .then(() => {
  //       // Success code
  //       console.log("Write: " + data);
  //     })
  //     .catch((error) => {
  //       // Failure code
  //       console.log(error);
  //     });
  // };

  // UI to trigger scanning
  return (
    <View>
      <Text>React Native Bluetooth Example</Text>
      <Button title="Scan Bluetooth Devices" onPress={startScan} />
    </View>
  );
};

async function requestBluetoothPermission() {
  if (Platform.OS === "android" && Platform.Version >= 23) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Bluetooth Permission",
        message:
          "This app needs access to your location for Bluetooth scanning",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Bluetooth permission denied");
    }
  }
}
