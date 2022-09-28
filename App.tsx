import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import "react-native-url-polyfill/auto";
import { Provider as JotaiProvider } from "jotai";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <JotaiProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </JotaiProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
