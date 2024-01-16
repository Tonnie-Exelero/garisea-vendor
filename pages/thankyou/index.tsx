// ** React Imports
import { ReactNode, useEffect, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";

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

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

interface FormData {
  email: string;
  password: string;
}

const ThankYou = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();

  // ** Local Storage
  const fromLocalStore = window.localStorage.getItem("settings");
  const appSettings = fromLocalStore && JSON.parse(fromLocalStore);

  useEffect(() => {
    // Clear local storage to allow direct return login
    window.localStorage.removeItem("aT");
    window.localStorage.removeItem("uD");
  }, []);

  // ** Var
  const loginErrorMessage = localStorage.getItem("lE");
  const idleTimeOrReloadMessage = localStorage.getItem("iT");

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    auth.login({ email, password }, () => {
      setError("email", {
        type: "manual",
        message: "Email or Password is invalid",
      });
    });
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
