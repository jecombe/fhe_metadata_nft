import CryptoJS from 'crypto-js';
import fs from 'fs';
import ethers, { decodeBytes32String, encodeBytes32String } from "ethers";
import {  get, set } from './pinata';
import { initializeFhe } from './fhevm';
import { decryptAttributes, encryptAttributes } from './encryptManager';
import { Metadata } from './interface/interfaces';
const providerUrl = "https://devnet.zama.ai/"; // or your preferred Ethereum provider

// Clé de chiffrement (à conserver en sécurité)
/*const encryptionKey = 'my_secret_key';

// Les métadonnées avec des traits (non chiffrés)
const metadata = {
    name: "My NFT",
    description: "This is my NFT description",
    image: "https://example.com/image.png", // URL de l'image
    attributes: [
        {
            trait_type: "level",
            value: "10"
        },
    ]
};

// Fonction pour chiffrer les attributs
function encryptAttributes(attributes: any, key: any) {
    const encryptedAttributes = attributes.map((attr: { value: { toString: () => string | CryptoJS.lib.WordArray; }; level: string; }) => {
        const encryptedValue = CryptoJS.AES.encrypt(attr.value.toString(), key).toString();
        return {
            trait_type: attr.trait_type,
            value: encryptedValue
        };
    });
    return encryptedAttributes;
}


function decryptAttribute(encryptedValue: any, key: any) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}


const encryptedAttributes = encryptAttributes(metadata.attributes, encryptionKey);

console.log(encryptedAttributes);

// Exemple de déchiffrement
// Assurez-vous d'avoir la clé de chiffrement correcte pour déchiffrer
const encryptedValue = encryptedAttributes[0].value; // Récupérer une valeur chiffrée
const decryptedValue = decryptAttribute(encryptedValue, encryptionKey);*/
//get()



const metadata: Metadata = {
    name: "My NFT",
    description: "This is my NFT description",
    image: "https://example.com/image.png",
    attributes: [
        {
            trait_type: "level",
            value: "10"
        },
    ]
};

const start = async () => {
    try {

        const fhevmInstance = await initializeFhe();

        
        const encryptionKey = 'my_secret_key';

        const ecryptedJson = encryptAttributes(metadata, encryptionKey);
        console.log(ecryptedJson);


        const descrypt = decryptAttributes(ecryptedJson, encryptionKey);
        

      // const responsePinate = await set(ecryptedJson);

     //  if (responsePinate) {
        //const rep = await get(responsePinate.IpfsHash);
        console.log(descrypt);
        
   // }
        
    } catch (error) {
        
    }
}

start();