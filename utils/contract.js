import { ethers } from "ethers";
import { marketplaceABI } from "../utils/marketplaceABI.json";

const web3Provider = new ethers.BrowserProvider(window.ethereum);
const contractAdress = 0x1c664d1861329693d58082d84dd5dcf101e49a84;
const signer = web3Provider.getSigner();
const marketplaceContract = new ethers.Contract(
  contractAdress,
  marketplaceABI,
  signer
);

export const marketplaceURL = async () => {
  return await marketplaceContract.contractURI();
};
