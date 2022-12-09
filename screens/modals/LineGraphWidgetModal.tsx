import { Modal, Text } from "native-base";
import { SetStateAction } from "react";

interface ILineGraphWidgetModal {
    modalIsVisible: boolean;
    setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const LineGraphWidgetModal = (props: ILineGraphWidgetModal) => {
    const { modalIsVisible, setModalIsVisible } = props;

    return (
        <Modal isOpen={modalIsVisible} onClose={() => setModalIsVisible(false)}>
          <Modal.Content maxWidth={"90%"}>
            <Modal.CloseButton />
            <Modal.Header>Line graph Modal</Modal.Header>
            <Modal.Body>
              <Text>Modal Body</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
  
      );
}

export default LineGraphWidgetModal