// ** React Imports
import { useState, ReactNode } from "react";

// ** Next Import
import Router from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
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

// ** Third Party Imports
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editPassword } from "@src/store/apps/vendor/vendor/single";
import { decodeToken } from "@src/configs/jwt";
import { idleTimer } from "@src/configs/idleOrReload";
import { decryptData, encryptData } from "@core/utils/encryption";

interface State {
  showNewPassword: boolean;
  showConfirmNewPassword: boolean;
}

interface PasswordData {
  newPassword: string;
  confirmNewPassword: string;
}

const defaultValues = {
  newPassword: "",
  confirmNewPassword: "",
};

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character"
    )
    .required(),
  confirmNewPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

interface Props {
  uu: string;
}

const ResetPassword = (props: Props) => {
  // ** Watch for idle time or reload
  idleTimer();

  const { uu } = props;
  const uid = decryptData(uu);

  // ** States
  const [values, setValues] = useState<State>({
    showNewPassword: false,
    showConfirmNewPassword: false,
  });
  const [isSaving, setIsSaving] = useState<string>("");

  // ** Hook
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  // ** Local Storage
  const fromLocalStore = window.localStorage.getItem("settings");
  const appSettings = fromLocalStore && JSON.parse(fromLocalStore);

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const onPasswordFormSubmit = async (data: PasswordData) => {
    setIsSaving("saving");

    const userData = {
      id: uid,
      password: data.newPassword,
    };

    const resultAction = await dispatch(editPassword({ ...userData }));

    if (editPassword.fulfilled.match(resultAction)) {
      setIsSaving("complete");
      toast.success(`Password updated successfully!`);

      Router.replace("/login");
    } else {
      toast.error(`Error updating password: ${resultAction.error}`);
    }
    reset(defaultValues);
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
            <Typography variant="h6" sx={{ mb: 1.5, textAlign: "center" }}>
              Reset Password 🔒
            </Typography>
            <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
              <Grid container spacing={5} sx={{ mt: 0 }}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="input-new-password"
                      error={Boolean(errors.newPassword)}
                    >
                      New Password
                    </InputLabel>
                    <Controller
                      name="newPassword"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <OutlinedInput
                          value={value}
                          label="New Password"
                          onChange={onChange}
                          id="input-new-password"
                          error={Boolean(errors.newPassword)}
                          type={values.showNewPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={(e) => e.preventDefault()}
                              >
                                <Icon
                                  icon={
                                    values.showNewPassword
                                      ? "bx:show"
                                      : "bx:hide"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.newPassword && (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {errors.newPassword.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="input-confirm-new-password"
                      error={Boolean(errors.confirmNewPassword)}
                    >
                      Confirm New Password
                    </InputLabel>
                    <Controller
                      name="confirmNewPassword"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <OutlinedInput
                          value={value}
                          label="Confirm New Password"
                          onChange={onChange}
                          id="input-confirm-new-password"
                          error={Boolean(errors.confirmNewPassword)}
                          type={
                            values.showConfirmNewPassword ? "text" : "password"
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={handleClickShowConfirmNewPassword}
                              >
                                <Icon
                                  icon={
                                    values.showConfirmNewPassword
                                      ? "bx:show"
                                      : "bx:hide"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.confirmNewPassword && (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {errors.confirmNewPassword.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Password Requirements:
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      pl: 4,
                      mb: 0,
                      "& li": { mb: 1, color: "text.secondary" },
                    }}
                  >
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase & one uppercase character</li>
                    <li>
                      At least one number, symbol, or whitespace character
                    </li>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 6 }}
                  >
                    {isSaving === "" && (
                      <Button variant="contained" type="submit" sx={{ mr: 3 }}>
                        Save
                      </Button>
                    )}
                    {isSaving === "saving" && (
                      <CircularProgress size="1.5rem" sx={{ mt: 3, mb: 3 }} />
                    )}
                    {isSaving === "complete" && (
                      <Typography variant="h6" sx={{ color: "green" }}>
                        Saved!
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  );
};

export const getServerSideProps: any = async ({ query }: any) => {
  const { token } = query;
  const decryptedToken = decryptData(token as string);
  const payload: any = await decodeToken(decryptedToken.token);

  const { id } = payload;

  return {
    props: {
      uu: encryptData(id),
    },
  };
};

ResetPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

ResetPassword.guestGuard = true;

export default ResetPassword;
