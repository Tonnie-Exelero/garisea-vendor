// ** React Imports
import { useCallback, useEffect, useState, ChangeEvent } from "react";

// ** MUI Imports
import { useTheme } from "@mui/material/styles";
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
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

// ** Type Imports
import {
  CustomRadioIconsData,
  CustomRadioIconsProps,
} from "@components/custom-radio/types";

// ** Custom Components Imports
import CustomRadioIcons from "@components/custom-radio/icons";
import CustomChip from "@components/mui/chip";

// ** API
import { fetchVendors } from "@src/store/apps/vendor/vendor";
import { fetchBrands } from "@src/store/apps/admin/brand";
import { fetchModelsByBrand } from "@src/store/apps/admin/model";

// ** Others
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { country, metrics } from "../../config";

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
  const [condition, setCondition] = useState<string>(initialIconSelected);
  const [brandId, setBrandId] = useState<string>("");
  const [modelId, setModelId] = useState<string>("");
  const [trim, setTrim] = useState<string>("");
  const [yearOfManufacture, setYearOfManufacture] = useState<string>("");
  const [yearOfFirstRegistration, setYearOfFirstRegistration] =
    useState<string>("");
  const [registered, setRegistered] = useState<string>("");
  const [registrationNo, setRegistrationNo] = useState<string>("");
  const [mileage, setMileage] = useState<number>();
  const [mileageMetric, setMileageMetric] = useState<string>("");

  // ** Hook
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );
  const { brands } = useSelector((state: RootState) => state.brands);
  const { models } = useSelector((state: RootState) => state.models);

  useEffect(() => {
    dispatch(fetchVendors({ first: 100 }));
    dispatch(fetchBrands({ first: 100 }));
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
  };

  const handleRadioChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === "string") {
      setCondition(prop);
    } else {
      setCondition((prop.target as HTMLInputElement).value);
    }
  };

  const handleRegisteredRadio = (
    event: ChangeEvent<HTMLInputElement | any>
  ) => {
    const {
      target: { value },
    } = event;

    setRegistered(value);
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
    setMileageMetric(metric);
  };

  const confirmData = () => {
    handleBasicData(basicData);
    nextStep(true);
  };

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
              {brands.edges.length > 0 ? (
                brands.edges.map((brand, index) => (
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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="trim"
            aria-label="trim"
            label="Trim"
            type="text"
            value={trim}
            onChange={(e) => setTrim(e.target.value)}
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
    </>
  );
};

export default StepBasic;
