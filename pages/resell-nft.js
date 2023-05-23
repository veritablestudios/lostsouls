import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { NFTContext } from "../context/NFTContext";
import { Loader, Button, Input } from "../components";

const ResellNFT = () => {
  const { createSale, isLoadingNFT, currentAccount, connectWallet } =
    useContext(NFTContext);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI);
    setPrice(data.price);
    setImage(data.image);
  };
  useEffect(() => {
    if (tokenURI) {
      fetchNFT();
    }
  }, [tokenURI, currentAccount]);
  
  if (!currentAccount) {
    connectWallet();
    return;
  }
  if (isLoadingNFT) {
    return <Loader />;
  }
  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId);
    router.push("/");
  };
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins text-white font-semibold text-2xl">
          resell soul
        </h1>
        <Input
          inputType="number"
          title="new price"
          handleClick={(e) => setPrice(e.target.value)}
        />
        {image && (
          <img src={image} alt="NFT" className="rounded mt-4" width={350} />
        )}
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="list soul"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
