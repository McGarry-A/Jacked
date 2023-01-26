import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
