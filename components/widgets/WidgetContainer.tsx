import { Box } from "native-base";
import { useState } from "react";
import BarChartWidgetModal from "../../screens/modals/BarChartWidgetModal";
import LineGraphWidgetModal from "../../screens/modals/LineGraphWidgetModal";
import WidgetHeader from "./WidgetHeader";

interface IWidgetContainer {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  widgetId: string;
  type: "bar" | "line";
}

const WidgetContainer = (props: IWidgetContainer) => {
  const { title, subtitle, children } = props;
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const renderModalComponent = () => {
    const { type } = props;

    if (type === "bar") {
      return (
        <BarChartWidgetModal
          modalIsVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
        />
      );
    }
    if (type === "line") {
      return (
        <LineGraphWidgetModal
          modalIsVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
        />
      );
    }
    return <></>;
  };

  return (
    <Box
      marginY={1}
      borderWidth={2}
      borderColor={"whitesmoke"}
      borderRadius={10}
      padding={2}
      overflow={"hidden"}
      flex={1}
    >
      <WidgetHeader
        title={title}
        subtitle={subtitle}
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        renderModalComponent={renderModalComponent}
      />
      {children}
    </Box>
  );
};

export default WidgetContainer;
