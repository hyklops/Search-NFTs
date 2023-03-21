import { getProvider } from "@wagmi/core";
import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import marketplace from "../utils/marketplace.json";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Home = () => {
  const [listedNFTs, setListedNFTs] = useState(null);
  const [fetched, updateFetched] = useState(false);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const getAllNFTs = async () => {
    const providerWagmi = getProvider();
    const marketplaceContractRead = new ethers.Contract(
      marketplace.address,
      marketplace.abi,
      providerWagmi
    );
    let transaction = await marketplaceContractRead.getAllNFTs();
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await marketplaceContractRead.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );

    setListedNFTs(items);
    updateFetched(true);
  };

  if (!fetched) getAllNFTs();

  const nftCard = () => {
    return listedNFTs?.map((nft) => {
      return (
        <div
          key={nft.tokenId}
          className="w-60 h-96 rounded overflow-hidden shadow-lg"
        >
          <div className="w-60 h-72 mx-auto overflow-hidden">
            <img
              className=" mx-auto object-cover h-full w-full hover:scale-125 ease-out duration-200"
              src={nft.image}
              alt="nft"
            />
          </div>
          <div className="mx-5 my-5 flex justify-between items-center ">
            <p className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold    ">
              {nft.name}
            </p>
            <button
              onClick={() => executeSale(nft)}
              className="  hover:bg-green-100 font-bold py-2 px-4 border border-black rounded"
            >
              <p className="font-semibold">{nft.price + "  ETH"}</p>
            </button>
          </div>
        </div>
      );
    });
  };

  const executeSale = async (nft) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplaceContractRead = new ethers.Contract(
          marketplace.address,
          marketplace.abi,
          signer
        );
        const salePrice = ethers.utils.parseUnits(nft.price, "ether");
        let transaction = await marketplaceContractRead.executeSale(
          nft.tokenId,
          {
            value: salePrice,
          }
        );
        const receipt = await transaction.wait();
        console.log(receipt);
      } catch (error) {
        alert.error;
      }
    } else {
      connect();
    }
  };

  return (
    <div className="">
      {fetched ? (
        <div className="flex mt-10 flex-wrap gap-6 justify-center">
          {nftCard()}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
