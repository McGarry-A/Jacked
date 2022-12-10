import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { HStack, Pressable, Text } from "native-base";

interface IProps {
  folId: string;
}

export default function CreateTemplateCard(props: IProps) {
  const { folId } = props;

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CreateTemplate", {
      folId: folId,
    });
  };

  return (
    <Pressable
      borderWidth={1}
      backgroundColor={"info.100"}
      borderRadius="sm"
      borderColor={"info.300"}
      onPress={handlePress}
      m={1}
      w={"48%"}
      h={"32"}
    >
      <HStack
        h="full"
        alignItems={"center"}
        justifyContent={"center"}
        space={1}
      >
        <FontAwesomeIcon icon={faPlus} size={12} color={"#0284c7"} />
        <Text
          fontSize={"xs"}
          color={"info.600"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Add template
        </Text>
      </HStack>
    </Pressable>
  );
}
