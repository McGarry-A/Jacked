import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import store from "./store";
import Auth from "./components/auth/Auth";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const bool = false;

  const renderAuth = () => {};

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NativeBaseProvider>
            {bool ? (
              <>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </>
            ) : (
              <Auth />
            )}
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
