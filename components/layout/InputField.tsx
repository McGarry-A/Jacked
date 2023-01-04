import { FormControl, IInputProps, Input } from "native-base";

interface IInputField extends IInputProps {
  label: string;
}

const InputField = ({ label, ...rest }: IInputField) => {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        {...rest}
        w="full"
        placeholder="Enter Password"
        type={"password"}
        variant="filled"
        backgroundColor={"white"}
        _focus={{
          borderColor: "info.200",
        }}
      />
    </FormControl>
  );
};

export default InputField;
