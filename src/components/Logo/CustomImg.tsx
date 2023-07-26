import { CustomImgProps } from "../../models";

const CustomImg: React.FC<CustomImgProps> = ({
  src,
  alt,
  className,
  style,
}) => {
  return <img src={src} alt={alt} className={className} style={style} />;
};

export default CustomImg;
