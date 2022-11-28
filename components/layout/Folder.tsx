import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Collapse,
  FlatList,
  Heading,
  HStack,
  Pressable,
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
        <HStack alignItems={"center"} space={2}>
          <Heading size={"sm"} marginY={2} color={"text.800"}>
            {name}
          </Heading>
          <Box>
            <FontAwesomeIcon
              icon={faChevronDown}
              style={
                isCollapsed ? { transform: [{ rotate: "-90deg" }] } : undefined
              }
              size={10}
            />
          </Box>
        </HStack>
      </Pressable>
      <Collapse isOpen={!isCollapsed}>
        <HStack paddingTop={2} space={2} flexWrap="wrap">
          {renderTemplates()}
          <CreateTemplateCard folId={id} />
        </HStack>
      </Collapse>
    </Box>
  );
}
