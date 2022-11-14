import { Spinner, View } from "native-base";
import React from "react";
import { useAppSelector } from "../../store";
import Auth from "./Auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useAppSelector((state) => state.userSlice.user.isLoggedIn);

  return <>{isLoggedIn ? children : <Auth />}</>;
};

export default AuthProvider;
