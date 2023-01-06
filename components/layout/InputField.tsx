import { FormControl, IInputProps, Input } from "native-base";

interface IInputField extends IInputProps {
  label: string;
}

const InputField = ({ label, ...rest }: IInputField) => {
  return (
    <FormControl w={'full'}>
      <FormControl.Label fontSize={18} fontWeight={700}>{label}</FormControl.Label>
      <Input
        {...rest}
        h={"12"}
        w="full"
        variant="filled"
        _focus={{
          borderColor: "info.200",
        }}
      />
    </FormControl>
  );
};

export default InputField;
