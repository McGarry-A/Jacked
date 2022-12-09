import { Box, Text } from "native-base";

interface IModalItem {
  children: React.ReactNode;
  props?: any;
}

const ModalItem = ({ children, ...props }: IModalItem) => {
  return (
    <Box
      marginY={1}
      borderWidth={2}
      borderColor={"whitesmoke"}
      borderRadius={10}
      padding={2}
      overflow={"hidden"}
      flex={1}
      {...props}
    >
      <Text>{children}</Text>
    </Box>
  );
};

export default ModalItem;
