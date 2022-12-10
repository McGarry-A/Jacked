import { RootTabScreenProps } from "../../types";
import { Box, Heading, Text, Button, View, FlatList } from "native-base";
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
        <Button
          size={"xs"}
          variant="outline"
          backgroundColor={"info.100"}
          borderRadius="3xl"
          borderWidth={1}
          borderColor={"info.300"}
          onPress={() => setModalIsVisible(true)}
          leftIcon={
            <FontAwesomeIcon icon={faWrench} color={"#0284c7"} size={12} />
          }
        >
          <Text
            fontSize={"2xs"}
            color={"info.600"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            Add Widget
          </Text>
        </Button>
      </Box>
    );
  };

  const renderScreenHeading = () => (
    <Box>
      <Heading size="xl" color={"coolGray.700"}>
        My Profile
      </Heading>
    </Box>
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
    // NOTE: PROBABLY BEST PRACTICE DONT KNOW IF IT WILL WORK THOUGH
    return (
      <FlatList
        data={Object.keys(widgets)}
        renderItem={({ item }) => renderWidget(item)}
      />
    );

    // return <ScrollView>{Object.keys(widgets).map(renderWidget)}</ScrollView>;
  };

  const renderAddWidgetModal = () => (
    <AddWidgetModal
      isVisible={modalIsVisible}
      setIsVisible={setModalIsVisible}
    />
  );

  return (
    <View padding="3" backgroundColor={"coolGray.50"} flexGrow={1} flex={1}>
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {renderWidgets()}
      {renderAddWidgetModal()}
    </View>
  );
}
