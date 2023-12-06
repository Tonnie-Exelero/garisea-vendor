import CryptoJS from "crypto-js";
import config from "@src/configs/auth";

export const encryptData = (data: any) => {
  let encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.cryptoSecret
  ).toString();

  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
};

export const decryptData = (data: string) => {
  let decrypted = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);

  return JSON.parse(
    CryptoJS.AES.decrypt(decrypted, config.cryptoSecret).toString(
      CryptoJS.enc.Utf8
    )
  );
};
