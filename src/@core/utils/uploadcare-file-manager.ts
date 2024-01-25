import { UploadClient } from "@uploadcare/upload-client";
import { UPLOADCARE_PUBLIC_KEY } from "@src/configs/constants";

const client = new UploadClient({ publicKey: UPLOADCARE_PUBLIC_KEY || "" });

export const uploadFile = (file: File) =>
  client.uploadFile(file).then((uFile) => uFile.uuid);
