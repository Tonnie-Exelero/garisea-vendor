// ** React Imports
import { useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// ** Others
import { vehicleBodyTypes } from "../../config";

interface StepOpticsProps {
  handleOpticsData: (data: any) => void;
  nextStep: (val: boolean) => void;
}

const StepOptics: React.FC<StepOpticsProps> = (props) => {
  const { handleOpticsData, nextStep } = props;

  // ** State
  const [exteriorColor, setExteriorColor] = useState<string>(
    window.localStorage.getItem("exteriorColor") || ""
  );
  const [interiorColor, setInteriorColor] = useState<string>(
    window.localStorage.getItem("interiorColor") || ""
  );
  const [bodyType, setBodyType] = useState<string>(
    window.localStorage.getItem("bodyType") || ""
  );
  const [upholstery, setUpholstery] = useState<string>(
    window.localStorage.getItem("upholstery") || ""
  );
  const [seats, setSeats] = useState<number | null>(
    Number(window.localStorage.getItem("seats")) || null
  );
  const [doors, setDoors] = useState<number | null>(
    Number(window.localStorage.getItem("doors")) || null
  );
  const [steering, setSteering] = useState<string>(
    window.localStorage.getItem("steering") || "RHD"
  );

  const opticsData = {
    exteriorColor,
    interiorColor,
    bodyType,
    upholstery,
    seats,
    doors,
    steering,
  };

  const confirmData = () => {
    handleOpticsData(opticsData);
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
            id="exterior-color"
            aria-label="exterior-color"
            label="Exterior Color"
            type="text"
            value={exteriorColor}
            onChange={(e) => setExteriorColor(e.target.value)}
            onBlur={(e) => saveDraft("exteriorColor", e.target.value)}
            placeholder="e.g. White"
            sx={{ mb: 4 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="interior-color"
            aria-label="interior-color"
            label="Interior Color"
            type="text"
            value={interiorColor}
            onChange={(e) => setInteriorColor(e.target.value)}
            onBlur={(e) => saveDraft("interiorColor", e.target.value)}
            placeholder="e.g. Beige"
            sx={{ mb: 4 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 4 }} required>
            <InputLabel htmlFor="upholstery-select">Upholstery</InputLabel>
            <Select
              fullWidth
              id="upholstery"
              labelId="upholstery-select"
              label="Upholstery"
              value={upholstery}
              onChange={(e) => {
                setUpholstery(e.target.value);
                saveDraft("upholstery", e.target.value);
              }}
              inputProps={{ placeholder: "Select Upholstery" }}
            >
              <MenuItem value="Leather">Leather</MenuItem>
              <MenuItem value="Faux Leather">Faux Leather</MenuItem>
              <MenuItem value="Alcantara">Alcantara</MenuItem>
              <MenuItem value="Vinyl">Vinyl</MenuItem>
              <MenuItem value="Polyester">Polyester</MenuItem>
              <MenuItem value="Nylon">Nylon</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor="body-type-select">Body Type</InputLabel>
            <Select
              fullWidth
              id="body-type"
              labelId="body-type-select"
              label="Body Type"
              value={bodyType}
              onChange={(e) => {
                setBodyType(e.target.value);
                saveDraft("bodyType", e.target.value);
              }}
              inputProps={{ placeholder: "Select Body Type" }}
            >
              {vehicleBodyTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="seats-number"
            aria-label="seats-number"
            type="number"
            placeholder="e.g. 4"
            label="Seats Number"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            onBlur={(e) => saveDraft("seats", Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">seats</InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="doors-number"
            aria-label="doors-number"
            type="number"
            placeholder="e.g. 5"
            label="Doors Number"
            value={doors}
            onChange={(e) => setDoors(Number(e.target.value))}
            onBlur={(e) => saveDraft("doors", Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">doors</InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ mb: 4 }}>
            <FormLabel
              id="steering-radio"
              sx={{
                fontWeight: 500,
                fontSize: "0.875rem",
                lineHeight: "21px",
                letterSpacing: "0.1px",
              }}
            >
              Steering
            </FormLabel>
            <RadioGroup
              name="steering-group"
              aria-labelledby="steering-radio"
              value={steering}
              onChange={(e) => {
                setSteering(e.target.value);
                saveDraft("steering", e.target.value);
              }}
            >
              <FormControlLabel control={<Radio />} value="RHD" label="RHD" />
              <FormControlLabel control={<Radio />} value="LHD" label="LHD" />
            </RadioGroup>
          </FormControl>
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
              disabled={!exteriorColor || !interiorColor || !upholstery}
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

export default StepOptics;
