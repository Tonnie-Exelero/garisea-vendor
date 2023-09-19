// ** React Imports
import { useState } from "react";

// ** MUI Imports
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

// ** Custom Components Imports
import CustomChip from "@components/mui/chip";

// ** Others
import { featuresArray } from "../../config";

interface StepFeaturesProps {
  handleFeaturesData: (data: any) => void;
  nextStep: (val: boolean) => void;
}

const StepFeatures: React.FC<StepFeaturesProps> = (props) => {
  const { handleFeaturesData, nextStep } = props;

  // ** State
  const [features, setFeatures] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState<string>("");

  const featuresData = {
    features: [...new Set(features)].toString(),
    extraInfo,
  };

  const handleFeatureSelect = (value: string) => {
    if (features.some((subject) => subject === value)) {
      const updatedList = features.filter((subject) => subject !== value);
      return setFeatures(updatedList);
    }
    return setFeatures((prev) => [...prev, value]);
  };

  const confirmData = () => {
    handleFeaturesData(featuresData);
    nextStep(true);
  };

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ mb: 4 }}>
            Select Vehicle Features
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {featuresArray.map((feature, index) => (
              <CustomChip
                rounded
                key={index}
                label={feature}
                skin="light"
                color={features.includes(feature) ? "info" : "secondary"}
                onClick={() => handleFeatureSelect(feature)}
                sx={{ cursor: "pointer", "&:hover": { color: "#FFF" } }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={5}
            id="extra-info"
            aria-label="extra-info"
            label="Extra Vehicle Info"
            type="text"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Add any extra info about the vehicle"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography sx={{ mb: 2 }}>
            Confirm data entered is correct by clicking below
          </Typography>
          <Box>
            <Button color="info" variant="outlined" onClick={confirmData}>
              Confirm Data
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepFeatures;
