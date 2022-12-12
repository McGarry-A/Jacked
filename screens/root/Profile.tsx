import { RootTabScreenProps } from "../../types";
import { Box, Heading, View, FlatList, HStack, Text, Switch } from "native-base";
import BarChartWidget from "../../components/widgets/BarChart/BarChartWidget";
import LineGraphWidget from "../../components/widgets/LineGraph/LineGraphWidget";
import UserProfileBar from "../../components/layout/UserProfileBar";
import { useAppSelector } from "../../store";
import AddWidgetModal from "../../components/utils/AddWidgetModal";
import { useState } from "react";
import { IOneRepMaxLine } from "../../store/WidgetsSlice";
import WidgetContainer from "../../components/widgets/WidgetContainer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons/faWrench";
import CtaButton from "../../components/layout/CtaButton";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faRuler } from "@fortawesome/free-solid-svg-icons/faRuler";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import ColorThemeSwitch from "../../components/layout/ColorThemeSwitch";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const { widgets } = useAppSelector((state) => state.widgetSlice);

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
            <FontAwesomeIcon icon={faWrench} color={"#0284c7"} size={12} />
          }
        >
          Add Widget
        </CtaButton>
      </Box>
    );
  };

  const renderScreenHeading = () => (
    <HStack justifyContent={"space-between"} alignItems={"center"} my={2}>
      <Heading size="xl" color={"coolGray.700"}>
        My Profile
      </Heading>
      <CtaButton
        onPress={() => {
          navigation.navigate("Settings");
        }}
        leftIcon={<FontAwesomeIcon icon={faGear} size={12} color={"#0284c7"} />}
      >
        Settings
      </CtaButton>
    </HStack>
  );

  const renderWidget = (widgetId: string) => {
    const { type, title, subtitle } = widgets[widgetId];

    if (type === "line") {
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
    if (type === "bar")
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
      <HStack my={2} justifyContent={"space-between"} alignItems={"center"}>
        <FontAwesomeIcon icon={faRuler} size={20} color={"#7dd3fc"} />
        <ColorThemeSwitch />
      </HStack>
    );
  };

  return (
    <View padding="3" backgroundColor={"coolGray.50"} flexGrow={1} flex={1}>
      {renderMeasurement()}
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {renderWidgets()}
      {renderAddWidgetModal()}
    </View>
  );
}
