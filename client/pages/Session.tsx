import { View, Text } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";
import { useAsync } from "../hooks/useAsync";

export function Session() {
  const [location, setLocation] = useState<Location.LocationObject>();

  useAsync(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.BestForNavigation,
    });

    setLocation(currentLocation);
  }, []);

  return (
    <View>
      <Text>
        Your location is: {location?.coords.latitude} lat,{" "}
        {location?.coords.longitude} long, {location?.coords.heading} head
      </Text>
    </View>
  );
}
