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
import useColorScheme from "../../hooks/useColorScheme";
import { TemplateInterface } from "../../types/TemplateSliceInterface";
import AddTemplateModal from "../modal/AddTemplateModal";
import TemplateModal from "../modal/TemplateModal";
import CtaButton from "./CtaButton";
import TemplateCard from "./TemplateCard";

interface IProps {
  templates: TemplateInterface;
  id: string;
  name: string;
}

export default function Folder(props: IProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [tempalteModalIsVisible, setTemplateModalIsVisible] =
    useState<boolean>(false);

  const { templates, id, name } = props;
  const navigation = useNavigation();

  const renderTemplateModal = () => {
    return (
      <TemplateModal
        isVisible={tempalteModalIsVisible}
        setIsVisible={setTemplateModalIsVisible}
      />
    );
  };

  const {
    h1ColorMode,
    h2ColorMode,
    pTextColorMode,
    ctaIconColorMode,
    screenColorMode,
  } = useColorScheme();

  const renderhead = () => {
    return (
      <Pressable onPress={() => setIsCollapsed((state) => !state)}>
        <HStack justifyContent={"space-between"}>
          <HStack alignItems={"center"} space={2}>
            <Heading size={"sm"} color={pTextColorMode}>
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
            isHollow
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
          keyExtractor={(item) => item.tempId}
          renderItem={({ item }) => (
            <TemplateCard
              setModalIsOpen={setTemplateModalIsVisible}
              key={item.tempId}
              title={item.templateName}
              exercises={item.exercises}
            />
          )}
        />
      </Collapse>
    );
  };

  return (
    <Box key={id}>
      {renderhead()}
      {renderTemplates()}
      <AddTemplateModal
        isVisible={modalIsOpen}
        setIsVisible={setModalIsOpen}
        folId={id}
      />
      {renderTemplateModal()}
    </Box>
  );
}
