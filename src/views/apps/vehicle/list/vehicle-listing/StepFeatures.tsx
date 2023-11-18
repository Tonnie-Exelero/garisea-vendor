// ** React Imports
import { useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";

// ** Custom Components Imports
import CustomChip from "@components/mui/chip";

// ** Icon Imports
import Icon from "src/@core/components/icon";

interface StepFeaturesProps {
  handleFeaturesData: (data: any) => void;
  nextStep: (val: boolean) => void;
}

const StepFeatures: React.FC<StepFeaturesProps> = (props) => {
  const { handleFeaturesData, nextStep } = props;

  // ** State
  const [features, setFeatures] = useState<string[]>(
    window.localStorage.getItem("features")?.split(",") || []
  );
  const [extraInfo, setExtraInfo] = useState<string>(
    window.localStorage.getItem("extraInfo") || ""
  );
  const [newFeature, setNewFeature] = useState<string>("");
  const [showTextField, setShowTextField] = useState<boolean>(false);

  const featuresData = {
    features: [...new Set(features)].toString(),
    extraInfo,
  };

  const handleFeatureSelect = (value: string) => {
    if (features.some((feat) => feat === value)) {
      const updatedList = features.filter((feat) => feat !== value);

      saveDraft("features", updatedList.toString());
      return setFeatures(updatedList);
    }
    saveDraft("features", features.toString());
    return setFeatures((prev) => [...prev, value]);
  };

  const addNewFeature = (value: string) => {
    setShowTextField(false);
    setNewFeature("");

    saveDraft("features", features.toString());
    return setFeatures((prev) => (prev ? [...prev, value] : [value]));
  };

  const confirmData = () => {
    handleFeaturesData(featuresData);
    nextStep(true);
  };

  const saveDraft = (name: string, value: any) =>
    window.localStorage.setItem(name, value);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ mb: 4 }}>
            Add Vehicle Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
            }}
          >
            {features.map((feature, index) => (
              <CustomChip
                rounded
                key={index}
                label={feature}
                skin="light"
                color={"info"}
                onClick={() => handleFeatureSelect(feature)}
                sx={{ cursor: "pointer", "&:hover": { color: "#FFF" } }}
              />
            ))}
            {showTextField && (
              <TextField
                autoFocus
                fullWidth
                id="new-feature"
                aria-label="new-feature"
                type="text"
                size="small"
                variant="standard"
                placeholder="e.g. Stereo"
                label="Feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => addNewFeature(newFeature)}>
                        <Icon icon="bx:bxs-right-arrow-circle" fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 200 }}
              />
            )}
            <Tooltip title="Add feature" placement="top">
              <IconButton onClick={() => setShowTextField(!showTextField)}>
                <Icon icon="bx:plus" fontSize={20} />
              </IconButton>
            </Tooltip>
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
            onBlur={(e) => saveDraft("extraInfo", e.target.value)}
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
