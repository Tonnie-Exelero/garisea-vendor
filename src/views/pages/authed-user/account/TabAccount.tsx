// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Button, { ButtonProps } from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CircularProgress } from "@mui/material";

// ** Third Party Imports
import { useForm, Controller } from "react-hook-form";

// ** Context
import { useAuth } from "src/hooks/useAuth";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components
import CustomAvatar from "@components/mui/avatar";

// ** Others
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editVendor, editImage, removeVendor } from "@src/store/apps/auth";
import { ThemeColor } from "@core/layouts/types";
import { getInitials } from "@utils/get-initials";
import { removeFile, uploadFile } from "@core/utils/file-manager";

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

interface TabAccountProps {
  user: any;
}

const TabAccount: React.FC<TabAccountProps> = ({ user }) => {
  // ** State
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [organization, setOrganization] = useState<any>();
  const [avatarColor, setAvatarColor] = useState<string | undefined>("");
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("yes");
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { checkbox: false } });
  const dispatch = useDispatch<AppDispatch>();
  const { logout } = useAuth();

  const setUpdateUserData = () => {
    setId(user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone);
    setImage(user.image);
    setLanguage(user.language);
    setStatus(user.status);
    setAddress(user.address);
    setCity(user.city);
    setCountry(user.country);
    setOrganization(user.organization);
    setAvatarColor(user.avatarColor);
  };

  useEffect(() => {
    setUpdateUserData();
  }, [user]);

  const handleClose = () => setOpen(false);

  const handleSecondDialogClose = () => setSecondDialogOpen(false);

  const onSubmit = () => setOpen(true);

  const handleConfirmation = (value: string) => {
    handleClose();
    setUserInput(value);
    setSecondDialogOpen(true);
  };

  const handleInputImageChange = async (file: ChangeEvent) => {
    setUploadingImage(true);

    const newFile = await uploadFile(file);

    newFile && handleUpdateUserImage(newFile.url);

    // Then remove the previous image from server.
    image && removeFile(image);

    setUploadingImage(false);
  };

  const handleUpdateUserImage = async (imageUrl: string) => {
    const userData = {
      id,
      image: imageUrl,
    };

    const resultAction: any = await dispatch(editImage({ ...userData }));

    if (editImage.fulfilled.match(resultAction)) {
      toast.success(`Image updated successfully!`);
    } else {
      toast.error(`Error updating image: ${resultAction.error}`);
    }
  };

  const handleInputImageReset = () => {
    setInputValue("");
    setImage(user.image);
  };

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();

    const userData = {
      id,
      firstName,
      lastName,
      username,
      email,
      phone,
      image,
      language,
      status,
      address,
      city,
      country,
      organizationId: organization.id,
    };

    const resultAction = await dispatch(editVendor({ ...userData }));

    if (editVendor.fulfilled.match(resultAction)) {
      toast.success(`Profile updated successfully!`);
    } else {
      toast.error(`Error updating profile: ${resultAction.error}`);
    }
  };

  const handleDeleteAccount = async (e: any) => {
    e.preventDefault();

    const resultAction = await dispatch(removeVendor({ id }));

    if (removeVendor.fulfilled.match(resultAction)) {
      toast.success(`Account deleted successfully!`);
    } else {
      toast.error(`Error deleting account: ${resultAction.error}`);
    }
  };

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Account Details" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {image ? (
                <CustomAvatar
                  src={image}
                  variant="rounded"
                  alt={firstName + " " + lastName}
                  sx={{
                    width: 100,
                    height: 100,
                    marginInlineEnd: (theme) => theme.spacing(6.25),
                  }}
                />
              ) : (
                <CustomAvatar
                  skin="light"
                  variant="rounded"
                  color={avatarColor as ThemeColor}
                  sx={{
                    width: 100,
                    height: 100,
                    marginInlineEnd: (theme) => theme.spacing(6.25),
                    fontWeight: 600,
                    fontSize: "3rem",
                  }}
                >
                  {getInitials(firstName + " " + lastName)}
                </CustomAvatar>
              )}
              <div>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <ButtonStyled
                    // @ts-ignore
                    component={"label"}
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      value={inputValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputImageChange}
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color="secondary"
                    variant="outlined"
                    onClick={handleInputImageReset}
                  >
                    Reset
                  </ResetButtonStyled>
                  {uploadingImage && (
                    <Box
                      sx={{
                        ml: 4,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress size="1.5rem" sx={{ mr: 2 }} />
                    </Box>
                  )}
                </Box>
                <Typography sx={{ mt: 6, color: "text.disabled" }}>
                  Allowed PNG or JPEG. Max size of 2MB.
                </Typography>
              </div>
            </Box>
          </CardContent>
          <Divider sx={{ my: (theme) => `${theme.spacing(1)} !important` }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  aria-label="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  label="First Name"
                  placeholder="e.g. John"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  aria-label="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  label="Last Name"
                  placeholder="e.g. Doe"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="username"
                  aria-label="username"
                  value={username}
                  type="text"
                  label="Username"
                  placeholder="johndoe"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  aria-label="email"
                  value={email}
                  type="email"
                  label="Email"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phone"
                  aria-label="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  label="Phone"
                  placeholder="+254 711 222 333"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="status"
                  aria-label="status"
                  value={status}
                  type="text"
                  label="Status"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="address"
                  aria-label="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  label="Address"
                  placeholder="e.g. 123 Center Ln., Apartment 34, Plymouth, MN 55441"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="city"
                  aria-label="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  label="City"
                  placeholder="e.g. Nairobi"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="user-view-country-label">Country</InputLabel>
                  <Select
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    id="country"
                    labelId="user-view-country-label"
                  >
                    <MenuItem value="Kenya">Kenya</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="user-view-language-label">
                    Language
                  </InputLabel>
                  <Select
                    label="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    id="language"
                    labelId="user-view-language-label"
                  >
                    <MenuItem value="arabic">Arabic</MenuItem>
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                    <MenuItem value="german">German</MenuItem>
                    <MenuItem value="portuguese">Portuguese</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="organization"
                  aria-label="organization"
                  value={organization ? organization.name : "Editor"}
                  type="text"
                  label="Organization"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ mr: 3 }}
                  onClick={(e) => handleUpdateUser(e)}
                >
                  Save Changes
                </Button>

                <Button
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  onClick={setUpdateUserData}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Delete Account Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Delete Account" />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 2 }}>
                <FormControl>
                  <Controller
                    name="checkbox"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormControlLabel
                        label="I confirm my account deactivation"
                        sx={{
                          "& .MuiTypography-root": {
                            color: errors.checkbox
                              ? "error.main"
                              : "text.secondary",
                          },
                        }}
                        control={
                          <Checkbox
                            {...field}
                            size="small"
                            name="validation-basic-checkbox"
                            sx={
                              errors.checkbox ? { color: "error.main" } : null
                            }
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="validation-basic-checkbox"
                    >
                      Please confirm you want to delete account
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button
                variant="contained"
                color="error"
                type="submit"
                disabled={errors.checkbox !== undefined}
              >
                Deactivate Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Deactivate Account Dialogs */}
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(6)} !important`,
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            pt: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              "& svg": { mb: 6, color: "error.main" },
            }}
          >
            <Icon icon="bx:error-circle" fontSize="5.5rem" />
            <Typography>
              Are you sure you would like to delete your account? This action is
              irreversible.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            pb: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            color="error"
            onClick={(e) => {
              handleDeleteAccount(e);
              handleConfirmation("yes");
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleConfirmation("cancel")}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
      >
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(6)} !important`,
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            pt: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              "& svg": {
                mb: 8,
                color: userInput === "yes" ? "success.main" : "error.main",
              },
            }}
          >
            <Icon
              fontSize="5.5rem"
              icon={userInput === "yes" ? "bx:check-circle" : "bx:x-circle"}
            />
            <Typography variant="h4" sx={{ mb: 5 }}>
              {userInput === "yes" ? "Deleted!" : "Cancelled"}
            </Typography>
            <Typography>
              {userInput === "yes"
                ? "Your account deleted successfully."
                : "Account delete cancelled!"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            pb: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              userInput === "yes" && logout();
              handleSecondDialogClose();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default TabAccount;
