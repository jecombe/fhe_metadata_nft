import { createInstance } from 'fhevmjs/node';


export const createFhevmInstance = async () => {
  //await initFhevm();
  return createInstance({
    chainId: 9000,
    networkUrl: "https://devnet.zama.ai/",
    gatewayUrl: "https://gateway.devnet.zama.ai/",
  });
};


export const initializeFhe = async () => {
    const instance = await createFhevmInstance();
    return instance;
  };
