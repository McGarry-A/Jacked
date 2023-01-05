import { IImageProps, Image } from "native-base";

export default function Logo({ ...rest }: IImageProps) {
  return (
    <Image
      {...rest}
      source={require("../../images/logo.png")}
      alt={"JACKED Logo"}
    />
  );
}
