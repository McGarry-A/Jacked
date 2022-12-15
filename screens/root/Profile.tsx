import { RootTabScreenProps } from "../../types";
import { Box, Heading, View, FlatList, HStack } from "native-base";
import BarChartWidget from "../../components/widgets/BarChart/BarChartWidget";
import LineGraphWidget from "../../components/widgets/LineGraph/LineGraphWidget";
import UserProfileBar from "../../components/layout/UserProfileBar";
import { useAppSelector } from "../../store";
import AddWidgetModal from "../../components/modal/AddWidgetModal";
import { useEffect, useState } from "react";
import { getWidgets, IOneRepMaxLine } from "../../store/WidgetsSlice";
import WidgetContainer from "../../components/widgets/WidgetContainer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons/faWrench";
import CtaButton from "../../components/layout/CtaButton";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faRuler } from "@fortawesome/free-solid-svg-icons/faRuler";
import useColorScheme from "../../hooks/useColorScheme";
import AddMeasurementModal from "../../components/modal/AddMeasurementModal";
import useWidgets from "../../hooks/useWidgets";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [weightModalIsVisible, setWeightModalIsVisible] =
    useState<boolean>(false);

  const { widgets } = useAppSelector((state) => state.widgetSlice);
  const { h1ColorMode, screenColorMode, ctaIconColorMode } = useColorScheme();

  useWidgets();

  const renderProfile = () => {
    return <UserProfileBar />;
  };

  const renderDashboard = () => {
    return (
      <Box
        flexDirection="row"
        alignItems={"center"}
        justifyContent="space-between"
        marginY={5}
      >
        <Heading size={"sm"}>Dashboard</Heading>
        <CtaButton
          onPress={() => setModalIsVisible(true)}
          leftIcon={
            <FontAwesomeIcon
              icon={faWrench}
              color={ctaIconColorMode}
              size={12}
            />
          }
        >
          Add Widget
        </CtaButton>
      </Box>
    );
  };

  const renderScreenHeading = () => (
    <HStack justifyContent={"space-between"} alignItems={"center"} my={2}>
      <Heading size="xl" color={h1ColorMode}>
        My Profile
      </Heading>
      <CtaButton
        onPress={() => {
          navigation.navigate("Settings");
        }}
        leftIcon={
          <FontAwesomeIcon icon={faGear} size={12} color={ctaIconColorMode} />
        }
      >
        Settings
      </CtaButton>
    </HStack>
  );

  const renderWidget = (widgetId: string) => {
    const { type, title, subtitle } = widgets[widgetId];

    if (type === "ONE_REP_MAX_EST") {
      const { exerciseId } = widgets[widgetId] as IOneRepMaxLine;

      return (
        <WidgetContainer
          type={type}
          title={title}
          subtitle={subtitle}
          widgetId={widgetId}
        >
          <LineGraphWidget exerciseId={exerciseId} />
        </WidgetContainer>
      );
    }
    if (type === "SESSION_FREQUENCY")
      return (
        <WidgetContainer
          type={type}
          title={title}
          subtitle={subtitle}
          widgetId={widgetId}
        >
          <BarChartWidget />
        </WidgetContainer>
      );

    return <></>;
  };

  const renderWidgets = () => {
    return (
      <FlatList
        data={Object.keys(widgets)}
        renderItem={({ item }) => renderWidget(item)}
      />
    );
  };

  const renderAddWidgetModal = () => (
    <AddWidgetModal
      isVisible={modalIsVisible}
      setIsVisible={setModalIsVisible}
    />
  );

  const renderMeasurement = () => {
    return (
      <CtaButton
        isHollow
        pl={0}
        justifyContent={"flex-start"}
        onPress={() => setWeightModalIsVisible(true)}
        leftIcon={
          <FontAwesomeIcon icon={faRuler} size={20} color={ctaIconColorMode} />
        }
      >
        Add Weight
      </CtaButton>
    );
  };

  return (
    <View padding="3" backgroundColor={screenColorMode} flexGrow={1} flex={1}>
      {renderMeasurement()}
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {renderWidgets()}
      {renderAddWidgetModal()}
      <AddMeasurementModal
        isVisible={weightModalIsVisible}
        setIsVisible={setWeightModalIsVisible}
      />
    </View>
  );
}
