// ** React Imports
import { useCallback, useEffect, useState, ChangeEvent } from "react";

// ** MUI Imports
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Type Imports
import {
  CustomRadioIconsData,
  CustomRadioIconsProps,
} from "@components/custom-radio/types";

// ** Custom Components Imports
import CustomRadioIcons from "@components/custom-radio/icons";
import CustomChip from "@components/mui/chip";

// ** API
import apolloClient from "@src/lib/apollo";
import { GET_BRANDS } from "@src/api/admin/brand";
import { GET_MODELS_BY_BRAND_ID } from "@src/api/admin/model";
import { fetchBrands } from "@src/store/apps/admin/brand";
import { addBrand } from "@src/store/apps/admin/brand/single";
import { addModel } from "@src/store/apps/admin/model/single";

// ** Others
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { country, metrics } from "../../config";
import { mainCountries } from "@src/configs/countries";
import toast from "react-hot-toast";
import { encryptData } from "@core/utils/encryption";

interface IconType {
  icon: CustomRadioIconsProps["icon"];
  iconProps: CustomRadioIconsProps["iconProps"];
}

const data: CustomRadioIconsData[] = [
  {
    title: "Brand New",
    value: "brand-new",
    isSelected: true,
    content: (
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        This vehicle is brand new, it hasn't been used before.
      </Typography>
    ),
  },
  {
    title: "Foreign Used",
    value: "foreign-used",
    content: (
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        This vehicle has been used previously in a foreign country.
      </Typography>
    ),
  },
  {
    title: "Locally Used",
    value: "locally-used",
    content: (
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        This vehicle has been previously used in {country}.
      </Typography>
    ),
  },
];

interface StepBasicProps {
  handleBasicData: (data: any) => void;
  nextStep: (val: boolean) => void;
}

const StepBasic: React.FC<StepBasicProps> = (props) => {
  const { handleBasicData, nextStep } = props;

  const initialIconSelected: string = data.filter((item) => item.isSelected)[
    data.filter((item) => item.isSelected).length - 1
  ].value;

  // ** States
  const [condition, setCondition] = useState<string>(
    window.localStorage.getItem("condition") || initialIconSelected
  );
  const [brandId, setBrandId] = useState<string>(
    window.localStorage.getItem("brandId") || ""
  );
  const [modelId, setModelId] = useState<string>(
    window.localStorage.getItem("modelId") || ""
  );
  const [trim, setTrim] = useState<string>(
    window.localStorage.getItem("trim") || ""
  );
  const [yearOfManufacture, setYearOfManufacture] = useState<string>(
    window.localStorage.getItem("yearOfManufacture") || ""
  );
  const [yearOfFirstRegistration, setYearOfFirstRegistration] =
    useState<string>(
      window.localStorage.getItem("yearOfFirstRegistration") || ""
    );
  const [registered, setRegistered] = useState<string>(
    window.localStorage.getItem("registered") || ""
  );
  const [registrationNo, setRegistrationNo] = useState<string>(
    window.localStorage.getItem("registrationNo") || ""
  );
  const [mileage, setMileage] = useState<number | null>(
    Number(window.localStorage.getItem("mileage")) || null
  );
  const [mileageMetric, setMileageMetric] = useState<string>(
    window.localStorage.getItem("mileageMetric") || ""
  );
  const [viewingLocation, setViewingLocation] = useState<string>(
    window.localStorage.getItem("viewingLocation") || ""
  );
  const [vehicleOriginCountry, setVehicleOriginCountry] = useState<string>(
    window.localStorage.getItem("vehicleOriginCountry") || ""
  );
  const [newItem, setNewItem] = useState<string>("");
  const [itemType, setItemType] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [vBrands, setVBrands] = useState<any>();
  const [vModels, setVModels] = useState<any>();
  const [isLoadingBrands, setIsLoadingBrands] = useState<boolean>(false);
  const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);

  // ** Hook
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );
  const { brands } = useSelector((state: RootState) => state.brands);

  const handleDialogToggle = () => setOpenDialog(!openDialog);

  useEffect(() => {
    dispatch(fetchBrands({ first: 100 }));

    brandId && handleFetchModelsByBrandId(brandId);

    setVBrands(brands);
  }, [dispatch]);

  const icons: IconType[] = [
    {
      icon: "bx:bxs-car",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "bx:bx-car",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "bx:car",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
  ];

  const basicData = {
    condition,
    vendorId: authedVendor.id,
    brandId,
    modelId,
    trim,
    yearOfManufacture,
    yearOfFirstRegistration,
    registered,
    registrationNo,
    mileage,
    mileageMetric,
    viewingLocation,
    vehicleOriginCountry,
  };

  const handleRefreshBrands = useCallback(async () => {
    setIsLoadingBrands(true);
    const { data } = await apolloClient.query({
      query: GET_BRANDS,
      variables: { first: 100 },
      fetchPolicy: "no-cache",
    });

    const { brands }: any = data;

    setVBrands(brands);
    setIsLoadingBrands(false);
  }, [vBrands, isLoadingBrands]);

  const handleRefreshModels = useCallback(async () => {
    setIsLoadingModels(true);
    const { data } = await apolloClient.query({
      query: GET_MODELS_BY_BRAND_ID,
      variables: { pl: encryptData({ brandId }), first: 100 },
      fetchPolicy: "no-cache",
    });

    const { modelsByBrandId }: any = data;

    setVModels(modelsByBrandId);
    setIsLoadingModels(false);
  }, [vModels, isLoadingModels]);

  const handleRadioChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === "string") {
      setCondition(prop);
      saveDraft("condition", prop);
    } else {
      setCondition((prop.target as HTMLInputElement).value);
      saveDraft("condition", (prop.target as HTMLInputElement).value);
    }
  };

  const handleRegisteredRadio = (
    event: ChangeEvent<HTMLInputElement | any>
  ) => {
    const {
      target: { value },
    } = event;

    setRegistered(value);
    saveDraft("registered", value);
  };

  const handleFetchModelsByBrandId = useCallback(
    async (brandId: string) => {
      // Fetch Models by Brand ID
      const { data } = await apolloClient.query({
        query: GET_MODELS_BY_BRAND_ID,
        variables: { pl: encryptData({ brandId }), first: 100 },
        fetchPolicy: "no-cache",
      });

      const { modelsByBrandId }: any = data;

      setVModels(modelsByBrandId);
    },
    [vModels, isLoadingModels]
  );

  const handleBrandSelect = useCallback(
    async (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;
      setBrandId(value);
      saveDraft("brandId", value);

      // Fetch Models by Brand ID
      handleFetchModelsByBrandId(value);
    },
    [dispatch, brandId]
  );

  const handleMetricSelect = (metric: string) => {
    setMileageMetric(metric);
    saveDraft("mileageMetric", metric);
  };

  const confirmData = () => {
    handleBasicData(basicData);
    nextStep(true);
  };

  const addNewBrand = async () => {
    const brandData = {
      name: newItem,
      slug: newItem.replace(/\s+/g, "-").toLowerCase(),
      description: "",
    };

    const resultAction = await dispatch(addBrand({ ...brandData }));

    if (addBrand.fulfilled.match(resultAction)) {
      // brand will have a type signature of Brand as we passed that as the Returned parameter in createAsyncThunk
      const brand = resultAction.payload;
      const { createBrand }: any = brand;

      toast.success(`Brand ${createBrand.name} created successfully!`);

      setNewItem("");
      handleDialogToggle();
    } else {
      toast.error(`Error creating brand: ${resultAction.error}`);
    }
  };

  const addNewModel = async () => {
    const modelData = {
      name: newItem,
      slug: newItem.replace(/\s+/g, "-").toLowerCase(),
      description: "",
      brandId,
    };

    const resultAction = await dispatch(addModel({ ...modelData }));

    if (addModel.fulfilled.match(resultAction)) {
      // model will have a type signature of Model as we passed that as the Returned parameter in createAsyncThunk
      const model = resultAction.payload;
      const { createModel }: any = model;

      toast.success(`Model ${createModel.name} created successfully!`);

      setNewItem("");
      handleDialogToggle();
    } else {
      toast.error(`Error creating model: ${resultAction.error}`);
    }
  };

  const toggleNewBrand = () => {
    setItemType("Brand");
    setOpenDialog(true);
  };

  const toggleNewModel = () => {
    setItemType("Model");
    setOpenDialog(true);
  };

  const saveDraft = (name: string, value: any) =>
    window.localStorage.setItem(name, value);

  return (
    <>
      <Grid container spacing={5}>
        {data.map((item, index) => (
          <CustomRadioIcons
            key={index}
            data={data[index]}
            name="custom-radios"
            icon={icons[index].icon}
            selected={condition}
            gridProps={{ sm: 4, xs: 12 }}
            handleChange={handleRadioChange}
            iconProps={icons[index].iconProps}
          />
        ))}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 0 }}>
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
              {vBrands && vBrands.edges.length > 0 ? (
                vBrands.edges.map((brand: any, index: any) => (
                  <MenuItem key={index} value={brand.node.id}>
                    {brand.node.name}
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
                  No brands available
                </Typography>
              )}
            </Select>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Tooltip title="Add Brand" placement="top">
                <IconButton
                  onClick={toggleNewBrand}
                  sx={{
                    paddingInline: 4,
                    "&:hover": { background: "transparent" },
                  }}
                >
                  <Icon icon="bx:plus" fontSize={20} />
                  <Typography sx={{ ml: 2 }}>Add Brand</Typography>
                </IconButton>
              </Tooltip>
              {isLoadingBrands ? (
                <CircularProgress size="1.5rem" />
              ) : (
                <Tooltip title="Refresh" placement="top">
                  <IconButton onClick={handleRefreshBrands}>
                    <Icon fontSize={30} icon="bx:refresh" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 0 }}>
            <InputLabel htmlFor="model-select">Model</InputLabel>
            <Select
              fullWidth
              id="model"
              labelId="model-select"
              label="Model"
              value={modelId}
              onChange={(e) => {
                setModelId(e.target.value);
                saveDraft("modelId", e.target.value);
              }}
              inputProps={{ placeholder: "Select Model" }}
              disabled={brandId !== "" ? false : true}
            >
              {vModels && vModels.edges.length > 0 ? (
                vModels.edges.map((model: any, index: any) => (
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Tooltip title="Add Model" placement="top">
                <IconButton
                  onClick={toggleNewModel}
                  sx={{
                    paddingInline: 4,
                    "&:hover": { background: "transparent" },
                  }}
                >
                  <Icon icon="bx:plus" fontSize={20} />
                  <Typography sx={{ ml: 2 }}>Add Model</Typography>
                </IconButton>
              </Tooltip>
              {isLoadingModels ? (
                <CircularProgress size="1.5rem" />
              ) : (
                <Tooltip title="Refresh" placement="top">
                  <IconButton onClick={handleRefreshModels}>
                    <Icon fontSize={30} icon="bx:refresh" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="trim"
            aria-label="trim"
            label="Trim"
            type="text"
            value={trim}
            onChange={(e) => setTrim(e.target.value)}
            onBlur={(e) => saveDraft("trim", e.target.value)}
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
            value={yearOfManufacture}
            onChange={(e) => setYearOfManufacture(e.target.value)}
            onBlur={(e) => saveDraft("yearOfManufacture", e.target.value)}
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
            value={yearOfFirstRegistration}
            onChange={(e) => setYearOfFirstRegistration(e.target.value)}
            onBlur={(e) => saveDraft("yearOfFirstRegistration", e.target.value)}
            placeholder="e.g. 09/2023"
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="mileage"
            aria-label="mileage"
            type="number"
            placeholder="e.g. 33495"
            label="Mileage"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            onBlur={(e) => saveDraft("mileage", Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    width: "210px",
                  }}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {metrics.map((metric, index) => (
                      <CustomChip
                        rounded
                        key={index}
                        label={metric}
                        skin="light"
                        color={mileageMetric === metric ? "info" : "secondary"}
                        onClick={() => handleMetricSelect(metric)}
                        sx={{ cursor: "pointer", "&:hover": { color: "#FFF" } }}
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
            id="viewing-location"
            aria-label="viewing-location"
            label="Viewing Location"
            type="text"
            value={viewingLocation}
            onChange={(e) => setViewingLocation(e.target.value)}
            onBlur={(e) => saveDraft("viewingLocation", e.target.value)}
            placeholder="e.g. Galleria Mall, Langata Rd, Nairobi"
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="origin-country">Country of Origin</InputLabel>
            <Select
              fullWidth
              value={vehicleOriginCountry}
              id="origin-country"
              label="Country of Origin"
              labelId="origin-country"
              onChange={(e) => {
                setVehicleOriginCountry(e.target.value);
                saveDraft("vehicleOriginCountry", e.target.value);
              }}
              inputProps={{ placeholder: "e.g. Japan" }}
            >
              {mainCountries.map((country, index) => {
                const { name } = country;

                return (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
              value={registered}
              onChange={handleRegisteredRadio}
              sx={{ display: "flex", flexWrap: "nowrap", gap: 2 }}
            >
              <FormControlLabel control={<Radio />} value={"Yes"} label="Yes" />
              <FormControlLabel control={<Radio />} value={"No"} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {registered === "Yes" && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="registration-number"
              aria-label="registration-number"
              label="Registration Number"
              type="text"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
              onBlur={(e) => saveDraft("registrationNo", e.target.value)}
              placeholder="e.g. KDL 999L"
              sx={{ mb: 4 }}
            />
          </Grid>
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleDialogToggle}
        open={openDialog}
        sx={{
          "& .MuiDialogTitle-root + .MuiDialogContent-root": {
            pt: (theme) => `${theme.spacing(1.5)} !important`,
          },
        }}
      >
        <DialogTitle
          sx={{
            pt: 16,
            mx: "auto",
            textAlign: "center",
            fontSize: "1.625rem !important",
          }}
        >
          Add {itemType}
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <TextField
            autoFocus
            fullWidth
            id={`new-${itemType === "Brand" ? "brand" : "model"}`}
            aria-label={`new-${itemType === "Brand" ? "brand" : "model"}`}
            type="text"
            variant="standard"
            placeholder={`e.g. ${itemType === "Brand" ? "Tesla" : "Model X"}`}
            label={`Add ${itemType}`}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      itemType === "Brand" ? addNewBrand() : addNewModel()
                    }
                  >
                    <Icon icon="bx:bxs-right-arrow-circle" fontSize={20} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StepBasic;
