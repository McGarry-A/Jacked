import { View } from "native-base";
import UserProfileBar from "../components/layout/UserProfileBar";

export default function User() {
  const renderUserProfileBar = () => {
    return <UserProfileBar isClickable={false} />;
  };
  return (
    <View backgroundColor={"white"} padding={3} flex={1}>
      {renderUserProfileBar()}
    </View>
  );
}
