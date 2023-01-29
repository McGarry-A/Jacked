import AsyncStorage from "@react-native-async-storage/async-storage";

const saveToAsyncStorage = async (key: string, value: any) => {
  try {
    AsyncStorage.removeItem(key);
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("ERROR SAVING TOKEN FOR APP ", e);
  }
};

export default saveToAsyncStorage;
