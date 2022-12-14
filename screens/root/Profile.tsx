import { RootTabScreenProps } from "../../types";
import { Box, Heading, View, FlatList, HStack } from "native-base";
import SessionFrequncyWidget from "../../components/widgets/SessionFrequency/SessionFrequencyWidget";
import OneRepMaxWidget from "../../components/widgets/OneRepMax/OneRepMaxWidget";
import UserProfileBar from "../../components/layout/UserProfileBar";
import { useAppDispatch, useAppSelector } from "../../store";
import AddWidgetModal from "../../components/modal/AddWidgetModal";
import { useEffect, useState } from "react";
import {
  getWidgets,
  IOneRepMaxLine,
  refreshWidgets,
} from "../../store/WidgetsSlice";
import WidgetContainer from "../../components/widgets/WidgetContainer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons/faWrench";
import CtaButton from "../../components/layout/CtaButton";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faRuler } from "@fortawesome/free-solid-svg-icons/faRuler";
import useColorScheme from "../../hooks/useColorScheme";
import AddMeasurementModal from "../../components/modal/AddMeasurementModal";
import WeightTrackerWidget from "../../components/widgets/WeightTracker/WeightTrackerWidget";
import { getWeight } from "../../store/weightSlice";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [weightModalIsVisible, setWeightModalIsVisible] =
    useState<boolean>(false);

  const { widgets } = useAppSelector((state) => state.widgetSlice);
  const { h1ColorMode, screenColorMode, ctaIconColorMode } = useColorScheme();

  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { status } = useAppSelector((state) => state.widgetSlice);

  const [isWidgetRefreshing, setIsWidgetRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getWidgets({ userId }));
  }, []);

  const renderProfile = () => {
    return <UserProfileBar />;
  };

  const handleRefreshWidgets = () => {
    setIsWidgetRefreshing(true);
    dispatch(getWeight({ userId }));

    setIsWidgetRefreshing(false);
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
          <OneRepMaxWidget exerciseId={exerciseId} />
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
          <SessionFrequncyWidget />
        </WidgetContainer>
      );
    if (type === "WEIGHT_TRACKER") {
      return (
        <WidgetContainer
          type={type}
          title={title}
          subtitle={subtitle}
          widgetId={widgetId}
        >
          <WeightTrackerWidget />
        </WidgetContainer>
      );
    }

    return <></>;
  };

  const renderWidgets = () => {
    return (
      <FlatList
        data={Object.keys(widgets)}
        renderItem={({ item }) => renderWidget(item)}
        onRefresh={handleRefreshWidgets}
        refreshing={isWidgetRefreshing}
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

  const renderAddMeasurementModal = () => (
    <AddMeasurementModal
      isVisible={weightModalIsVisible}
      setIsVisible={setWeightModalIsVisible}
    />
  );

  return (
    <View
      padding="3"
      backgroundColor={screenColorMode}
      flexGrow={1}
      flex={1}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
      }}
    >
      {renderMeasurement()}
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {renderWidgets()}
      {renderAddWidgetModal()}
      {renderAddMeasurementModal()}
    </View>
  );
}
