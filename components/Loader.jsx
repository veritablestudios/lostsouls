import Image from "next/image";
import images from "../assets";

const Loader = () => {
  return (
    <div className="flexCenter w-full my-4">
      <Image
        src={images.loader}
        alt="loader"
        width={100}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Loader;
