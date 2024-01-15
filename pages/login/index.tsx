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

const Login = () => {
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
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Welcome to {themeConfig.appName} <strong>Vendor</strong>! 👋🏻
            </Typography>
            <Typography sx={{ mb: 6, color: "text.secondary" }}>
              Please sign-in to your account to manage and explore.
            </Typography>
            {loginErrorMessage && (
              <Typography sx={{ mb: 3 }} variant="body2" color="error">
                {loginErrorMessage}
              </Typography>
            )}
            {idleTimeOrReloadMessage && (
              <Typography sx={{ mb: 3, color: "orange" }} variant="body2">
                {idleTimeOrReloadMessage}
              </Typography>
            )}
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      fullWidth
                      label="Email"
                      id="email"
                      aria-label="email"
                      type="email"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      sx={{ mb: 4 }}
                      placeholder="user@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="password" error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      fullWidth
                      label="Password"
                      id="password"
                      aria-label="password"
                      type={showPassword ? "text" : "password"}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.password)}
                      placeholder="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon
                              fontSize={20}
                              icon={showPassword ? "bx:show" : "bx:hide"}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }} id="">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                <LinkStyled href="/forgot-password">
                  Forgot Password?
                </LinkStyled>
              </Box>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 4 }}
              >
                Sign in
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" sx={{ mr: 2 }}>
                  New to {themeConfig.appName}?
                </Typography>
                <Typography>
                  <LinkStyled href="/register">Create an account</LinkStyled>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  );
};

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Login.guestGuard = true;

export default Login;
