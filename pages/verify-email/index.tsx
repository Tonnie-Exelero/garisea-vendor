// ** React Imports
import { ReactNode, useEffect, useState } from "react";

// ** Next Import
import Link from "next/link";
import Router from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, useTheme } from "@mui/material/styles";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Custom Components Imports
import AuthIllustrationWrapper from "src/views/pages/auth/AuthIllustrationWrapper";
import CustomAvatar from "@components/mui/avatar";

// ** Email Imports
import EmailVerify from "@emails/EmailVerify";
import VendorWelcome from "@emails/VendorWelcome";

// ** API
import { AppDispatch, RootState } from "src/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorById,
  editEmailVerified,
} from "@src/store/apps/vendor/vendor/single";

// ** Others
import jwt from "jsonwebtoken";
import { APP_SECRET } from "@graphql/utils/auth";
import { createToken, decodeToken } from "@src/configs/jwt";
import { sendEmail } from "@src/configs/email";
import { baseUrl } from "@src/configs/baseUrl";
import { idleTimer } from "@src/configs/idleOrReload";
import { encryptData } from "@core/utils/encryption";

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main,
}));

interface Props {
  data: any;
  isTokenExpired: boolean;
  isEmailValid: boolean;
}

const VerifyEmail = (props: Props) => {
  // ** Watch for idle time or reload
  idleTimer();

  const {
    data: { id, email, firstName },
    isTokenExpired,
    isEmailValid,
  } = props;

  // ** States
  const [currentVendorVerified, setCurrentVendorVerified] = useState<string>();
  const [sending, setSending] = useState<string>("");

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { vendor } = useSelector((state: RootState) => state.singleVendor);

  // ** Local Storage
  const fromLocalStore = window.localStorage.getItem("settings");
  const appSettings = fromLocalStore && JSON.parse(fromLocalStore);

  useEffect(() => {
    dispatch(fetchVendorById({ id }));

    setCurrentVendorVerified(vendor.emailVerified);
  }, [dispatch, vendor, currentVendorVerified]);

  // Update Email Verification status
  const updateEmailVerified = async () => {
    const resetPasswordTokenPayload = {
      data: { id },
      secret: encryptData(APP_SECRET),
      expirationTime: "7d",
    };

    const resetPasswordTokenObj = await createToken(resetPasswordTokenPayload);

    const vendorData = {
      id,
      emailVerified: "Yes",
    };

    const resultAction = await dispatch(editEmailVerified({ ...vendorData }));

    if (editEmailVerified.fulfilled.match(resultAction)) {
      // Send Vendor Welcome email
      const payload = {
        name: firstName,
        to: email,
        subject: "Get Started with Garisea",
        template: VendorWelcome(),
      };
      sendEmail({ ...payload });
      // Finish sending email

      // Proceed to set password
      Router.replace(`/reset-password?token=${resetPasswordTokenObj.token}`);

      console.log(`Email verification updated successfully!`);
    } else {
      console.error(`Error updating email verification.`);
    }
  };

  const sendVerificationLink = async () => {
    setSending("ongoing");

    const secret = APP_SECRET + email;

    const tokenPayload = {
      data: { id, email, firstName },
      secret: encryptData(secret.toString()),
      expirationTime: "1d",
    };
    const tokenObject = await createToken(tokenPayload);
    // Verification link.
    const url = `${baseUrl}/verify-email?token=${tokenObject.token}`;
    const payload = {
      name: firstName,
      to: email,
      subject: "Welcome to Garisea",
      template: EmailVerify({ url, name: firstName }),
    };
    sendEmail({ ...payload });

    setSending("complete");
  };

  return (
    <Box className="content-center">
      <AuthIllustrationWrapper>
        <Card>
          <CardContent sx={{ p: `${theme.spacing(8, 8, 7)} !important` }}>
            <Box
              sx={{
                mb: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
            {currentVendorVerified === "Yes" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ mb: 1.5, color: "red", textAlign: "center" }}
                >
                  Activation Link Used!
                </Typography>
                <Typography
                  sx={{ mb: 6, color: "text.secondary", textAlign: "center" }}
                >
                  Account activation link has already been used and email is
                  verified.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <LinkStyled href="/login">
                    <span>Proceed to login</span>
                  </LinkStyled>
                </Box>
              </>
            )}
            {vendor &&
              vendor.emailVerified === "No" &&
              isEmailValid &&
              !isTokenExpired && (
                <>
                  <Typography
                    variant="h5"
                    sx={{ mb: 4, color: "green", textAlign: "center" }}
                  >
                    Email Verified Successfully!
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={updateEmailVerified} variant="contained">
                      Set Password
                    </Button>
                  </Box>
                </>
              )}
            {vendor &&
              vendor.emailVerified === "No" &&
              isTokenExpired &&
              !isEmailValid && (
                <>
                  <Typography
                    variant="h5"
                    sx={{ mb: 1.5, color: "red", textAlign: "center" }}
                  >
                    Activation Link Invalid!
                  </Typography>
                  <Typography
                    sx={{ mb: 6, color: "text.secondary", textAlign: "center" }}
                  >
                    Account activation link sent to your email address{" "}
                    <strong>{email}</strong> has expired or is invalid. Please
                    click the button below to get a new link.
                  </Typography>
                  {sending === "" ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        onClick={sendVerificationLink}
                        sx={{ mb: 4 }}
                      >
                        Send New Link
                      </Button>
                    </Box>
                  ) : sending === "ongoing" ? (
                    <Box
                      sx={{
                        mt: 6,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <CircularProgress sx={{ mb: 4 }} />
                      <Typography>Sending...</Typography>
                    </Box>
                  ) : (
                    sending === "complete" && (
                      <>
                        <Typography
                          variant="body1"
                          sx={{ mb: 1.5, color: "green", textAlign: "center" }}
                        >
                          Verification email sent successfully!
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ mr: 1 }} variant="body2">
                            Didn't get the mail?
                          </Typography>
                          <LinkStyled href="/" onClick={sendVerificationLink}>
                            Resend
                          </LinkStyled>
                        </Box>
                      </>
                    )
                  )}
                </>
              )}
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  );
};

export const getServerSideProps: any = async ({ query }: any) => {
  const { token } = query;
  const payload: any = await decodeToken(token);

  const { email } = payload;
  const secret = APP_SECRET + email;

  let data: any = {};
  let isTokenExpired: boolean = false;
  let isEmailValid: boolean = false;

  jwt.verify(token, secret as string, async (err: any) => {
    // ** If token is expired, add decoded data to props for new token generation
    if (err) {
      data = { ...payload };
      isTokenExpired = true;
    }
    if (!err) {
      data = { ...payload };
      isEmailValid = true;
    }
  });

  return {
    props: {
      data,
      isTokenExpired,
      isEmailValid,
    },
  };
};

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

VerifyEmail.guestGuard = true;

export default VerifyEmail;
