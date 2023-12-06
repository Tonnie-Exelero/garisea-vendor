// ** React Imports
import { ReactNode, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Custom Components Imports
import AuthIllustrationWrapper from "src/views/pages/auth/AuthIllustrationWrapper";
import CustomAvatar from "@components/mui/avatar";

// ** Email Imports
import PasswordReset from "@emails/PasswordReset";

// ** API
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { fetchVendorByEmail } from "@src/store/apps/vendor/vendor/single";

// ** Others
import toast from "react-hot-toast";
import { APP_SECRET } from "@graphql/utils/auth";
import { createToken } from "@src/configs/jwt";
import { sendEmail } from "@src/configs/email";
import { baseUrl } from "@src/configs/baseUrl";
import { idleTimer } from "@src/configs/idleOrReload";
import { encryptData } from "@core/utils/encryption";

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const ForgotPassword = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** States
  const [vEmail, setVEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<string>("");

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  // ** Local Storage
  const fromLocalStore = window.localStorage.getItem("settings");
  const appSettings = fromLocalStore && JSON.parse(fromLocalStore);

  const handleResetLink = async () => {
    setIsSending("sending");

    const resultAction = await dispatch(fetchVendorByEmail({ email: vEmail }));

    if (fetchVendorByEmail.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      const {
        vendorByEmail: { id, email, firstName },
      }: any = user;

      // Organize and send email
      const secret = APP_SECRET + email;

      const tokenPayload = {
        data: { id, email, firstName },
        secret: encryptData(secret.toString()),
        expirationTime: "1d",
      };
      const tokenObject = await createToken({ pl: encryptData(tokenPayload) });

      // Verification link.
      const url = `${baseUrl}/reset-password?token=${encryptData(tokenObject)}`;
      const payload = {
        name: firstName,
        to: email,
        subject: "Garisea Password Reset",
        template: PasswordReset({ url, name: firstName }),
      };
      sendEmail({ ...payload });

      setIsSending("complete");

      toast.success(`Reset link sent successfully!`);
    } else {
      toast.error(`Email doesn't exist!`);
    }
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
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Forgot Password? 🔒
            </Typography>
            <Typography sx={{ mb: 6, color: "text.secondary" }}>
              Enter your email and we&prime;ll send you instructions to reset
              your password.
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                autoFocus
                fullWidth
                id="email"
                aria-label="email"
                value={vEmail}
                onChange={(e) => setVEmail(e.target.value)}
                type="email"
                sx={{ mb: 4 }}
                label="Email"
                placeholder="e.g. johndoe@email.com"
              />
              <Box sx={{ display: "flex", justifyContent: "center", gap: 6 }}>
                {isSending === "" && (
                  <Button
                    size="large"
                    onClick={handleResetLink}
                    variant="contained"
                    sx={{ mb: 4 }}
                  >
                    Send reset link
                  </Button>
                )}
                {isSending === "sending" && (
                  <CircularProgress size="1.5rem" sx={{ mt: 3, mb: 3 }} />
                )}
                {isSending === "complete" && (
                  <Typography variant="h6" sx={{ color: "green" }}>
                    Email sent!
                  </Typography>
                )}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  mt: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinkStyled href="/login">
                  <Icon icon="bx:chevron-left" />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  );
};

ForgotPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

ForgotPassword.guestGuard = true;

export default ForgotPassword;
