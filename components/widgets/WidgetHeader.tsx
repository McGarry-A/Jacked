import { FontAwesome } from "@expo/vector-icons";
import { Box, Heading, Modal, Pressable, Text } from "native-base";
import { SetStateAction } from "react";

interface IWidgetHeader {
  title: string;
  subtitle: string;
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
  renderModalComponent: () => JSX.Element;
}

const WidgetHeader = (props: IWidgetHeader) => {
  const { renderModalComponent } = props;

  const renderHeader = () => {
    const { title, subtitle, setModalIsVisible } = props;
    return (
      <Box>
        <Box flexDirection={"row"} alignItems={"center"}>
          <Heading size={"sm"} flex={1}>
            {title}
          </Heading>
          <Pressable
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"info.100"}
            paddingX={2}
            height={"5"}
            borderRadius={4}
            onPress={() => setModalIsVisible(true)}
          >
            <FontAwesome
              name="ellipsis-h"
              size={15}
              color={"skyblue"}
              style={{ margin: "auto" }}
            />
          </Pressable>
        </Box>
        <Text fontSize={"sm"} fontWeight={"semibold"} marginY={1} opacity={70}>
          {subtitle}
        </Text>
      </Box>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderModalComponent()}
    </>
  );
};

export default WidgetHeader;
