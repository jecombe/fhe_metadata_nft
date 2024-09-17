import CryptoJS from 'crypto-js';
import { Metadata } from './interface/interfaces';

// Fonction pour chiffrer les attributs
export const encryptAttributes = (metadata: Metadata, key: string): Metadata => {
    const encryptedAttributes = metadata.attributes.map(attr => ({
        trait_type: attr.trait_type,
        value: CryptoJS.AES.encrypt(attr.value, key).toString()
    }));

    return {
        ...metadata,
        attributes: encryptedAttributes
    };
}

export const decryptAttributes = (metadata: Metadata, key: string): Metadata => {
    const decryptedAttributes = metadata.attributes.map(attr => ({
        trait_type: attr.trait_type,
        value: CryptoJS.AES.decrypt(attr.value, key).toString(CryptoJS.enc.Utf8)
    }));

    return {
        ...metadata,
        attributes: decryptedAttributes
    };
}