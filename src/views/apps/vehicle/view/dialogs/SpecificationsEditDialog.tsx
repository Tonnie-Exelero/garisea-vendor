// ** React Imports
import { useState } from "react";
import toast from "react-hot-toast";

// ** MUI Imports
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
} from "@mui/material";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** API/Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editVehicleSpecifications } from "@src/store/apps/vendor/vehicle/single";

// ** Others
import { vehicleBodyTypes } from "../../config";

interface SpecificationsEditDialogProps {
  vehicle: VehicleNode;
  handleEditDialogToggle: () => void;
}

const SpecificationsEditDialog: React.FC<SpecificationsEditDialogProps> = ({
  vehicle,
  handleEditDialogToggle,
}) => {
  const {
    id,
    transmissionType,
    fuelType,
    engineCapacity,
    exteriorColor,
    upholstery,
    engineType,
    driveType,
    bodyType,
    interiorColor,
    steering,
    seats,
    doors,
  } = vehicle;

  // ** State
  const [vEngineType, setVEngineType] = useState<string>(engineType);
  const [vEngineCapacity, setVEngineCapacity] =
    useState<number>(engineCapacity);
  const [vFuelType, setVFuelType] = useState<string>(fuelType);
  const [vTransmissionType, setVTransmissionType] =
    useState<string>(transmissionType);
  const [vDriveType, setVDriveType] = useState<string>(driveType);
  const [vExteriorColor, setVExteriorColor] = useState<string>(exteriorColor);
  const [vInteriorColor, setVInteriorColor] = useState<string>(interiorColor);
  const [vBodyType, setVBodyType] = useState<string>(bodyType);
  const [vUpholstery, setVUpholstery] = useState<string>(upholstery);
  const [vSeats, setVSeats] = useState<number>(seats);
  const [vDoors, setVDoors] = useState<number>(doors);
  const [vSteering, setVSteering] = useState<string>(steering);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateVehicle = async (e: any) => {
    e.preventDefault();

    const vehicleData = {
      id,
      engineType: vEngineType,
      engineCapacity: vEngineCapacity,
      transmissionType: vTransmissionType,
      fuelType: vFuelType,
      exteriorColor: vExteriorColor,
      upholstery: vUpholstery,
      driveType: vDriveType,
      bodyType: vBodyType,
      interiorColor: vInteriorColor,
      steering: vSteering,
      seats: vSeats,
      doors: vDoors,
    };

    const resultAction: any = await dispatch(
      editVehicleSpecifications({ ...vehicleData })
    );

    if (editVehicleSpecifications.fulfilled.match(resultAction)) {
      toast.success(`Vehicle information updated successfully!`);
    } else {
      toast.error(`Error updating vehicle: ${resultAction.error}`);
    }

    handleEditDialogToggle();
  };

  return (
    <>
      <DialogTitle
        id="vehicle-spec-edit"
        sx={{
          textAlign: "center",
          fontSize: "1.5rem !important",
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
          pt: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        Edit Specifications
      </DialogTitle>
      <DialogContent
        sx={{
          pb: (theme) => `${theme.spacing(8)} !important`,
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
        }}
      >
        <DialogContentText
          variant="body2"
          id="vehicle-spec-edit-description"
          sx={{ textAlign: "center", mb: 7 }}
        >
          Updating vehicle specifications.
        </DialogContentText>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="engine-type"
                aria-label="engine-type"
                label="Engine Type"
                type="text"
                value={vEngineType}
                onChange={(e) => setVEngineType(e.target.value)}
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
                value={vEngineCapacity}
                onChange={(e) => setVEngineCapacity(Number(e.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cc</InputAdornment>
                  ),
                }}
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="fuel-type-select">Fuel Type</InputLabel>
                <Select
                  fullWidth
                  id="fuel-type"
                  labelId="fuel-type-select"
                  label="Fuel Type"
                  value={vFuelType}
                  onChange={(e) => setVFuelType(e.target.value)}
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
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="transmission-type-select">
                  Transmission Type
                </InputLabel>
                <Select
                  fullWidth
                  id="transmission-type"
                  labelId="transmission-type-select"
                  label="Transmission Type"
                  value={vTransmissionType}
                  onChange={(e) => setVTransmissionType(e.target.value)}
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
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="drive-type-select">Drive Type</InputLabel>
                <Select
                  fullWidth
                  id="drive-type"
                  labelId="drive-type-select"
                  label="Drive Type"
                  value={vDriveType}
                  onChange={(e) => setVDriveType(e.target.value)}
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
                id="exterior-color"
                aria-label="exterior-color"
                label="Exterior Color"
                type="text"
                value={vExteriorColor}
                onChange={(e) => setVExteriorColor(e.target.value)}
                placeholder="e.g. White"
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="interior-color"
                aria-label="interior-color"
                label="Interior Color"
                type="text"
                value={vInteriorColor}
                onChange={(e) => setVInteriorColor(e.target.value)}
                placeholder="e.g. Beige"
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="vUpholstery-select">Upholstery</InputLabel>
                <Select
                  fullWidth
                  id="vUpholstery"
                  labelId="vUpholstery-select"
                  label="Upholstery"
                  value={vUpholstery}
                  onChange={(e) => setVUpholstery(e.target.value)}
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
                  value={vBodyType}
                  onChange={(e) => setVBodyType(e.target.value)}
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
                id="vSeats-number"
                aria-label="vSeats-number"
                type="number"
                placeholder="e.g. 4"
                label="Seats Number"
                value={vSeats}
                onChange={(e) => setVSeats(Number(e.target.value))}
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
                id="vDoors-number"
                aria-label="vDoors-number"
                type="number"
                placeholder="e.g. 5"
                label="Doors Number"
                value={vDoors}
                onChange={(e) => setVDoors(Number(e.target.value))}
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
                  id="vSteering-radio"
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
                  name="vSteering-group"
                  aria-labelledby="vSteering-radio"
                  value={vSteering}
                  onChange={(e) => setVSteering(e.target.value)}
                >
                  <FormControlLabel
                    control={<Radio />}
                    value="RHD"
                    label="RHD"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    value="LHD"
                    label="LHD"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={(e) => handleUpdateVehicle(e)}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleEditDialogToggle}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default SpecificationsEditDialog;
