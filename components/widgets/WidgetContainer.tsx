import { Box } from "native-base";
import { useState } from "react";
import WidgetHeader from "./WidgetHeader";
import BarChartWidgetModal from "../modal/BarChartWidgetModal";
import LineGraphWidgetModal from "../modal/LineGraphWidgetModal";
import WeightTrackerModal from "../modal/WeightTrackerModal";

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

    if (type === "WEIGHT_TRACKER") {
      return (
        <WeightTrackerModal
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
      backgroundColor={"white"}
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
