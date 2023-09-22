// ** React Imports
import { useState } from "react";
import toast from "react-hot-toast";

// ** MUI Imports
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** API/Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editVehicleExtraInfo } from "@src/store/apps/vendor/vehicle/single";

// ** Custom Components Imports
import CustomChip from "@components/mui/chip";

// ** Others
import { featuresArray, availablePaymentModes } from "../../config";

interface ExtraInfoEditDialogProps {
  vehicle: VehicleNode;
  handleEditDialogToggle: () => void;
}

const ExtraInfoEditDialog: React.FC<ExtraInfoEditDialogProps> = ({
  vehicle,
  handleEditDialogToggle,
}) => {
  const { id, vinNo, allowedPaymentModes, offerType, features, extraInfo } =
    vehicle;

  // ** State
  const [vVinNo, setVVinNo] = useState<string>(vinNo);
  const [vOfferType, setVOfferType] = useState<string>(offerType);
  const [vPaymentModes, setVPaymentModes] = useState<string[]>(
    allowedPaymentModes.split(",")
  );
  const [vFeatures, setVFeatures] = useState<string[]>(
    features ? features.split(",") : []
  );
  const [vExtraInfo, setVExtraInfo] = useState<string>(extraInfo);
  const [newFeature, setNewFeature] = useState<string>("");
  const [showTextField, setShowTextField] = useState<boolean>(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const handlePaymentModeChange = (
    event: SelectChangeEvent<typeof vPaymentModes>
  ) => {
    const {
      target: { value },
    } = event;
    setVPaymentModes(typeof value === "string" ? value.split(",") : value);
  };

  const handleFeatureSelect = (value: string) => {
    if (vFeatures.some((subject) => subject === value)) {
      const updatedList = vFeatures.filter((subject) => subject !== value);
      return setVFeatures(updatedList);
    }
    return setVFeatures((prev) => [...prev, value]);
  };

  const handleUpdateVehicle = async (e: any) => {
    e.preventDefault();

    const vehicleData = {
      id,
      vinNo: vVinNo,
      allowedPaymentModes: [...new Set(vPaymentModes)].toString(),
      offerType: vOfferType,
      features: [...new Set(vFeatures)].toString(),
      extraInfo: vExtraInfo,
    };

    const resultAction: any = await dispatch(
      editVehicleExtraInfo({ ...vehicleData })
    );

    if (editVehicleExtraInfo.fulfilled.match(resultAction)) {
      toast.success(`Vehicle information updated successfully!`);
    } else {
      toast.error(`Error updating vehicle: ${resultAction.error}`);
    }

    handleEditDialogToggle();
  };

  const addNewFeature = (value: string) => {
    setShowTextField(false);
    setNewFeature("");

    return setVFeatures((prev) => (prev ? [...prev, value] : [value]));
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
        Edit Extra Information
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
          Updating vehicle extra information.
        </DialogContentText>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="vin-number"
                aria-label="vin-number"
                label="VIN Number"
                type="text"
                value={vVinNo}
                onChange={(e) => setVVinNo(e.target.value)}
                placeholder="e.g. 1GNEK13ZX3R298984"
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-offer-type">Offer Type</InputLabel>
                <Select
                  fullWidth
                  id="offer-type"
                  labelId="select-offer-type"
                  label="Offer Type"
                  value={vOfferType}
                  onChange={(e) => setVOfferType(e.target.value)}
                  inputProps={{ placeholder: "Select Offer Type" }}
                >
                  <MenuItem value="early-bird">Early Bird</MenuItem>
                  <MenuItem value="return-client">Return Client</MenuItem>
                  <MenuItem value="complete-payment">Complete Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-payment-modes">Payment Modes</InputLabel>
                <Select
                  id="payment-modes"
                  labelId="select-payment-modes"
                  label="Payment Modes"
                  multiple
                  onChange={handlePaymentModeChange}
                  value={vPaymentModes}
                  input={<OutlinedInput label="Payment Modes" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <CustomChip
                          rounded
                          key={value}
                          label={value}
                          skin="light"
                        />
                      ))}
                    </Box>
                  )}
                  sx={{ width: "100%" }}
                >
                  {availablePaymentModes.map((mode, index) => (
                    <MenuItem key={index} value={mode}>
                      {mode}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ mb: 4 }}>
                Vehicle Features
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {vFeatures.map((feature, index) => (
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
                            <Icon
                              icon="bx:bxs-right-arrow-circle"
                              fontSize={20}
                            />
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
                minRows={3}
                id="extra-info"
                aria-label="extra-info"
                label="Extra Vehicle Info"
                type="text"
                value={vExtraInfo}
                onChange={(e) => setVExtraInfo(e.target.value)}
                placeholder="Add any extra info about the vehicle"
              />
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

export default ExtraInfoEditDialog;
