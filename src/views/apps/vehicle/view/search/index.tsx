// ** React Imports
import { useCallback, useEffect, useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

// ** API
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { fetchVendors } from "@src/store/apps/vendor/vendor";
import { fetchBrands } from "@src/store/apps/admin/brand";
import { fetchModelsByBrand } from "@src/store/apps/admin/model";

// ** Others
import { currency, vehicleBodyTypes } from "../../config";

const PAGE_SIZE = 20;

interface Props {
  handleVehiclesFilter: (params: any) => void;
}

const VehicleSearch = (props: Props) => {
  const { handleVehiclesFilter } = props;

  // ** States
  const [vendorId, setVendorId] = useState<string>("");
  const [brandId, setBrandId] = useState<string>("");
  const [modelId, setModelId] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [registered, setRegistered] = useState<string>("");
  const [yearRange, setYearRange] = useState<number[]>([2010, 2024]);
  const [mileage, setMileage] = useState<number[]>([1000, 150000]);
  const [engineType, setEngineType] = useState<string>("");
  const [engineCapacity, setEngineCapacity] = useState<number[]>([1000, 6000]);
  const [fuelType, setFuelType] = useState<string>("");
  const [transmissionType, setTransmissionType] = useState<string>("");
  const [driveType, setDriveType] = useState<string>("");
  const [exteriorColor, setExteriorColor] = useState<string>("");
  const [interiorColor, setInteriorColor] = useState<string>("");
  const [bodyType, setBodyType] = useState<string>("");
  const [upholstery, setUpholstery] = useState<string>("");
  const [seats, setSeats] = useState<number>();
  const [doors, setDoors] = useState<number>();
  const [steering, setSteering] = useState<string>("");
  const [price, setPrice] = useState<number[]>([200000, 20000000]);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { vendors } = useSelector((state: RootState) => state.vendors);
  const { brands } = useSelector((state: RootState) => state.brands);
  const { models } = useSelector((state: RootState) => state.models);

  useEffect(() => {
    dispatch(fetchVendors({ first: 100 }));
    dispatch(fetchBrands({ first: 100 }));
  }, [dispatch, vendors]);

  const handleSearch = () => {
    const searchParams = {
      vendorId,
      brandId,
      modelId,
      condition,
      registered,
      minYear: yearRange[0].toString(),
      maxYear: yearRange[1].toString(),
      minMileage: mileage[0],
      maxMileage: mileage[1],
      transmissionType,
      fuelType,
      minEngineCapacity: engineCapacity[0],
      maxEngineCapacity: engineCapacity[1],
      exteriorColor,
      upholstery,
      engineType,
      driveType,
      bodyType,
      interiorColor,
      steering,
      seats,
      doors,
      minPrice: price[0],
      maxPrice: price[1],
    };

    handleVehiclesFilter(searchParams);
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

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
  };

  const handleMileageChange = (event: Event, newValue: number | number[]) => {
    setMileage(newValue as number[]);
  };

  const handleEngineCapacityChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setEngineCapacity(newValue as number[]);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  return (
    <Grid container spacing={5}>
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel id="vendor-select">Vendor</InputLabel>
          <Select
            fullWidth
            value={vendorId}
            id="vendor"
            label="Vendor"
            labelId="vendor-select"
            onChange={(e) => setVendorId(e.target.value)}
            inputProps={{ placeholder: "Select Vendor" }}
          >
            {vendors.edges.map((vendor, index) => {
              const { id, firstName, lastName } = vendor.node;

              return (
                <MenuItem key={index} value={id}>
                  {firstName + " " + lastName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
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
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="model-select">Model</InputLabel>
          <Select
            fullWidth
            id="model"
            labelId="model-select"
            label="Model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            inputProps={{ placeholder: "Select Model" }}
            disabled={brandId !== "" ? false : true}
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
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="condition-select">Condition</InputLabel>
          <Select
            fullWidth
            id="condition"
            labelId="condition-select"
            label="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            inputProps={{ placeholder: "Select Condition" }}
          >
            <MenuItem value="brand-new">Brand New</MenuItem>
            <MenuItem value="foreign-used">Foreign Used</MenuItem>
            <MenuItem value="locally-used">Locally Used</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="registered-select">Registered</InputLabel>
          <Select
            fullWidth
            id="registered"
            labelId="registered-select"
            label="Registered"
            value={registered}
            onChange={(e) => setRegistered(e.target.value)}
            inputProps={{ placeholder: "Select Registered" }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="fuel-type-select">Fuel Type</InputLabel>
          <Select
            fullWidth
            id="fuel-type"
            labelId="fuel-type-select"
            label="Fuel Type"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
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
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="transmission-type-select">
            Transmission Type
          </InputLabel>
          <Select
            fullWidth
            id="transmission-type"
            labelId="transmission-type-select"
            label="Transmission Type"
            value={transmissionType}
            onChange={(e) => setTransmissionType(e.target.value)}
            inputProps={{ placeholder: "Select Transmission Type" }}
          >
            <MenuItem value="Automatic">Automatic</MenuItem>
            <MenuItem value="Semi-Automatic">Semi-Automatic</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
            <MenuItem value="Tiptronic">Tiptronic</MenuItem>
            <MenuItem value="CVT">CVT</MenuItem>
            <MenuItem value="DCT">DCT</MenuItem>
            <MenuItem value="Sport AT">Sport AT</MenuItem>
            <MenuItem value="Unspecified">Unspecified</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="drive-type-select">Drive Type</InputLabel>
          <Select
            fullWidth
            id="drive-type"
            labelId="drive-type-select"
            label="Drive Type"
            value={driveType}
            onChange={(e) => setDriveType(e.target.value)}
            inputProps={{ placeholder: "Select Drive Type" }}
          >
            <MenuItem value="Front Wheel Drive">Front Wheel Drive </MenuItem>
            <MenuItem value="Rear Wheel Drive">Rear Wheel Drive</MenuItem>
            <MenuItem value="All Wheel Drive">All Wheel Drive</MenuItem>
            <MenuItem value="4x4">4x4</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="upholstery-select">Upholstery</InputLabel>
          <Select
            fullWidth
            id="upholstery"
            labelId="upholstery-select"
            label="Upholstery"
            value={upholstery}
            onChange={(e) => setUpholstery(e.target.value)}
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
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="body-type-select">Body Type</InputLabel>
          <Select
            fullWidth
            id="body-type"
            labelId="body-type-select"
            label="Body Type"
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
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
      <Grid item md={2} sm={3} xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <InputLabel htmlFor="steering-select">Steering</InputLabel>
          <Select
            fullWidth
            id="steering"
            labelId="steering-select"
            label="Steering"
            value={steering}
            onChange={(e) => setSteering(e.target.value)}
            inputProps={{ placeholder: "Select Steering" }}
          >
            <MenuItem value="RHD">RHD</MenuItem>
            <MenuItem value="LHD">LHD</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <TextField
          fullWidth
          id="engine-type"
          aria-label="engine-type"
          label="Engine Type"
          type="text"
          size="small"
          value={engineType}
          onChange={(e) => setEngineType(e.target.value)}
          placeholder="e.g. V6 BiTurbo"
          sx={{ mb: 4 }}
        />
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <TextField
          fullWidth
          id="exterior-color"
          aria-label="exterior-color"
          label="Exterior Color"
          type="text"
          size="small"
          value={exteriorColor}
          onChange={(e) => setExteriorColor(e.target.value)}
          placeholder="e.g. White"
          sx={{ mb: 4 }}
        />
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <TextField
          fullWidth
          id="interior-color"
          aria-label="interior-color"
          label="Interior Color"
          type="text"
          size="small"
          value={interiorColor}
          onChange={(e) => setInteriorColor(e.target.value)}
          placeholder="e.g. Beige"
          sx={{ mb: 4 }}
        />
      </Grid>

      <Grid item md={2} sm={3} xs={12}>
        <TextField
          fullWidth
          id="seats-number"
          aria-label="seats-number"
          type="number"
          placeholder="e.g. 4"
          label="Seats"
          size="small"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">seats</InputAdornment>,
          }}
          sx={{ mb: 4 }}
        />
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <TextField
          fullWidth
          id="doors-number"
          aria-label="doors-number"
          type="number"
          placeholder="e.g. 5"
          label="Doors"
          size="small"
          value={doors}
          onChange={(e) => setDoors(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">doors</InputAdornment>,
          }}
          sx={{ mb: 4 }}
        />
      </Grid>

      <Grid item md={2} sm={3} xs={12}>
        <Typography variant="body2">Year of Manufacture</Typography>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <Slider
            id="year"
            min={1990}
            max={new Date().getFullYear() + 2}
            value={yearRange}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Year"}
            getAriaValueText={() => `${yearRange}`}
          />
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <Typography variant="body2">Mileage (km/miles)</Typography>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <Slider
            id="mileage"
            min={0}
            max={500000}
            value={mileage}
            onChange={handleMileageChange}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Mileage"}
            getAriaValueText={() => `${mileage} km/miles`}
          />
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <Typography variant="body2">Engine Capacity (cc)</Typography>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <Slider
            id="engine"
            min={50}
            max={10000}
            value={engineCapacity}
            onChange={handleEngineCapacityChange}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Engine Capacity"}
            getAriaValueText={() => `${engineCapacity} cc`}
          />
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <Typography variant="body2">Price ({currency})</Typography>
        <FormControl fullWidth sx={{ mb: 4 }} size="small">
          <Slider
            id="price"
            min={100000}
            max={50000000}
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Price"}
            getAriaValueText={() => `${price} ${currency}`}
          />
        </FormControl>
      </Grid>
      <Grid item md={2} sm={3} xs={12}>
        <Box>
          <Button onClick={handleSearch} variant="contained" color="primary">
            Search
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default VehicleSearch;
