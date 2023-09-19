import CryptoJS from "crypto-js";
import config from "@src/configs/auth";

export const encryptData = (data: any) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.cryptoSecret
  ).toString();

  return encrypted;
};

export const decryptData = (data: string) => {
  const decrypted = CryptoJS.AES.decrypt(data, config.cryptoSecret).toString(
    CryptoJS.enc.Utf8
  );

  return JSON.parse(decrypted);
};
