// ** React Imports
import { ReactNode, useState } from "react";

// ** MUI Components
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

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

// ** Email Imports
import EmailVerify from "@src/emails/EmailVerify";

// ** Others
import toast from "react-hot-toast";
import { baseUrl } from "@src/configs/baseUrl";
import { createToken } from "@src/configs/jwt";
import { sendEmail } from "@src/configs/email";
import { APP_SECRET } from "@graphql/utils/auth";

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

  const handleCreateVendor = async (organizationInfo: any) => {
    setAccountCreated(false);

    const resultAction = await dispatch(
      addOrganization({ ...organizationInfo })
    );

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

        // vendor will have a type signature of Vendor as we passed that as the Returned parameter in createAsyncThunk
        const vendor = vendorResult.payload;
        const { createVendor }: any = vendor;

        // ** Send verification email.
        const newSecret = APP_SECRET + createVendor.email;

        const tokenPayload = {
          data: {
            id: createVendor.id,
            email: createVendor.email,
            firstName: createVendor.firstName,
          },
          secret: newSecret.toString(),
          expirationTime: "1d",
        };

        const tokenObject = await createToken(tokenPayload);

        // Verification link.
        const url = `${baseUrl}/verify-email?token=${tokenObject.token}`;

        const payload = {
          name: createVendor.firstName,
          to: createVendor.email,
          subject: "Welcome to Garisea",
          template: EmailVerify(url, createVendor.firstName),
        };

        sendEmail({ ...payload });
        // ** End Send verification email.

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
              marginInline: { xs: 10, md: 20 },
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
