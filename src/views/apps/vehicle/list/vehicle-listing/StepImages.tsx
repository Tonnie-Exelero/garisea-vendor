// ** React Imports
import { useState } from "react";

// ** MUI Imports
import { Box, Button, Grid, Typography } from "@mui/material";

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
  const [imageUrls, setImageUrls] = useState<string>();
  const [uploaded, setUploaded] = useState<boolean>(false);

  const imagesData = {
    images: imageUrls,
  };

  const handleImages = (images: string) => {
    setImageUrls(images);
    setUploaded(true);
  };

  const confirmData = () => {
    handleImagesData(imagesData);
    nextStep(true);
  };

  return (
    <>
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
