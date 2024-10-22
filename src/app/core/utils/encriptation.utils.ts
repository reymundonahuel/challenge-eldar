import * as CryptoJS from 'crypto-js'
import { HASH_ENCRYPT } from '../constants/env.constants';

export const Encriptar = (texto: any) => {
    return encodeURIComponent(
      CryptoJS.AES.encrypt(JSON.stringify(texto), HASH_ENCRYPT).toString()
    );
}

export const Desencriptar = (textoEncriptado: any) => {
    const bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(textoEncriptado),
      HASH_ENCRYPT
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };