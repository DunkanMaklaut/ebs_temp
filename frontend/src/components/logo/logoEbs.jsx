import "./logoEbs.css";
import TextLogo from "./textLogo";
import ImageComponent from "./imageLogo";

const LogoEBS = ({ className = "", sizeText2 }) => {
  return (
    <div className={`${className} logo-container`}>
      <ImageComponent image={"/images/LogoEbs.svg"} />
      <TextLogo sizeText2={sizeText2} />
    </div>
  );
};

export default LogoEBS;
