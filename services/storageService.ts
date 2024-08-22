import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a generic type for our service
class StorageService<T> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  // Save data to AsyncStorage
  async save(data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(this.storageKey, jsonValue);
    } catch (e) {
      console.error("Failed to save data:", e);
    }
  }

  // Load data from AsyncStorage
  async load(): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(this.storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Failed to load data:", e);
      return null;
    }
  }

  // Remove data from AsyncStorage
  async remove(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.storageKey);
    } catch (e) {
      console.error("Failed to remove data:", e);
    }
  }

  async getCounter(counterKey: string): Promise<number> {
    const counter = await AsyncStorage.getItem(counterKey);
    return counter ? parseInt(counter, 10) : 0;
  }

  async incrementCounter(counterKey: string): Promise<number> {
    const currentCounter = await this.getCounter(counterKey);
    const newCounter = currentCounter + 1;
    await AsyncStorage.setItem(counterKey, newCounter.toString());
    return newCounter;
  }
}

export default StorageService;
