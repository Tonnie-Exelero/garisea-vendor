// ** React Imports
import React, { useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

interface StepDriveTrainProps {
  handleDriveTrainData: (data: any) => void;
  nextStep: (val: boolean) => void;
}

const StepDriveTrain: React.FC<StepDriveTrainProps> = (props) => {
  const { handleDriveTrainData, nextStep } = props;

  // ** States
  const [engineType, setEngineType] = useState<string>(
    window.localStorage.getItem("engineType") || ""
  );
  const [engineCapacity, setEngineCapacity] = useState<number | null>(
    Number(window.localStorage.getItem("engineCapacity")) || null
  );
  const [fuelType, setFuelType] = useState<string>(
    window.localStorage.getItem("fuelType") || ""
  );
  const [transmissionType, setTransmissionType] = useState<string>(
    window.localStorage.getItem("transmissionType") || ""
  );
  const [driveType, setDriveType] = useState<string>(
    window.localStorage.getItem("driveType") || ""
  );
  const [vinNo, setVinNo] = useState<string>(
    window.localStorage.getItem("vinNo") || ""
  );

  const driveTrainData = {
    engineType,
    engineCapacity,
    fuelType,
    transmissionType,
    driveType,
    vinNo,
  };

  const confirmData = () => {
    handleDriveTrainData(driveTrainData);
    nextStep(true);
  };

  const saveDraft = (name: string, value: any) =>
    window.localStorage.setItem(name, value);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="engine-type"
            aria-label="engine-type"
            label="Engine Type"
            type="text"
            value={engineType}
            onChange={(e) => {
              setEngineType(e.target.value);
              saveDraft("engineType", e.target.value);
            }}
            placeholder="e.g. V6 BiTurbo"
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="engine-capacity"
            aria-label="engine-capacity"
            type="number"
            placeholder="e.g. 3000"
            label="Engine Capacity"
            value={engineCapacity}
            onChange={(e) => setEngineCapacity(Number(e.target.value))}
            onBlur={(e) => saveDraft("engineCapacity", Number(e.target.value))}
            InputProps={{
              endAdornment: <InputAdornment position="end">cc</InputAdornment>,
            }}
            sx={{ mb: 4 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 4 }} required>
            <InputLabel htmlFor="fuel-type-select">Fuel Type</InputLabel>
            <Select
              fullWidth
              id="fuel-type"
              labelId="fuel-type-select"
              label="Fuel Type"
              value={fuelType}
              onChange={(e) => {
                setFuelType(e.target.value);
                saveDraft("fuelType", e.target.value);
              }}
              inputProps={{ placeholder: "Select Fuel Type" }}
            >
              <MenuItem value="Petrol/Gasoline">Petrol/Gasoline</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
              <MenuItem value="Electric">Electric</MenuItem>
              <MenuItem value="LPG">LPG</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 4 }} required>
            <InputLabel htmlFor="transmission-type-select">
              Transmission Type
            </InputLabel>
            <Select
              fullWidth
              id="transmission-type"
              labelId="transmission-type-select"
              label="Transmission Type"
              value={transmissionType}
              onChange={(e) => {
                setTransmissionType(e.target.value);
                saveDraft("transmissionType", e.target.value);
              }}
              inputProps={{ placeholder: "Select Transmission Type" }}
            >
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Semi-Automatic">Semi-Automatic</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
              <MenuItem value="Unspecified">Unspecified</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 4 }} required>
            <InputLabel htmlFor="drive-type-select">Drive Type</InputLabel>
            <Select
              fullWidth
              id="drive-type"
              labelId="drive-type-select"
              label="Drive Type"
              value={driveType}
              onChange={(e) => {
                setDriveType(e.target.value);
                saveDraft("driveType", e.target.value);
              }}
              inputProps={{ placeholder: "Select Drive Type" }}
            >
              <MenuItem value="2 Wheel Drive (Front)">
                2 Wheel Drive (Front)
              </MenuItem>
              <MenuItem value="2 Wheel Drive (Rear)">
                2 Wheel Drive (Rear)
              </MenuItem>
              <MenuItem value="All Wheel Drive">All Wheel Drive</MenuItem>
              <MenuItem value="4x4">4x4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="vin-number"
            aria-label="vin-number"
            label="VIN Number"
            type="text"
            value={vinNo}
            onChange={(e) => setVinNo(e.target.value)}
            onBlur={(e) => saveDraft("vinNo", e.target.value)}
            placeholder="e.g. 1GNEK13ZX3R298984"
            sx={{ mb: 4 }}
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
            <Button
              color="info"
              variant="outlined"
              disabled={
                !engineCapacity || !fuelType || !transmissionType || !driveType
              }
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

export default StepDriveTrain;
