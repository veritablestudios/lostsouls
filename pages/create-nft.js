import { useState, useMemo, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { NFTContext } from "../context/NFTContext";
import { Button, Input, Loader } from "../components";
import images from "../assets";
const CreateNFT = () => {
  const {
    uploadToIPFS,
    createNFT,
    isLoadingNFT,
    connectWallet,
    currentAccount,
  } = useContext(NFTContext);
  const router = useRouter();
  useEffect(() => {
    if (!currentAccount) {
      connectWallet();
      router.replace("/");
    }
  }, [currentAccount]);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    price: "",
  });
  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 10 * 1024 * 1024,
  });
  const fileStyle = useMemo(
    () =>
      `bg-neutral-800 border border-white flex flex-col items-center p-5 rounded-lg border-dashed`,
    [isDragActive, isDragAccept, isDragReject]
  );

  if (isLoadingNFT) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins text-white text-2xl minlg:text-4xl font-semibold xs:ml-0">
          forge a new soul
        </h1>
        <div className="mt-16">
          <p className="font-poppins text-white font-semibold text-xl">
            upload soul
          </p>
          <div className="mt-4 cursor-pointer">
            <div {...getRootProps()} className={`${fileStyle}`}>
              <input {...getInputProps()} required />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins text-white font-semibold text-xl lowercase">
                  JPG, PNG, JPEG, GIF, SVG, WEBP. (Max 10MB)
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    alt="upload"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="font-poppins text-white font-semibold text-sm">
                  drag and drop soul
                </p>
                <p className="font-poppins text-white font-semibold text-sm mt-2">
                  or browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="name"
          placeholder="soul name"
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType="textarea"
          title="description"
          placeholder="soul description"
          handleClick={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          inputType="number"
          title="price"
          placeholder="0.001"
          handleClick={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="forge soul"
            classStyles="rounded-xl"
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
