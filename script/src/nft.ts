/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import nftAbi from "../abi/MockNft.json";
import dotenv from "dotenv";

dotenv.config();

const contractAddress = `${process.env.CONTRACT_NFT}`;


export const initializeNft = (privateKey: string, providerUrl: string) => {
  const provider = new JsonRpcProvider(providerUrl);

  const wallet = new Wallet(`${privateKey}`, provider);
  const contract = new Contract(`${contractAddress}`, nftAbi, wallet);

  return { wallet, contract };
};