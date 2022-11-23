import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Center, Pressable, Text } from "native-base";

interface IProps {
  folId: string;
}

export default function CreateTemplateCard(props: IProps) {
  const { folId } = props;

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CreateTemplate", {
        folId: folId
    });
  };

  return (
    <Pressable
      borderWidth={2}
      borderColor={"info.100"}
      p={2}
      borderRadius={"sm"}
      w={"47%"}
      onPress={handlePress}
      my={1}
      h={"32"}
      borderStyle={"dotted"}
    >
      <Center h="full">
        <FontAwesomeIcon icon={faPlus} size={15} color={"#38bdf8"} />
        <Text flexWrap={"wrap"} mt={2} color="info.400" textAlign={"center"}>
          Add new template
        </Text>
      </Center>
    </Pressable>
  );
}
