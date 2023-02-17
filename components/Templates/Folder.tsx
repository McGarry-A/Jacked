import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
import ManageFolderModal from "../Modals/ManageFolderModal";
import Elipsis from "../Layout/Buttons/Elipsis";
import TemplateCard from "./TemplateCard";

interface IProps {
  templates: TemplateInterface;
  id: string;
  name: string;
}

export default function Folder(props: IProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [folderModalIsOpen, setFolderModalIsOpen] = useState<boolean>(false);

  const { templates, id, name } = props;

  const { pTextColorMode } = useColorScheme();

  const renderHeader = () => {
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

          <Elipsis
            size={14}
            margin={1}
            onPress={() => setFolderModalIsOpen(true)}
          />
          {/* <CtaButton
            isHollow
            leftIcon={
              <FontAwesomeIcon icon={faFile} color={"#0284c7"} size={10} />
            }
            onPress={() => setModalIsOpen(true)}
          >
            Add Template
          </CtaButton> */}
        </HStack>
      </Pressable>
    );
  };

  const renderTemplates = () => {
    console.log(Object.values(templates));
    return (
      <Collapse isOpen={!isCollapsed}>
        <FlatList
          data={Object.values(templates)}
          numColumns={2}
          w={"100%"}
          keyExtractor={(item) => item.tempId}
          renderItem={({ item }) => (
            <TemplateCard
              key={item.tempId}
              title={item.templateName}
              exercises={item.exercises}
              templateId={String(item.tempId)}
            />
          )}
        />
      </Collapse>
    );
  };

  const renderFolderModal = () => {
    return (
      <ManageFolderModal
        isVisible={folderModalIsOpen}
        setIsVisible={setFolderModalIsOpen}
        folId={id}
      />
    );
  };

  return (
    <Box key={id}>
      {renderHeader()}
      {renderTemplates()}
      {renderFolderModal()}
    </Box>
  );
}
