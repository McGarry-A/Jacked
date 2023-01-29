import AsyncStorage from "@react-native-async-storage/async-storage";

const getFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error(e);
    return null;
  }
};


export default getFromAsyncStorage