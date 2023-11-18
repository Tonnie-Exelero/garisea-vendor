// ** React Imports
import { useState } from "react";

// ** Next Imports
import Image from "next/image";

// ** MUI Imports
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

// ** Custom Components Imports
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import FileUploaderRestrictions from "../../components/FileUploaderRestrictions";

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
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [uploaded, setUploaded] = useState<boolean>(false);

  const images: string[] = (imageUrls && [...imageUrls.split(",")]) || [
    imageUrls,
  ];

  const imagesData = {
    images: imageUrls,
    thumbnail,
  };

  const handleImages = (images: string) => {
    setImageUrls(images);
    saveDraft("imageUrls", images);
  };

  const handleImageClick = (url: string, ind: number) => () => {
    setSelectedImage(ind);
    setThumbnail(url);
    setUploaded(true);
    saveDraft("thumbnail", url);
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "2rem",
              overflow: "hidden",
            }}
          >
            <Image
              src={images[selectedImage]}
              alt={"Garisea vehicle image"}
              width={600}
              height={400}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "2rem",
              overflow: "auto",
            }}
          >
            {images.map((url, ind) => (
              <Box
                key={ind}
                sx={{
                  width: "70px",
                  height: "70px",
                  background: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: ind === 0 ? "auto" : "",
                  mr: ind === images.length - 1 ? "auto" : "10px",
                }}
                onClick={handleImageClick(url, ind)}
              >
                <Avatar
                  src={url}
                  variant="rounded"
                  sx={{
                    width: 70,
                    height: 70,
                    p: "5px",
                    border: selectedImage === ind ? "1px solid green" : "none",
                  }}
                />
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
              disabled={!uploaded}
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
