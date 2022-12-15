import { FontAwesome } from "@expo/vector-icons";
import { Box, Heading, Modal, Pressable, Text } from "native-base";
import { SetStateAction } from "react";
import useColorScheme from "../../hooks/useColorScheme";
import DeleteButton from "../layout/DeleteButton";
import Elipsis from "../layout/Elipsis";

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
        <DeleteButton title="widget" variant="ghost" />
        <Box flexDirection={"row"} alignItems={"center"}>
          <Heading size={"sm"} flex={1}>
            {title}
          </Heading>
          <Elipsis onPress={() => setModalIsVisible(true)} size={14} />
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
