import { faFile } from "@fortawesome/free-regular-svg-icons/faFile";
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
import AddTemplateModal from "../utils/AddTemplateModal";
import CtaButton from "./CTAButton";
import TemplateCard from "./TemplateCard";

interface IProps {
  templates: TemplateInterface;
  id: string;
  name: string;
}

export default function Folder(props: IProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { templates, id, name } = props;
  const navigation = useNavigation();

  const renderhead = () => {
    return (
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
          <CtaButton
            backgroundColor={"transparent"}
            borderWidth={0}
            variant={"ghost"}
            leftIcon={
              <FontAwesomeIcon icon={faFile} color={"#0284c7"} size={10} />
            }
            onPress={() => setModalIsOpen(true)}
          >
            Add Template
          </CtaButton>
        </HStack>
      </Pressable>
    );
  };

  const renderTemplates = () => {
    return (
      <Collapse isOpen={!isCollapsed}>
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
      </Collapse>
    );
  };

  return (
    <Box key={id}>
      {renderhead()}
      {renderTemplates()}
      <AddTemplateModal isVisible={modalIsOpen} setIsVisible={setModalIsOpen} folId={id} />
    </Box>
  );
}
