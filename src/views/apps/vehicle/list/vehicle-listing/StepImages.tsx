// ** React Imports
import { useState } from "react";

// ** Next Imports
import Image from "next/image";

// ** MUI Imports
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

// ** Icon Imports
import Icon from "@components/icon";

// ** Uploadcare Imports
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

// ** Custom Components Imports
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import FileUploaderRestrictions from "../../components/FileUploaderRestrictions";

// ** Others
import {
  UPLOADCARE_PUBLIC_KEY,
  UPLOADCARE_SECRET_KEY,
} from "@src/configs/constants";

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: UPLOADCARE_PUBLIC_KEY || "",
  secretKey: UPLOADCARE_SECRET_KEY || "",
});

interface StepImagesProps {
  handleImagesData: (data: any) => void;
  nextStep: (val: boolean) => void;
}

const StepImages: React.FC<StepImagesProps> = (props) => {
  const { handleImagesData, nextStep } = props;

  // ** States
  const [imageUrls, setImageUrls] = useState<string>(
    window.localStorage.getItem("imageUrls") || ""
  );
  const [thumbnail, setThumbnail] = useState<string>(
    window.localStorage.getItem("thumbnail") || ""
  );
  const [deleting, setDeleting] = useState<string>("");
  const [deletingIndex, setDeletingIndex] = useState<any>();

  const images: string[] = (imageUrls && [...imageUrls.split(",")]) || [
    imageUrls,
  ];

  const imagesData = {
    images: imageUrls,
    thumbnail,
  };

  const handleImages = (images: string) => {
    setImageUrls(images);
    setThumbnail(images.split(",")[0]);
    saveDraft("imageUrls", images);
    saveDraft("thumbnail", images.split(",")[0]);
  };

  const handleImageClick = (url: string) => () => {
    setThumbnail(url);
    saveDraft("thumbnail", url);
  };

  const handleDeleteImage = async (uuid: string, index: any) => {
    setDeleting("ongoing");
    setDeletingIndex(index);

    const result = await deleteFile(
      {
        uuid,
      },
      { authSchema: uploadcareSimpleAuthSchema }
    );

    if (images.some((image) => image === result?.uuid)) {
      const updatedList = images.filter((image) => image !== result?.uuid);

      setImageUrls(updatedList.toString());
      window.localStorage.setItem("imageUrls", updatedList.toString());
    }

    setDeleting("complete");
  };

  const confirmData = () => {
    handleImagesData(imagesData);
    nextStep(true);
  };

  const saveDraft = (name: string, value: any) =>
    window.localStorage.setItem(name, value);

  return (
    <>
      {imageUrls !== "" ? (
        <Box>
          <Typography variant="h5" mb="1.5rem">
            Select Thumbnail
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", mt: 6 }}>
            {images.map((image, index) => (
              <Box sx={{ position: "relative" }} key={index}>
                <Image
                  src={`https://ucarecdn.com/${image}/`}
                  alt={image}
                  width={150}
                  height={150}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: ".4rem",
                  }}
                />

                <Tooltip placement="top" title="Remove Image">
                  <IconButton
                    onClick={() => handleDeleteImage(image, index)}
                    color="error"
                    sx={{
                      position: "absolute",
                      background: "#FFF",
                      top: 5,
                      right: 5,
                      padding: "5px",
                    }}
                  >
                    <Icon fontSize={20} icon="bx:trash" />
                  </IconButton>
                </Tooltip>

                <Tooltip placement="top" title="Set as Thumbnail">
                  <IconButton
                    onClick={handleImageClick(image)}
                    color="secondary"
                    sx={{
                      position: "absolute",
                      background: "#FFF",
                      bottom: 11,
                      right: 5,
                      padding: 0,
                      borderRadius: "50%",
                    }}
                  >
                    <Icon
                      fontSize={35}
                      icon={
                        image === thumbnail
                          ? "bx:checkbox-checked"
                          : "bx:checkbox"
                      }
                    />
                  </IconButton>
                </Tooltip>

                {deleting === "ongoing" && deletingIndex === index && (
                  <IconButton
                    color="success"
                    sx={{
                      position: "absolute",
                      top: "30%",
                      right: "30%",
                      opacity: 1,
                    }}
                  >
                    <Icon fontSize={50} icon="line-md:loading-twotone-loop" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <DropzoneWrapper>
          <Grid container spacing={5} className="match-height">
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="h5" sx={{ mb: 4 }}>
                  Add Images
                </Typography>
                <FileUploaderRestrictions
                  handleImages={handleImages}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </DropzoneWrapper>
      )}

      <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography sx={{ mb: 2 }}>
            After images are uploaded successfully, confirm by clicking below
          </Typography>
          <Box>
            <Button
              color="info"
              variant="outlined"
              disabled={!imageUrls || !thumbnail}
              onClick={confirmData}
            >
              Confirm Data
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepImages;
