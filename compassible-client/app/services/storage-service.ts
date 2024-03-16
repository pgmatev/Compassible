import AsyncStorage from "@react-native-async-storage/async-storage";

export class LocalStorage<T> {
  constructor(private key: string) {}

  async get(): Promise<string | undefined> {
    try {
      const stringValue = await AsyncStorage.getItem(this.key);
      if (!stringValue) {
        return undefined;
      }
      return JSON.parse(stringValue);
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      return undefined;
    }
  }

  async set(value: T) {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
    }
  }

  async clear() {
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  }
}
