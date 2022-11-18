import { Button, Heading, View, VStack } from "native-base";
import { useAppSelector } from "../../store";

const ChooseFolder = ({ navigation }: any) => {
  const folders = useAppSelector((state) => state.templateSlice.folders);

  const handlePress = (folderId: string) => {
    navigation.navigate("TemplateTitle", { folder: folderId });
  };

  const renderHeading = () => (
    <Heading size={"lg"} my={1}>
      Choose Folder
    </Heading>
  );

  const renderFolders = () => {
    return (
      <VStack>
        {Object.values(folders).map((el) => {
          return (
            <Button
              key={el.id}
              variant={"outline"}
              onPress={() => handlePress(el.id)}
            >
              {el.name}
            </Button>
          );
        })}
      </VStack>
    );
  };

  return (
    <View flex={1} padding={3} backgroundColor={"white"}>
      {renderHeading()}
      {renderFolders()}
    </View>
  );
};

export default ChooseFolder;
