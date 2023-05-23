import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NFTContext } from "../context/NFTContext";
import { Loader, Button, Modal } from "../components";
import { shortenAddress } from "../utils/shortenAddress";
import { getAvatar } from "../utils/getAvatar";
const PaymentBodyCmp = ({ nft, nftCurrency }) => {
  return (
    <div className="flex flex-col">
      <div className="flexBetween">
        <p className="font-poppins text-white font-semibold text-base minlg:text-xl">
          Item
        </p>
        <p className="font-poppins text-white font-semibold text-base minlg:text-xl">
          Subtotal
        </p>
      </div>
      <div className="flexBetweenStart my-5">
        <div className="flex-1 flexStartCenter">
          <div className="relative w-28 h-28">
            <Image src={nft.image} fill alt="nft-image" />
          </div>
          <div className="flexCenterStart flex-col ml-5">
            <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">
              {shortenAddress(nft.seller)}
            </p>
            <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">
              {nft.name}
            </p>
          </div>
        </div>
        <div>
          <p className="font-poppins text-white font-normal text-sm minlg:text-xl">
            {nftCurrency}
            {nft.price}
          </p>
        </div>
      </div>
      <div className="flexBetween mt-10">
        <p className="font-poppins text-white font-normal text-base minlg:text-xl">
          Total
        </p>
        <p className="font-poppins text-white font-normal text-sm minlg:text-xl">
          {nftCurrency}
          {nft.price}
        </p>
      </div>
    </div>
  );
};

const NFTDetails = () => {
  const { isLoadingNFT, currentAccount, nftCurrency, buyNFT, connectWallet } =
    useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    description: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    setNft(router.query);
    setIsLoading(false);
  }, [router.isReady, currentAccount]);

  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };

  if (isLoading) {
    return <Loader />;
  }
  console.log("nft.seller", nft.seller);
  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b border-neutral-700">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image
            src={nft.image}
            style={{ objectFit: "cover" }}
            className="shadow-md"
            fill
            alt="nft-image"
          />
        </div>
      </div>

      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins text-white font-semibold text-2xl minlg:text-3xl lowercase">
            {nft.name}
          </h2>
        </div>
        <div className="mt-10">
          <p className="font-poppins text-white text-xs minlg:text-base font-normal">
            creator
          </p>
          <div className="flex flex-row items-center mt-3">
            <div className="hvr-buzz relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={getAvatar(nft.seller.toLowerCase())}
                alt="avatar"
                fill
              />
            </div>
            <p className="font-poppins text-white text-xs minlg:text-base font-semibold">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b border-neutral-700 flex flex-row">
            <p className="font-poppins text-white text-base mb-2 font-medium">
              details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins text-white text-base font-normal lowercase">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row mt-10 sm:flex-col">
          {nft.seller.toLowerCase() === currentAccount ? (
            <p className="animate__animated animate__headShake animate__infinite font-poppins text-white text-base font-normal bg-neutral-800 p-2 border">
              forbidden paradox - can't buy your own relic
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName="resell soulbound relic"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() =>
                router.push(
                  {
                    pathname: "/resell-nft",
                    query: { tokenId: nft.tokenId, tokenURI: nft.tokenURI },
                  },
                  `/resell-nft/${nft.tokenId}`
                )
              }
            />
          ) : (
            <Button
              btnName={`buy for ${nftCurrency}${nft.price}`}
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => {
                if (!currentAccount) {
                  connectWallet();
                  return;
                }
                setPaymentModal(true);
              }}
            />
          )}
        </div>
      </div>
      {paymentModal && (
        <Modal
          header="check out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col">
              <Button
                btnName="cancel"
                classStyles=" mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
              <Button
                btnName="checkout"
                classStyles="rounded-xl"
                handleClick={checkout}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
      {isLoadingNFT && (
        <Modal
          header="buying soul..."
          body={
            <div className="flexCenter flex-col text-center">
              <div className="relative w-52 h-52">
                <Loader />
              </div>
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
      {successModal && (
        <Modal
          header="payment successful"
          body={
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image
                  src={nft.image}
                  style={{ objectFit: "cover" }}
                  fill
                  alt="nft"
                />
              </div>
              <p className="font-poppins text-white font-normal text-sm minlg:text-xl mt-10">
                you successfully purchased{" "}
                <span className="font-semibold">{nft.name}</span> from{" "}
                <span className="font-semibold">
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
          }
          footer={
            <div className="flexCenter flex-col">
              <Button
                btnName="check it out"
                classStyles="sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => router.push("/my-nfts")}
              />
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default NFTDetails;
