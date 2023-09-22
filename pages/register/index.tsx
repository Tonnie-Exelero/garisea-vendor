// ** React Imports
import { ReactNode, useState } from "react";

// ** MUI Components
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** Demo Components Imports
import RegisterMultiStepsWizard from "src/views/pages/auth/register-multi-steps";

// ** API
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { addOrganization } from "@src/store/apps/vendor/organization";
import { addVendor } from "@src/store/apps/vendor/vendor";

// ** Others
import toast from "react-hot-toast";
import { Typography } from "@mui/material";

// ** Styled Components
const RegisterMultiStepsIllustration = styled("img")({
  height: "auto",
  maxHeight: 650,
  maxWidth: "100%",
});

const LeftWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(12, 0, 12, 12),
  [theme.breakpoints.up("lg")]: {
    maxWidth: 480,
  },
  [theme.breakpoints.down(1285)]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 635,
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(12),
  },
}));

const WizardWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: 700,
  margin: theme.spacing(0, "auto"),
  [theme.breakpoints.up("md")]: {
    width: 700,
  },
}));

const Register = () => {
  // ** States
  const [personal, setPersonal] = useState<any>();
  const [organization, setOrganization] = useState<any>();
  const [accountCreated, setAccountCreated] = useState<boolean>(false);

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));

  // ** Var
  const { skin } = settings;

  const handleAddPersonalInfo = (personalInfo: any) => {
    setPersonal(personalInfo);
  };

  const handleAddOrganizationInfo = (organizationInfo: any) => {
    setOrganization(organizationInfo);
  };

  const handleCreateVendor = async () => {
    setAccountCreated(false);
    console.log(organization);
    const resultAction = await dispatch(addOrganization({ ...organization }));

    if (addOrganization.fulfilled.match(resultAction)) {
      const {
        createOrganization: { id },
      }: any = resultAction.payload;

      const vendorData = {
        ...personal,
        password: "",
        image: "",
        language: "english",
        status: "pending",
        emailVerified: "No",
        addedOrganization: id ? "Yes" : "No",
        organizationId: id,
      };

      const vendorResult = await dispatch(addVendor({ ...vendorData }));

      if (addVendor.fulfilled.match(vendorResult)) {
        setAccountCreated(true);

        toast.success(`Account created successfully!`);
      } else {
        toast.error(`Error creating vendor: ${vendorResult.error}`);
      }
    } else {
      toast.error(`Error creating account: ${resultAction.error}`);
    }
  };

  return (
    <Box className="content-right">
      {!hidden ? (
        <LeftWrapper>
          <RegisterMultiStepsIllustration
            alt="register-multi-steps-illustration"
            src={`/images/pages/create-account-${theme.palette.mode}.png`}
          />
        </LeftWrapper>
      ) : null}
      <RightWrapper
        sx={
          skin === "bordered" && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : {}
        }
      >
        {!accountCreated ? (
          <WizardWrapper>
            <RegisterMultiStepsWizard
              handleAddPersonalInfo={handleAddPersonalInfo}
              handleAddOrganizationInfo={handleAddOrganizationInfo}
              handleCreateVendor={handleCreateVendor}
            />
          </WizardWrapper>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginInline: 6,
            }}
          >
            <Typography variant="h4" sx={{ color: "green", mb: 6 }}>
              Account created successfully!
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "green", textAlign: "center" }}
            >
              Account created successfully. Please go to your email address (
              {personal.email}) to verify your account.
            </Typography>
          </Box>
        )}
      </RightWrapper>
    </Box>
  );
};

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Register.guestGuard = true;

export default Register;
