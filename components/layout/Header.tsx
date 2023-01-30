import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Button, Heading, HStack, View, Text, Box } from "native-base";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

interface IHeaderBottomTab extends BottomTabHeaderProps {
  showBack: boolean;
  showRouteTitle: boolean;
  ComponentRight?: () => JSX.Element;
}

interface IHeaderStack extends NativeStackHeaderProps {
  showBack: boolean;
  showRouteTitle: boolean;
  ComponentRight?: () => JSX.Element;
}

const Header = (props: IHeaderBottomTab | IHeaderStack) => {
  const renderRouteTitle = () => {
    const {
      showRouteTitle,
      route: { name },
    } = props;

    if (!showRouteTitle) return <Box flex={1}></Box>;

    return <Heading>{name}</Heading>;
  };

  const renderBackButton = () => {
    const { navigation, showBack } = props;

    if (!showBack) return <Box flex={1}></Box>;

    const { goBack } = navigation;

    return (
      <Button
        leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        variant={"ghost"}
        onPress={goBack}
      />
    );
  };

  const renderComponentRight = () => {
    const { ComponentRight } = props;

    if (!ComponentRight) return <Box flex={1}></Box>;

    return <ComponentRight />;
  };

  return (
    <View
      p={3}
      h={"16"}
      borderBottomWidth={1}
      borderBottomColor={"gray.200"}
      my={"auto"}
      justifyContent={"center"}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
        backgroundColor: "white",
      }}
    >
      <HStack alignItems={"baseline"} justifyContent={"space-between"}>
        {renderBackButton()}
        {renderRouteTitle()}
        {renderComponentRight()}
      </HStack>
    </View>
  );
};

export default Header;
