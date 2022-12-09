import { Modal, Text } from "native-base";
import { SetStateAction } from "react";

interface IBarChartWidgetModal {
    modalIsVisible: boolean;
    setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const BarChartWidgetModal = (props: IBarChartWidgetModal) => {
    const { modalIsVisible, setModalIsVisible } = props;

    return (
        <Modal isOpen={modalIsVisible} onClose={() => setModalIsVisible(false)}>
          <Modal.Content maxWidth={"90%"}>
            <Modal.CloseButton />
            <Modal.Header>Bar chart Modal</Modal.Header>
            <Modal.Body>
              <Text>Modal Body</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
  
      );
}

export default BarChartWidgetModal