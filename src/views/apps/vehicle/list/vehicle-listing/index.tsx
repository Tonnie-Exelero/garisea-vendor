// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import MuiStep, { StepProps } from "@mui/material/Step";
import CardContent, { CardContentProps } from "@mui/material/CardContent";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Step Components
import StepBasic from "./StepBasic";
import StepImages from "./StepImages";
import StepDriveTrain from "./StepDriveTrain";
import StepOptics from "./StepOptics";
import StepFeatures from "./StepFeatures";
import StepPrice from "./StepPrice";

// ** Util Import
import { hexToRGBA } from "src/@core/utils/hex-to-rgba";

// ** Styled Components
import StepperWrapper from "src/@core/styles/mui/stepper";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index";
import { addVehicle } from "@src/store/apps/vendor/vehicle/single";
import toast from "react-hot-toast";
import { uuid } from "uuidv4";

const steps = [
  {
    title: "Basic Details",
    subtitle: "Primary details",
    icon: "bx:car",
  },
  {
    title: "Images",
    subtitle: "Vehicle images/videos",
    icon: "bx:image-add",
  },
  {
    title: "Drive Train",
    subtitle: "Engine & Drive-train",
    icon: "bx:cog",
  },
  {
    title: "Optics",
    subtitle: "Exterior & Interior",
    icon: "bx:bxs-car-garage",
  },
  {
    title: "Features",
    subtitle: "Features & Extra info",
    icon: "bx:star",
  },
  {
    title: "Price",
    subtitle: "Pricing & Payment",
    icon: "bx:dollar",
  },
];

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(
  ({ theme }) => ({
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("lg")]: {
      borderRight: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  })
);

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  "& .MuiStepLabel-root": {
    paddingTop: 0,
  },
  "&:not(:last-of-type) .MuiStepLabel-root": {
    paddingBottom: theme.spacing(6),
  },
  "&:last-of-type .MuiStepLabel-root": {
    paddingBottom: 0,
  },
  "& .MuiStepLabel-iconContainer": {
    display: "none",
  },
  "& .step-subtitle": {
    color: `${theme.palette.text.disabled} !important`,
  },
  "&:not(.Mui-completed)": {
    "& .step-title": {
      color: theme.palette.text.secondary,
    },
    "& + svg": {
      color: theme.palette.text.disabled,
    },
  },
  "&.Mui-completed": {
    "& .step-title": {
      color: theme.palette.text.disabled,
    },
    "& + svg": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiStepLabel-label": {
    cursor: "pointer",
    "&.Mui-active .step-title": {
      color: theme.palette.primary.main,
    },
  },
}));

const VehicleListingWizard: React.FC<any> = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [canGoNext, setCanGoNext] = useState<boolean>(false);
  const [basicData, setBasicData] = useState<any>();
  const [imagesData, setImagesData] = useState<any>();
  const [driveTrainData, setDriveTrainData] = useState<any>();
  const [opticsData, setOpticsData] = useState<any>();
  const [featuresData, setFeaturesData] = useState<any>();
  const [priceData, setPriceData] = useState<any>();

  const vehicleData = {
    entryNo: uuid(),
    ...basicData,
    ...imagesData,
    ...driveTrainData,
    ...opticsData,
    ...featuresData,
    ...priceData,
    views: 0,
    reserved: "No",
    sold: "No",
  };

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setCanGoNext(false);
  };
  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Vehicle Information
  const handleBasicData = (data: any) => {
    setBasicData(data);
  };

  const handleImagesData = (data: any) => {
    setImagesData(data);
  };

  const handleDriveTrainData = (data: any) => {
    setDriveTrainData(data);
  };

  const handleOpticsData = (data: any) => {
    setOpticsData(data);
  };

  const handleFeaturesData = (data: any) => {
    setFeaturesData(data);
  };

  const handlePriceData = (data: any) => {
    setPriceData(data);
  };

  const nextStep = (val: boolean) => {
    setCanGoNext(val);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StepBasic handleBasicData={handleBasicData} nextStep={nextStep} />
        );
      case 1:
        return (
          <StepImages handleImagesData={handleImagesData} nextStep={nextStep} />
        );
      case 2:
        return (
          <StepDriveTrain
            handleDriveTrainData={handleDriveTrainData}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <StepOptics handleOpticsData={handleOpticsData} nextStep={nextStep} />
        );
      case 4:
        return (
          <StepFeatures
            handleFeaturesData={handleFeaturesData}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <StepPrice handlePriceData={handlePriceData} nextStep={nextStep} />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    return getStepContent(activeStep);
  };

  const handleSubmitData = async () => {
    const resultAction = await dispatch(addVehicle({ ...vehicleData }));

    if (addVehicle.fulfilled.match(resultAction)) {
      toast.success(`Vehicle listing created successfully!`);
    } else {
      toast.error(`Error creating vehicle: ${resultAction.error}`);
    }
  };

  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1;

    return (
      <Box sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<Icon icon="bx:chevron-left" />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color={stepCondition ? "success" : "primary"}
          {...(!stepCondition
            ? { endIcon: <Icon icon="bx:chevron-right" /> }
            : {})}
          onClick={() => (stepCondition ? handleSubmitData() : handleNext())}
          disabled={!canGoNext}
        >
          {stepCondition ? "Submit" : "Next"}
        </Button>
      </Box>
    );
  };

  return (
    <Card sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: "100%" }}>
          <Stepper
            connector={<></>}
            orientation="vertical"
            activeStep={activeStep}
            sx={{ height: "100%", minWidth: "15rem" }}
          >
            {steps.map((step, index) => {
              return (
                <Step
                  key={index}
                  onClick={() => setActiveStep(index)}
                  sx={{ "&.Mui-completed + svg": { color: "primary.main" } }}
                >
                  <StepLabel>
                    <div className="step-label">
                      <CustomAvatar
                        variant="rounded"
                        skin={activeStep === index ? "filled" : "light"}
                        color={activeStep >= index ? "primary" : "secondary"}
                        sx={{
                          mr: 2.5,
                          ...(activeStep === index && {
                            boxShadow: (theme) =>
                              `0 0.1875rem 0.375rem 0 ${hexToRGBA(
                                theme.palette.primary.main,
                                0.4
                              )}`,
                          }),
                        }}
                      >
                        <Icon icon={step.icon} />
                      </CustomAvatar>
                      <div>
                        <Typography className="step-title">
                          {step.title}
                        </Typography>
                        <Typography className="step-subtitle">
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </StepperHeaderContainer>
      <CardContent
        sx={{ pt: (theme) => `${theme.spacing(6)} !important`, width: "100%" }}
      >
        {renderContent()}
        {renderFooter()}
      </CardContent>
    </Card>
  );
};

export default VehicleListingWizard;
