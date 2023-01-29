import { useEffect, useState } from "react";
import { Platform } from "react-native";

const useIsApp = () => {
  const [isApp, setIsApp] = useState<boolean>(true);

  useEffect(() => {
    if (Platform.OS === "web") {
      setIsApp(false);
    } else if (Platform.OS === "android") {
      setIsApp(true);
    } else if (Platform.OS === "ios") {
      setIsApp(true);
    }
  }, []);

  return isApp;
};

export default useIsApp;
