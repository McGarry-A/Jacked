import { Button, HStack, Modal, Select, Text, VStack } from "native-base";
import { SetStateAction } from "react";
import ModalItem from "../../components/Modal/ModalItem";

interface IBarChartWidgetModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const BarChartWidgetModal = (props: IBarChartWidgetModal) => {
  const { modalIsVisible, setModalIsVisible } = props;

  const handleDeleteModal = () => {
    setModalIsVisible(false);
  };

  const renderSetTarget = () => {
    return (
      <Select placeholder="Target Days Per Week" h={9}>
        <Select.Item label="1" value={"1"} />
        <Select.Item label="2" value={"2"} />
        <Select.Item label="3" value={"3"} />
        <Select.Item label="4" value={"4"} />
        <Select.Item label="5" value={"5"} />
        <Select.Item label="6" value={"6"} />
        <Select.Item label="7" value={"7"} />
      </Select>
    );
  };

  return (
    <Modal isOpen={modalIsVisible} onClose={() => setModalIsVisible(false)} shadow={5}>
      <Modal.Content maxWidth={"90%"}>
        <Modal.CloseButton />
        <Modal.Header borderBottomWidth={0} color={"coolGray.700"}>
          Settings
        </Modal.Header>
        <Modal.Body>
          <VStack space={2}>{renderSetTarget()}</VStack>
        </Modal.Body>
        <Modal.Footer borderTopWidth={0}>
          <Button.Group space={2}>
            <Button variant={"filled"} backgroundColor="info.400">
              <Text color={"info.50"} fontWeight="semibold">Save</Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default BarChartWidgetModal;
