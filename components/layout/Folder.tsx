import { faFile } from "@fortawesome/free-regular-svg-icons/faFile";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Collapse,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Text,
} from "native-base";
import { useState } from "react";
import { TemplateInterface } from "../../types/TemplateSliceInterface";
import CreateTemplateCard from "./CreateTemplateCard";
import TemplateCard from "./TemplateCard";

interface IProps {
  templates: TemplateInterface;
  id: string;
  name: string;
}

export default function Folder(props: IProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { templates, id, name } = props;
  const navigation = useNavigation();

  const renderTemplates = () => {
    return (
      <FlatList
        data={Object.values(templates)}
        numColumns={2}
        w={"100%"}
        renderItem={({ item }) => (
          <TemplateCard
            key={item.tempId}
            navigation={navigation}
            title={item.templateName}
            exercises={item.exercises}
          />
        )}
        keyExtractor={(item) => item.tempId}
      />
    );
  };

  return (
    <Box key={id}>
      <Pressable onPress={() => setIsCollapsed((state) => !state)}>
        <HStack justifyContent={"space-between"}>
          <HStack alignItems={"center"} space={2}>
            <Heading size={"sm"} color={"coolGray.700"}>
              {name}
            </Heading>
            <Box>
              <FontAwesomeIcon
                icon={faChevronDown}
                color={"#4b5563"}
                style={
                  isCollapsed
                    ? { transform: [{ rotate: "-90deg" }] }
                    : undefined
                }
                size={11}
              />
            </Box>
          </HStack>
          <HStack my={1}>
            <Button
              size={"xs"}
              variant="ghost"
              borderRadius={"3xl"}
              borderColor={"info.300"}
              leftIcon={
                <FontAwesomeIcon icon={faFile} color={"#0284c7"} size={10} />
              }
              onPress={() => {
                navigation.navigate("CreateTemplate", {
                  folId: id,
                });
              }}
            >
              <Text
                fontSize={"2xs"}
                color={"info.600"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
              >
                Add Template
              </Text>
            </Button>
          </HStack>
        </HStack>
      </Pressable>
      <Collapse isOpen={!isCollapsed}>{renderTemplates()}</Collapse>
    </Box>
  );
}
