import { useState, useContext, useEffect } from "react";
import { NFTContext } from "../context/NFTContext";
import { Loader, NFTCard } from "../components";
const ListedNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
      setNfts(items);
      setIsLoading(false);
    });
  }, [currentAccount]);
  if (!currentAccount) {
    return;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins text-white text-3xl font-extrabold">
          nothing listed for sale.
        </h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:4/5">
        <div className="mt-4">
          <h2 className="font-poppins text-white text-2xl font-semibold mt-2 ml-4 sm:ml-2">
            cursed souls seeking new owners
          </h2>
          <div className="mt-3 w-full flex flex-wrap sm:justify-center">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedNFTs;
