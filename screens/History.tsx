import { Heading, ScrollView } from "native-base";

export default function TabThreeScreen() {
  const renderHeading = () => <Heading size={"xl"}>History</Heading>;

  return (
    <ScrollView backgroundColor={"white"} padding={3}>
      {renderHeading()}
    </ScrollView>
  );
}
