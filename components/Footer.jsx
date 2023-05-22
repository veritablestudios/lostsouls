import Image from "next/image";

import images from "../assets";
import { Button } from ".";
const FooterLinks = ({ heading, items }) => {
  return (
    <div className="flex-1 justify-start items-start">
      <h3 className="font-poppins text-white font-semibold text-xl mb-10">
        {heading}
      </h3>
      {items.map((item, index) => (
        <p
          className="hover:text-neutral-500 font-poppins text-white font-normal text-base cursor-pointer  my-3"
          key={index}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="flexCenter flex-col border-t border-neutral-700 sm:py-8 py-16">
      <div className=" w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image src={images.logo} alt="logo" width={32} height={32} />
            <p className="text-white font-semibold text-lg ml-1 font-poppins">
              LostSouls
            </p>
          </div>
          <p className="font-poppins text-white font-semibold text-base mt-6">
            get the latest updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 bg-neutral-900 rounded-xl outline-none">
            <input
              type="email"
              placeholder="your email"
              className="hover:shadow-inner hover:shadow-neutral-950 ease-in-out duration-300 font-poppins h-full flex-1 w-full bg-neutral-900  px-4 rounded-xl text-white font-normal text-xs minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              <Button btnName="email me" classStyles="rounded-xl" />
            </div>
          </div>
        </div>
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks
            heading="LostSouls"
            items={["explore", "how it works", "contact us"]}
          />
          <FooterLinks
            heading="support"
            items={[
              "help center",
              "terms of service",
              "legal",
              "privacy policy",
            ]}
          />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t border-neutral-700 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins text-white font-semibold text-base">
            LostSouls, inc. all rights reserved
          </p>
          <div className="flex flex-row sm:mt-4">
            {[
              images.instagram,
              images.twitter,
              images.telegram,
              images.discord,
            ].map((image, index) => (
              <div className="mx-2 cursor-pointer hvr-grow-rotate" key={index}>
                <Image src={image} alt="social" width={24} height={24} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
