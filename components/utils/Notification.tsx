import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Alert, HStack, Pressable, Text } from "native-base";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

interface Props {
  status: string;
  content: string;
  variant: string;
  dismissFunc: () => void;
}

const Notification = ({ status, content, variant, dismissFunc }: Props) => {
  return (
    <Alert
      maxW={350}
      status={status}
      variant={variant}
      position="absolute"
      right={0}
      top={10}
      px={2}
    >
      <HStack space={2} alignItems="center">
        <Alert.Icon flexShrink={1} />
        <Text flexGrow={1} fontWeight="bold" color="white">
          {content}
        </Text>
        <Pressable onPress={() => dismissFunc()}>
          <FontAwesomeIcon icon={faXmark} color={"white"} />
        </Pressable>
      </HStack>
    </Alert>
  );
};

export default Notification;
