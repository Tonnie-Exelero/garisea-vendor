// ** React Imports
import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** API/Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { fetchVendors } from "@src/store/apps/vendor/vendor";
import { fetchBrands } from "@src/store/apps/admin/brand";
import { fetchModelsByBrand } from "@src/store/apps/admin/model";
import { editVehicleBasicInfo } from "@src/store/apps/vendor/vehicle/single";

// ** Custom Components Imports
import CustomChip from "@components/mui/chip";

const metrics = ["kms", "miles"];
const currency = "KES";

interface BasicEditDialogProps {
  vehicle: VehicleNode;
  handleEditDialogToggle: () => void;
}

const BasicEditDialog: React.FC<BasicEditDialogProps> = ({
  vehicle,
  handleEditDialogToggle,
}) => {
  const {
    id,
    vendor,
    brand,
    model,
    trim,
    yearOfManufacture,
    yearOfFirstRegistration,
    registered,
    registrationNo,
    condition,
    mileage,
    mileageMetric,
    listingPrice,
    discountedPrice,
  } = vehicle;

  // ** State
  const [vCondition, setVCondition] = useState<string>(condition);
  const [vendorId, setVendorId] = useState<any>(vendor.id);
  const [brandId, setBrandId] = useState<any>(brand.id);
  const [modelId, setModelId] = useState<any>(model.id);
  const [vTrim, setVTrim] = useState<string>(trim);
  const [vYearOfManufacture, setVYearOfManufacture] =
    useState<string>(yearOfManufacture);
  const [vYearOfFirstRegistration, setVYearOfFirstRegistration] =
    useState<string>(yearOfFirstRegistration);
  const [vRegistered, setVRegistered] = useState<string>(registered);
  const [vRegistrationNo, setVRegistrationNo] =
    useState<string>(registrationNo);
  const [vMileage, setVMileage] = useState<number>(mileage);
  const [vMileageMetric, setVMileageMetric] = useState<string>(mileageMetric);
  const [vListingPrice, setVListingPrice] = useState<number>(listingPrice);
  const [vDiscountedPrice, setVDiscountedPrice] =
    useState<number>(discountedPrice);
  const [percentageDiscount, setPercentageDiscount] = useState<number>();

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { vendors } = useSelector((state: RootState) => state.vendors);
  const { brands } = useSelector((state: RootState) => state.brands);
  const { models } = useSelector((state: RootState) => state.models);

  useEffect(() => {
    dispatch(fetchVendors({first: 100}));
    dispatch(fetchBrands({ first: 100 }));
    dispatch(fetchModelsByBrand({ brandId }));

    if (vListingPrice !== undefined && vDiscountedPrice !== undefined) {
      const prePerc = vDiscountedPrice / vListingPrice;

      const percDiscount: number = prePerc * 100;

      setPercentageDiscount(Number((100 - percDiscount).toFixed(2)));
    }
  }, [dispatch, brand, vListingPrice, vDiscountedPrice]);

  const handleRegisteredRadio = (
    event: ChangeEvent<HTMLInputElement | any>
  ) => {
    const {
      target: { value },
    } = event;

    setVRegistered(value);
  };

  const handleBrandSelect = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;

      setBrandId(value);
      dispatch(fetchModelsByBrand({ brandId: value }));
    },
    [dispatch, brandId]
  );

  const handleMetricSelect = (metric: string) => {
    setVMileageMetric(metric);
  };

  const handleDiscountedPriceChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let percDiscount: number;

    if (listingPrice !== undefined) {
      const prePerc = Number(value) / listingPrice;

      percDiscount = prePerc * 100;

      setPercentageDiscount(Number((100 - percDiscount).toFixed(2)));
    }

    setVDiscountedPrice(Number(value));
  };

  const handleUpdateVehicle = async (e: any) => {
    e.preventDefault();

    const vehicleData = {
      id,
      vendorId,
      brandId,
      modelId,
      trim: vTrim,
      yearOfManufacture: vYearOfManufacture,
      yearOfFirstRegistration: vYearOfFirstRegistration,
      registered: vRegistered,
      registrationNo: vRegistrationNo,
      condition: vCondition,
      mileage: vMileage,
      mileageMetric: vMileageMetric,
      listingPrice: vListingPrice,
      discountedPrice: vDiscountedPrice,
    };

    const resultAction: any = await dispatch(
      editVehicleBasicInfo({ ...vehicleData })
    );

    if (editVehicleBasicInfo.fulfilled.match(resultAction)) {
      toast.success(`Vehicle information updated successfully!`);
    } else {
      toast.error(`Error updating vehicle: ${resultAction.error}`);
    }

    handleEditDialogToggle();
  };

  return (
    <>
      <DialogTitle
        id="vehicle-view-edit"
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
        Edit Basic Information
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
          id="vehicle-view-edit-description"
          sx={{ textAlign: "center", mb: 7 }}
        >
          Updating basic vehicle details.
        </DialogContentText>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="vendor-select">Vendor</InputLabel>
                <Select
                  fullWidth
                  id="vendor"
                  labelId="vendor-select"
                  label="Vendor"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  inputProps={{ placeholder: "Select Vendor" }}
                >
                  {vendors.edges.map((vendor: any, index: any) => (
                    <MenuItem key={index} value={vendor.node.id}>
                      {vendor.node.firstName + " " + vendor.node.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="condition-select">Condition</InputLabel>
                <Select
                  fullWidth
                  id="condition"
                  labelId="condition-select"
                  label="Condition"
                  value={vCondition}
                  onChange={(e) => setVCondition(e.target.value)}
                  inputProps={{ placeholder: "Select Condition" }}
                >
                  <MenuItem value="brand-new">Brand New</MenuItem>
                  <MenuItem value="foreign-used">Foreign Used</MenuItem>
                  <MenuItem value="locally-used">Locally Used</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="brand-select">Brand</InputLabel>
                <Select
                  fullWidth
                  id="brand"
                  labelId="brand-select"
                  label="Brand"
                  value={brandId}
                  onChange={handleBrandSelect}
                  inputProps={{ placeholder: "Select Brand" }}
                >
                  {brands.edges.map((brand, index) => (
                    <MenuItem key={index} value={brand.node.id}>
                      {brand.node.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="model-select">Model</InputLabel>
                <Select
                  fullWidth
                  id="model"
                  labelId="model-select"
                  label="Model"
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  inputProps={{ placeholder: "Select Model" }}
                >
                  {models.edges.length > 0 ? (
                    models.edges.map((model: any, index: any) => (
                      <MenuItem key={index} value={model.node.id}>
                        {model.node.name}
                      </MenuItem>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        padding: 3,
                        color: "text.secondary",
                        fontStyle: "italic",
                      }}
                    >
                      No models available
                    </Typography>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="trim"
                aria-label="trim"
                label="Trim"
                type="text"
                value={vTrim}
                onChange={(e) => setVTrim(e.target.value)}
                placeholder="e.g. LWB Premium"
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="manufacture-year"
                aria-label="manufacture-year"
                label="Year of Manufacture"
                type="text"
                value={vYearOfManufacture}
                onChange={(e) => setVYearOfManufacture(e.target.value)}
                placeholder="e.g. 08/2023"
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="registration-year"
                aria-label="registration-year"
                label="Year of First Registration"
                type="text"
                value={vYearOfFirstRegistration}
                onChange={(e) => setVYearOfFirstRegistration(e.target.value)}
                placeholder="e.g. 09/2023"
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="mileage"
                aria-label="mileage"
                type="number"
                placeholder="e.g. 33495"
                label="Mileage"
                value={vMileage}
                onChange={(e) => setVMileage(Number(e.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        width: "180px",
                      }}
                    >
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {metrics.map((metric, index) => (
                          <CustomChip
                            rounded
                            key={index}
                            label={metric}
                            skin="light"
                            color={
                              vMileageMetric === metric ? "info" : "secondary"
                            }
                            onClick={() => handleMetricSelect(metric)}
                            sx={{
                              cursor: "pointer",
                              "&:hover": { color: "#FFF" },
                            }}
                          />
                        ))}
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="listing-price"
                aria-label="listing-price"
                type="number"
                placeholder="e.g. 900,000"
                label="Listing Price"
                value={vListingPrice}
                onChange={(e) => setVListingPrice(Number(e.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{currency}</InputAdornment>
                  ),
                }}
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="discounted-price"
                aria-label="discounted-price"
                type="number"
                placeholder="e.g. 850,000"
                label="Discounted Price"
                value={vDiscountedPrice}
                onChange={handleDiscountedPriceChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{currency}</InputAdornment>
                  ),
                }}
                sx={{ mb: 4 }}
              />
              <Typography variant="body2" color="primary">
                {percentageDiscount}% discount
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ mb: 4 }}>
                <FormLabel
                  id="registered-radio"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    lineHeight: "21px",
                    letterSpacing: "0.1px",
                  }}
                >
                  Is Vehicle Registered?
                </FormLabel>
                <RadioGroup
                  name="registered-group"
                  aria-labelledby="registered-radio"
                  value={vRegistered}
                  onChange={handleRegisteredRadio}
                  sx={{ display: "flex", flexWrap: "nowrap", gap: 2 }}
                >
                  <FormControlLabel
                    control={<Radio />}
                    value={"Yes"}
                    label="Yes"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    value={"No"}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {vRegistered === "Yes" && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="registration-number"
                  aria-label="registration-number"
                  label="Registration Number"
                  type="text"
                  value={vRegistrationNo}
                  onChange={(e) => setVRegistrationNo(e.target.value)}
                  placeholder="e.g. KDL 999L"
                  sx={{ mb: 4 }}
                />
              </Grid>
            )}
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

export default BasicEditDialog;
