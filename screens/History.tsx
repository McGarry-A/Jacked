import { FlatList, Heading, Box } from "native-base";
import { Template } from "./TabTwoScreen";

export default function TabThreeScreen() {
  const renderHeading = () => <Heading size={"xl"}>History</Heading>;
  const renderSessions = () => {
    const data = [1,2,3,4,5,5,6]
    return (
      <FlatList data={data} renderItem={() => <Template width="full" />} />
    )
  }

  return (
    <Box backgroundColor={"white"} padding={3} paddingBottom={10}>
      {renderHeading()}
      {renderSessions()}
    </Box>
  );
}
