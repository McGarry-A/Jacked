import { Box } from "native-base";
import { useState } from "react";
import BarChartWidgetModal from "../modal/BarChartWidgetModal";
import LineGraphWidgetModal from "../modal/LineGraphWidgetModal";
import WidgetHeader from "./WidgetHeader";

interface IWidgetContainer {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  widgetId: string;
  type: "ONE_REP_MAX_EST" | "SESSION_FREQUENCY" | "WEIGHT_TRACKER";
}

const WidgetContainer = (props: IWidgetContainer) => {
  const { title, subtitle, children, widgetId } = props;
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const renderModalComponent = () => {
    const { type } = props;

    if (type === "SESSION_FREQUENCY") {
      return (
        <BarChartWidgetModal
          modalIsVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
          widgetId={widgetId}
        />
      );
    }

    if (type === "ONE_REP_MAX_EST") {
      return (
        <LineGraphWidgetModal
          modalIsVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
          widgetId={widgetId}
        />
      );
    }

    return <></>;
  };

  return (
    <Box
      borderWidth={1}
      borderColor={"coolGray.200"}
      backgroundColor={"transparent"}
      borderRadius={10}
      padding={3}
      overflow={"hidden"}
      flex={1}
      my={1}
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
