import { Alert, VStack, HStack, Text, useToast, Center } from "native-base";

interface IToastAlert {
  status: "info" | "warning" | "success" | "error";
  title: string;
  description: string;
  variant: "solid" | "subtle" | "outline";
}

const ToastAlert = ({ status, title, description, variant }: IToastAlert) => {
  return (
    <Center>
      <Alert
        maxWidth="90%"
        alignSelf="center"
        flexDirection="row"
        status={status ? status : "info"}
        variant={variant}
      >
        <VStack space={1} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                flexShrink={1}
                color={
                  variant === "solid"
                    ? "lightText"
                    : variant !== "outline"
                    ? "darkText"
                    : null
                }
              >
                {title}
              </Text>
            </HStack>
          </HStack>
          <Text
            px="6"
            color={
              variant === "solid"
                ? "lightText"
                : variant !== "outline"
                ? "darkText"
                : null
            }
          >
            {description}
          </Text>
        </VStack>
      </Alert>
    </Center>
  );
};

export default ToastAlert;
