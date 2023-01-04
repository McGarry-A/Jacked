import { IImageProps, Image } from "native-base";
import LogoImg from "../../images/logo.png";

export default function Logo({ ...rest }: IImageProps) {
  return <Image {...rest} src={LogoImg} alt={"JACKED Logo"} />;
}
