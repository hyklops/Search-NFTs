import { useEffect, useState } from "react";
import Image from "next/image";

const Home = () => {
  const [wallet, setWallet] = useState("");
  const [collection, setCollectionAdress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [mmWallet, setMmWallet] = useState("Connect Wallet");

  // const fetchNFTs = async () => {
  //   const response = await fetch(`http://localhost:3001/api?owner=${wallet}`);
  //   const nfts = await response.json();
  //   setNFTs(nfts);
  // };

  useEffect(() => {
    fetchNFTs();
  }, [isConnected]);

  const fetchNFTs = async () => {
    const response = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${wallet}`
    ).then((response) => response.json());
    setNFTs(response);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        setMmWallet(res);
        setIsConnected(true);
        setWallet(res);
      });
    }
  };

  const nftCard = () => {
    return NFTs?.assets?.map((nft) => {
      return (
        <div
          key={nft.id}
          className="w-80 max-h-96 rounded overflow-hidden shadow-lg"
        >
          <div className="w-80 h-80 mx-auto ">
            <img
              className=" mx-auto object-contain h-full w-full"
              src={nft.image_url}
              alt="nft"
            />
          </div>
          <div className="mx-5 my-1">
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">
              {nft.name}
            </p>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold">
              {nft.collection.name}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div>
        <button
          onClick={connectWallet}
          className=" bg-white hover:bg-gray-100 rounded-md border border-gray-400 px-4 py-0.5 shadow-xl overflow-ellipsis overflow-hidden w-40 absolute top-0 right-0"
        >
          {mmWallet}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center mb-5">
        <input
          className="border border-black rounded-md"
          onChange={(e) => {
            setWallet(e.target.value);
          }}
          value={wallet}
          placeholder="Wallet Address"
          type="text"
        />
        <button
          onClick={() => {
            fetchNFTs();
          }}
          className="bg-white hover:bg-gray-100 rounded-xl border border-gray-400 px-4 py-0.5 shadow-xl "
        >
          Search
        </button>
      </div>
      {NFTs ? (
        <div className="flex flex-wrap gap-6 justify-center">{nftCard()}</div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
