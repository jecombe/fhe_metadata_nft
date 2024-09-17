import { PinataSDK } from "pinata-web3";
import dotenv from "dotenv";
import { Metadata } from './interface/interfaces';

dotenv.config();


const JWT = `${process.env.KEY}`;

const pinataSet = new PinataSDK({
    pinataJwt: JWT,
    pinataGateway: "https://api.pinata.cloud/pinning/pinFileToIPFS"
  });

const pinataGet = new PinataSDK({
    pinataJwt: JWT,
    pinataGateway: "scarlet-hollow-meerkat-186.mypinata.cloud"
  });


export async function set(metadata: Metadata) {
    try {
     const upload = await pinataSet.upload.json(metadata);
     console.log(upload);
     return upload;
    } catch (error) {
      console.log(error);
    }
  }


  export async function get(cid: string) {
    try {
      const data = await pinataGet.gateways.get(cid);
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

