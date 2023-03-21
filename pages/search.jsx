import { useEffect, useState } from "react";
import { router, useRouter } from "next/router";

const Search = () => {
  const [NFTs, setNFTs] = useState([]);
  const router = useRouter();
  const { query: props } = router;
  // for testnet goerli: https://testnets-api.opensea.io/api/v1/assets?owner=${props.searchWallet}
  // for ethereum: https://api.opensea.io/api/v1/assets?owner=${props.searchWallet}

  const fetchNFTs = async () => {
    const response = await fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=${props.address}`
    ).then((response) => response.json());
    setNFTs(response);
  };

  useEffect(() => {
    fetchNFTs();
  }, [props]);

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
    <div className="">
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl "></h1>
      <div className="flex mt-10 flex-col items-center justify-center mb-5"></div>
      {NFTs ? (
        <div className="flex mt-10 flex-wrap gap-6 justify-center">
          {nftCard()}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
