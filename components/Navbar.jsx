import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { NFTContext } from "../context/NFTContext";

import images from "../assets";
import { Button } from ".";

const MenuItems = ({ active, setActive, isMobile }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/created-nfts";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
  };
  return (
    <ul
      className={`list-none flexCenter ${
        isMobile ? "flex-col h-full" : "flex-row"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          key={i}
          className={`flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          }`}
          onClick={() => {
            setActive(item);
          }}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};
const ButtonGroup = ({ setActive, router }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);
  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive("");
        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <Image src={images.logo02} alt="logo" width={32} height={32} />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              LostSouls
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image src={images.logo02} alt="logo" width={32} height={32} />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun cursor-pointer" />
            <i className="fas fa-moon cursor-pointer" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball cursor-pointer" />
          </label>
        </div>
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            src={images.cross}
            alt="close"
            objectFit="contain"
            width={20}
            height={20}
            onClick={() => setIsOpen(!isOpen)}
            className={theme === "light" ? "filter invert" : undefined}
          />
        ) : (
          <Image
            src={images.menu}
            alt="menu"
            objectFit="contain"
            width={25}
            height={25}
            onClick={() => setIsOpen(!isOpen)}
            className={theme === "light" ? "filter invert" : undefined}
          />
        )}
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems isMobile active={active} setActive={setActive} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
