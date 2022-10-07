import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import store from "./store";
import AuthProvider from "./components/auth/AuthProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <AuthProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </AuthProvider>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
