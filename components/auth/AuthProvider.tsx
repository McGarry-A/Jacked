import { Spinner, View } from "native-base";
import React from "react";
import { useAppSelector } from "../../store";
import Auth from "./Auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useAppSelector((state) => state.userSlice.user.isLoggedIn);
  const isLoading = useAppSelector((state) => state.userSlice.status);

  if (isLoading === "pending") {
    return (
      <View h={"full"} justifyContent="center" alignItems={"center"}>
        <Spinner />
      </View>
    );
  }
  if (isLoggedIn) return <>{children}</>;
  if (!isLoggedIn) return <Auth />;

  return null;
};

export default AuthProvider;
