import { Button, Heading, Input, Text, View, VStack } from "native-base";
import { useState } from "react";

const TemplateTitle = ({ navigation, route }: any) => {
  const [templateTitle, setTemplateTitle] = useState<string>("");

  const handleNext = () => {
    const { folder } = route.params;

    navigation.navigate("NewTemplate", {
      title: templateTitle,
      folder,
    });
  };

  const renderHeading = () => (
    <Heading size="lg" color={"text.800"} my={1}>
      New Template
    </Heading>
  );

  const renderTemplateTitleInput = () => (
    <Input
      placeholder="Quick Workout"
      value={templateTitle}
      my={1}
      fontSize="lg"
      onChangeText={(text) => setTemplateTitle(text)}
    />
  );

  const renderNext = () => {
    const isTitle = templateTitle !== "";
    return (
      <Button
        backgroundColor={`${isTitle ? "info.400" : "gray.200"}`}
        mt={"auto"}
        onPress={isTitle ? handleNext : null}
      >
        <Text fontWeight={700} color="white">
          Next
        </Text>
      </Button>
    );
  };

  return (
    <View flex={1} backgroundColor={"white"} p={3}>
      {renderHeading()}
      {renderTemplateTitleInput()}
      {renderNext()}
    </View>
  );
};

export default TemplateTitle;
