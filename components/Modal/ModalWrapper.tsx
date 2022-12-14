import { Button, IModalProps, Modal, Text } from "native-base";

interface IModalWrapper extends IModalProps {
  modalWidth?: string;
  children: React.ReactNode;
  header: string;
  saveHandler?: () => void;
}

const ModalWrapper = (props: IModalWrapper) => {
  const {
    isOpen,
    onClose,
    children,
    header,
    saveHandler,
    width = "4/5",
    size = "md",
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} size={size}>
      <Modal.Content maxH="4/5" w={width}>
        <Modal.CloseButton />
        <Modal.Header borderBottomWidth={0}>{header}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {saveHandler && (
          <Modal.Footer borderTopWidth={0}>
            <Button.Group space={2}>
              <Button backgroundColor={"info.500"} onPress={saveHandler}>
                <Text fontWeight={"semibold"} color={"coolGray.100"}>
                  Save
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalWrapper;
