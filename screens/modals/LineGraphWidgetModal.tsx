import {
  Button,
  HStack,
  Input,
  Modal,
  Select,
  Text,
  VStack,
} from "native-base";
import { SetStateAction } from "react";
import ModalItem from "../../components/Modal/ModalItem";

interface ILineGraphWidgetModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const LineGraphWidgetModal = (props: ILineGraphWidgetModal) => {
  const { modalIsVisible, setModalIsVisible } = props;

  const handleDeleteModal = () => {
    setModalIsVisible(false)
  }

  const renderLimitWeeks = () => {
    return (
      <VStack space={1}>
        <Text>Limit weeks</Text>
        <Select placeholder="Limit Weeks">
          <Select.Item label="4" value={"4"} />
          <Select.Item label="5" value={"5"} />
          <Select.Item label="6" value={"6"} />
          <Select.Item label="7" value={"7"} />
          <Select.Item label="8" value={"8"} />
        </Select>
      </VStack>
    );
  };

  return (
    <Modal isOpen={modalIsVisible} onClose={() => setModalIsVisible(false)}>
      <Modal.Content maxWidth={"90%"}>
        <Modal.CloseButton />
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            {renderLimitWeeks()}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme={"danger"}
              onPress={handleDeleteModal}
            >
              Delete Widget
            </Button>
            <Button colorScheme="lightBlue">Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default LineGraphWidgetModal;
