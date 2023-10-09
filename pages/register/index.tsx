// ** React Imports
import { ReactNode, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { CircularProgress, Typography } from "@mui/material";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** Components Imports
import RegisterMultiStepsWizard from "src/views/pages/auth/register-multi-steps";
import CustomAvatar from "@components/mui/avatar";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** API
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { addOrganization } from "@src/store/apps/vendor/organization/single";
import { addVendor } from "@src/store/apps/vendor/vendor/single";

// ** Email Imports
import EmailVerify from "@emails/EmailVerify";

// ** Others
import toast from "react-hot-toast";
import { baseUrl } from "@src/configs/baseUrl";
import { createToken } from "@src/configs/jwt";
import { sendEmail } from "@src/configs/email";
import { APP_SECRET } from "@graphql/utils/auth";
import { idleTimer } from "@src/configs/idleOrReload";
import { encryptData } from "@core/utils/encryption";

// ** Styled Components
const RegisterMultiStepsIllustration = styled("img")({
  height: "auto",
  maxHeight: 250,
  width: "100%",
  objectFit: "cover",
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

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const Register = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** States
  const [personal, setPersonal] = useState<any>();
  const [accountCreated, setAccountCreated] = useState<boolean>(false);
  const [creating, setCreating] = useState<string>("");

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));

  // ** Var
  const { skin } = settings;

  // ** Local Storage
  const fromLocalStore = window.localStorage.getItem("settings");
  const appSettings = fromLocalStore && JSON.parse(fromLocalStore);

  const handleAddPersonalInfo = (personalInfo: any) => {
    setPersonal(personalInfo);
  };

  const handleCreateVendor = async (organizationInfo: any) => {
    setCreating("ongoing");
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
        vendorVerified: "no",
        addedOrganization: id ? "Yes" : "No",
        organizationId: id,
      };

      const vendorResult = await dispatch(addVendor({ ...vendorData }));

      if (addVendor.fulfilled.match(vendorResult)) {
        setAccountCreated(true);
        setCreating("complete");

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
          secret: encryptData(newSecret.toString()),
          expirationTime: "1d",
        };

        const tokenObject = await createToken(tokenPayload);

        // Verification link.
        const url = `${baseUrl}/verify-email?token=${tokenObject.token}`;

        const payload = {
          name: createVendor.firstName,
          to: createVendor.email,
          subject: "Welcome to Garisea",
          template: EmailVerify({ url, name: createVendor.firstName }),
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
        <LeftWrapper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingInlineEnd: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <CustomAvatar
                src={
                  appSettings?.mode === "dark"
                    ? themeConfig.logos.greenLight
                    : themeConfig.logos.greenDark
                }
                variant="rounded"
                alt={"Garisea"}
                sx={{
                  width: 200,
                  height: "auto",
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1,
                    fontWeight: 400,
                    letterSpacing: "-0.45px",
                    textTransform: "lowercase",
                    fontSize: ".85rem !important",
                    transition:
                      "opacity .35s ease-in-out, margin .35s ease-in-out",
                  }}
                >
                  Vendor
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ color: "green" }}>
              Sell your cars better, and faster
            </Typography>
            <Typography variant="h6">
              Garisea is an advanced vehicle marketplace primarily focused on
              making the car selling process smarter through a ton of curated
              solutions, value-adding analytics, and AI-based car buyer
              acquisition for you as a car seller.
            </Typography>
            <Typography variant="h6">
              Sign up to create your Garisea shop and start selling your
              vehicles smartly to millions of potential customers.
            </Typography>
            <Typography variant="h6">
              Using Garisea is <strong>FREE</strong>.
            </Typography>
          </Box>

          <RegisterMultiStepsIllustration
            alt="Garisea vendor"
            src={`/static/car.png`}
          />
        </LeftWrapper>
      ) : null}
      <RightWrapper
        sx={
          skin === "bordered" && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : {}
        }
        display={"flex"}
        flexDirection={"column"}
        gap={8}
      >
        {!accountCreated ? (
          <WizardWrapper>
            <RegisterMultiStepsWizard
              handleAddPersonalInfo={handleAddPersonalInfo}
              handleCreateVendor={handleCreateVendor}
            />
            {creating === "ongoing" && (
              <Box
                sx={{
                  mt: 4,
                  mb: 4,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <CircularProgress size="1.5rem" sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Creating Account...
                </Typography>
              </Box>
            )}
            {creating === "complete" && (
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "green" }}>
                  Account Created Successfully!
                </Typography>
              </Box>
            )}
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
        {creating === "" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ mr: 2 }}>
              Already have an account?
            </Typography>
            <Typography variant="body2">
              <LinkStyled href="/login">Sign in instead</LinkStyled>
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
