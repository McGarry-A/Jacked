import { RootTabScreenProps } from "../../types";
import { View, Text, FlatList, StyleSheet } from "react-native"
import SessionFrequncyWidget from "../../components/Widgets/SessionFrequency/SessionFrequencyWidget";
import OneRepMaxWidget from "../../components/Widgets/OneRepMax/OneRepMaxWidget";
import UserProfileBar from "../../components/Layout/UserProfileBar";
import { useAppDispatch, useAppSelector } from "../../store";
import AddWidgetModal from "../../components/Modals/AddWidgetModal";
import React, { useEffect, useState } from "react";
import { getWidgets, IOneRepMaxLine } from "../../store/WidgetsSlice";
import WidgetContainer from "../../components/Widgets/WidgetContainer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons/faWrench";
import CtaButton from "../../components/Layout/Buttons/CtaButton";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faRuler } from "@fortawesome/free-solid-svg-icons/faRuler";
import useColorScheme from "../../hooks/useColorScheme";
import AddMeasurementModal from "../../components/Modals/AddMeasurementModal";
import WeightTrackerWidget from "../../components/Widgets/WeightTracker/WeightTrackerWidget";
import { getWeight } from "../../store/weightSlice";
import SettingsModal from "../../components/Modals/SettingsModal";
import { constants } from "../../constants";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [weightModalIsVisible, setWeightModalIsVisible] =
    useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  
  const { widgets } = useAppSelector((state) => state.widgetSlice);
  const { h1ColorMode, screenColorMode, ctaIconColorMode } = useColorScheme();

  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userSlice.user);

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

  const handlePress = () => setModalIsOpen(true);

  const renderDashboard = () => {
    return (
      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardHeading}>Dashboard</Text>
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
      </View>
    );
  };


  const renderSettingsModal = () => (
    <SettingsModal isVisible={modalIsOpen} setIsVisible={setModalIsOpen} />
  );

  const renderScreenHeading = () => (
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>
        My Profile
      </Text>
      <CtaButton
        onPress={handlePress}
        leftIcon={
          <FontAwesomeIcon icon={faGear} size={12} color={ctaIconColorMode} />
        }
      >
        Settings
      </CtaButton>
    </View>
  );

  const renderWidget = (widgetId: string) => {
    const { type, title, subtitle } = widgets[widgetId];
    const { exerciseId } = (widgets[widgetId] as IOneRepMaxLine) || null;

    const WIDGET_MAP = {
      ONE_REP_MAX_EST: <OneRepMaxWidget exerciseId={exerciseId} />,
      SESSION_FREQUENCY: <SessionFrequncyWidget />,
      WEIGHT_TRACKER: <WeightTrackerWidget />,
    };

    return (
      <WidgetContainer
        type={type}
        title={title}
        subtitle={subtitle}
        widgetId={widgetId}
      >
        {WIDGET_MAP[type]}
      </WidgetContainer>
    );
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
      style={styles.measurementCta}
        isHollow
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
    <View style={styles.profileContainer}>
      {renderMeasurement()}
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {renderWidgets()}
      {renderAddWidgetModal()}
      {renderAddMeasurementModal()}
      {renderSettingsModal()}
    </View>
  );
}


const styles = StyleSheet.create({
    profileContainer: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "white",
        flexGrow: 1,
        flex: 1,
    },
    measurementCta: {
        paddingLeft: 0,
        justifyContent: "flex-start"
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12
    },
    heading: {
        fontSize: constants.fonts.heading.size.md,
        fontWeight: "bold"
    },
    dashboardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12
    },
    dashboardHeading: {
        fontSize: constants.fonts.heading.size.sm,
        fontWeight: "bold"
    }
    
})
