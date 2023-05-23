import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { NFTContext } from "../context/NFTContext";
import { Loader, NFTCard, Banner, SearchBar } from "../components";
import { shortenAddress } from "../utils/shortenAddress";
import { getAvatar } from "../utils/getAvatar";
const MyNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState("recently added");
  if (!currentAccount) {
    return;
  }
  useEffect(() => {
    fetchMyNFTsOrListedNFTs().then((items) => {
      setNfts(items);
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];
    switch (activeSelect) {
      case "price (low to high)":
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "price (high to low)":
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
    }
  }, [activeSelect]);

  if (isLoading) {
    return <Loader />;
  }

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredNFTs.length) {
      setNfts(filteredNFTs);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };
  console.log("currentAccount", currentAccount);

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="your souls"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center mt-5"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="hvr-buzz relative flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1">
            <Image src={getAvatar(currentAccount)} fill alt="avatar" />
          </div>
          <p className="font-poppins text-white font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>
      {!isLoading && !nfts.length && !nftsCopy.length ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins text-white text-3xl font-extrabold">
            nothing owned.
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 w-full flex flex-wrap sm:justify-center">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
