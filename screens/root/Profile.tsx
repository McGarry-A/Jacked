import { RootTabScreenProps } from "../../types";
import {
  Box,
  Heading,
  Text,
  Button,
  ScrollView,
  View,
  FlatList,
} from "native-base";
import BarChartWidget from "../../components/widgets/BarChart/BarChartWidget";
import LineGraphWidget from "../../components/widgets/LineGraph/LineGraphWidget";
import UserProfileBar from "../../components/layout/UserProfileBar";
import { useAppSelector } from "../../store";
import AddWidgetModal from "../../components/utils/AddWidgetModal";
import { useState } from "react";
import { IOneRepMaxLine } from "../../store/WidgetsSlice";
import { SafeAreaView } from "react-native";

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
          size="sm"
          variant="outline"
          backgroundColor={"info.100"}
          borderRadius="3xl"
          borderWidth={0}
          onPress={() => setModalIsVisible(true)}
        >
          <Text
            fontSize={"xs"}
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
      <Heading size="xl">My Profile</Heading>
    </Box>
  );

  const renderWidget = (widgetId: string) => {
    const { type, title, subtitle } = widgets[widgetId];

    console.log("widget", JSON.stringify(widgets[widgetId]));

    if (type === "line") {
      const { exerciseId } = widgets[widgetId] as IOneRepMaxLine;

      return (
        <LineGraphWidget
          title={title}
          subtitle={subtitle}
          exerciseId={exerciseId}
        />
      );
    }
    if (type === "bar")
      return <BarChartWidget title={title} subtitle={subtitle} />;

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
    <View padding="3" backgroundColor={"white"} flexGrow={1} flex={1}>
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {renderWidgets()}
      {renderAddWidgetModal()}
    </View>
  );
}
