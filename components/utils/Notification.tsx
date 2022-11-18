import {
  Alert,
  CloseIcon,
  Collapse,
  HStack,
  IconButton,
  Text,
  VStack,
} from "native-base";
import useNotification from "../../hooks/useNotification";
import { useAppSelector } from "../../store";
import { useEffect, useState } from "react";

const Notification = () => {
  const { show, title, content, type } = useAppSelector(
    (state) => state.notificationSlice
  );

  const { handleNotify } = useNotification()

  useEffect(() => {
    const hideAfterFive = setTimeout(() => {
      handleNotify("clear")
    }, 5000);

    return () => {
      clearTimeout(hideAfterFive);
    };
  }, []);

  const color = type === "info" ? "black" : "white";

  const renderContent = () => {
    return content ? (
      <Text flexGrow={1} color={color}>
        {content}
      </Text>
    ) : null;
  };

  const renderCloseIcon = () => {
    return (
      <IconButton
        icon={<CloseIcon />}
        variant={"unstyled"}
        color={color}
        flexShrink={1}
        onPress={() => handleNotify("clear")}
      />
    );
  };

  return (
    <Collapse isOpen={show}>
      <Alert
        maxW={350}
        status={type ? type : undefined}
        variant={"top-accent"}
        position="absolute"
        right={0}
        left={0}
        top={5}
        px={2}
      >
        <HStack space={2} alignItems="center">
          <Alert.Icon flexShrink={1} />
          <VStack space={1}>
            <Text flexGrow={1} fontWeight="bold" color={color}>
              {title}
            </Text>
            {renderContent()}
          </VStack>
          {renderCloseIcon()}
        </HStack>
      </Alert>
    </Collapse>
  );
};

export default Notification;
