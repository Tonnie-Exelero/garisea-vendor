// ** React Imports
import { ReactNode } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Custom Components Imports
import AuthIllustrationWrapper from "src/views/pages/auth/AuthIllustrationWrapper";
import CustomAvatar from "@components/mui/avatar";

// ** Others
import { idleTimer } from "@src/configs/idleOrReload";

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const ThankYou = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** Hooks
  const theme = useTheme();

  // ** Local Storage
  const fromLocalStore = window.localStorage.getItem("settings");
  const appSettings = fromLocalStore && JSON.parse(fromLocalStore);

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
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
              Thank You! 🙏
            </Typography>
            <Typography
              sx={{ mb: 6, color: "text.secondary", textAlign: "center" }}
            >
              Thank you for creating your vendor account. Welcome to the
              revolutionary car selling platform.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LinkStyled href="/login">
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ mb: 4 }}
                >
                  Sign In
                </Button>
              </LinkStyled>
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  );
};

ThankYou.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

ThankYou.guestGuard = true;

export default ThankYou;
