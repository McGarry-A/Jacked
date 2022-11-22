import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, Input, Text } from "native-base";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { createFolder } from "../store/templateSlice";
import { Pressable } from "react-native";

export default function CreateFolderButton() {
  const [showNewButton, setShowNewButton] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleCreateNewFolder = () => {
    dispatch(createFolder({ folderName: newFolderName }));
    setShowNewButton(false);
  };

  const renderInput = () => {
    if (!showNewButton) return;
    return (
      <Input
        type="text"
        h={12}
        placeholder={"Folder Title"}
        fontSize="lg"
        onChangeText={(text) => setNewFolderName(text)}
        InputRightElement={
          <Pressable onPress={handleCreateNewFolder}>
            <FontAwesomeIcon icon={faPlus} size={13} />
          </Pressable>
        }
      />
    );
  };

  const renderNewFolderButton = () => {
    if (showNewButton) return;
    return (
      <Button
        leftIcon={<FontAwesomeIcon icon={faPlus} size={13} />}
        onPress={() => setShowNewButton(true)}
        variant={"subtle"}
        colorScheme="gray"
      >
        <Text fontWeight={700} color={"muted.800"}>
          Create New Folder
        </Text>
      </Button>
    );
  };

  return (
    <>
      {renderInput()}
      {renderNewFolderButton()}
    </>
  );
}
