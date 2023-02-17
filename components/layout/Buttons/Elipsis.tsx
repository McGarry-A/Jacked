import { FontAwesome } from "@expo/vector-icons";
import { Box, IBoxProps, IPressableProps, Pressable } from "native-base";
import useColorScheme from "../../../hooks/useColorScheme";

interface IElipsis extends IPressableProps {
  size: number;
}

const Elipsis = ({ size, ...rest }: IElipsis) => {
  const { elipsesColorMode, elipsesBgColorMode } = useColorScheme();
  return (
    <Pressable
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={elipsesBgColorMode}
      paddingX={2}
      paddingY={1}
      borderRadius={5}
      {...rest}
    >
      <FontAwesome name="ellipsis-h" size={size} color={elipsesColorMode} />
    </Pressable>
  );
};

export default Elipsis;
