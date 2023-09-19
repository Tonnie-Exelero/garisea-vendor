// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components
import CustomChip from "@components/mui/chip";
import CustomAvatar from "@components/mui/avatar";
import VendorSuspendDialog from "src/views/apps/vendor/view/VendorSuspendDialog";
import VendorSubscriptionDialog from "src/views/apps/vendor/view/VendorSubscriptionDialog";

// ** Types
import { ThemeColor } from "@core/layouts/types";
import { VendorNode } from "src/types/apps/vendorTypes";

// ** Utils Import
import { getInitials } from "@utils/get-initials";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editVendor } from "@src/store/apps/vendor/vendor";
import toast from "react-hot-toast";
import { AbilityContext } from "src/layouts/components/acl/Can";

interface ColorsType {
  [key: string]: ThemeColor;
}

const statusColors: ColorsType = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

interface VendorViewLeftProps {
  vendor: VendorNode;
}

const VendorViewLeft: React.FC<VendorViewLeftProps> = ({ vendor }) => {
  // ** States
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
  const [avatarColor, setAvatarColor] = useState<string | undefined>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] =
    useState<boolean>(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const setUpdateVendorData = () => {
    setId(vendor.id);
    setFirstName(vendor.firstName);
    setLastName(vendor.lastName);
    setUsername(vendor.username);
    setEmail(vendor.email);
    setPhone(vendor.phone);
    setImage(vendor.image);
    setLanguage(vendor.language);
    setStatus(vendor.status);
    setAddress(vendor.address);
    setCity(vendor.city);
    setCountry(vendor.country);
    setAvatarColor(vendor.avatarColor);
  };

  useEffect(() => {
    setUpdateVendorData();
  }, [dispatch, vendor]);

  const handleUpdateVendor = async (e: any) => {
    e.preventDefault();

    const vendorData = {
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
    };

    const resultAction = await dispatch(editVendor({ ...vendorData }));

    if (editVendor.fulfilled.match(resultAction)) {
      // vendor will have a type signature of Vendor as we passed that as the Returned parameter in createAsyncThunk
      const vendor = resultAction.payload;
      const { updateVendor }: any = vendor;

      toast.success(`Vendor ${updateVendor.firstName} updated successfully!`);
    } else {
      toast.error(`Error updating vendor: ${resultAction.error}`);
    }

    handleEditClose();
  };

  if (vendor) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 12,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {image ? (
                <CustomAvatar
                  src={image}
                  variant="rounded"
                  alt={firstName + " " + lastName}
                  sx={{ width: 110, height: 110, mb: 6 }}
                />
              ) : (
                <CustomAvatar
                  skin="light"
                  variant="rounded"
                  color={avatarColor as ThemeColor}
                  sx={{
                    width: 110,
                    height: 110,
                    fontWeight: 600,
                    mb: 6,
                    fontSize: "3rem",
                  }}
                >
                  {getInitials(firstName + " " + lastName)}
                </CustomAvatar>
              )}
              <Typography
                variant="h5"
                sx={{ mb: 2.5, fontSize: "1.375rem !important" }}
              >
                {firstName + " " + lastName}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="h6">Details</Typography>
              <Divider
                sx={{ mt: (theme) => `${theme.spacing(1)} !important` }}
              />
              <Box sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Username:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    @{username}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Email:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Status:
                  </Typography>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={status}
                    sx={{ fontWeight: 500 }}
                    color={statusColors[status]}
                  />
                </Box>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Contact:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Language:
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {language}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Address:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {address}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    City:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {city}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Country:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {country}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            {ability?.can("update", "vendors") && (
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={handleEditClickOpen}
                >
                  Edit
                </Button>
              </CardActions>
            )}

            <Dialog
              scroll="body"
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby="vendor-view-edit"
              sx={{
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: 650,
                  p: [2, 10],
                },
                "& .MuiDialogTitle-root + .MuiDialogContent-root": {
                  pt: (theme) => `${theme.spacing(2)} !important`,
                },
              }}
              aria-describedby="vendor-view-edit-description"
            >
              <DialogTitle
                id="vendor-view-edit"
                sx={{
                  textAlign: "center",
                  fontSize: "1.5rem !important",
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
                Edit Vendor Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: (theme) => `${theme.spacing(8)} !important`,
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                }}
              >
                <DialogContentText
                  variant="body2"
                  id="vendor-view-edit-description"
                  sx={{ textAlign: "center", mb: 7 }}
                >
                  Updating vendor details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoFocus
                        fullWidth
                        id="firstName"
                        aria-label="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        sx={{ mb: 4 }}
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
                        sx={{ mb: 4 }}
                        label="Last Name"
                        placeholder="e.g. Doe"
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                      <FormControl fullWidth>
                        <InputLabel id="vendor-view-status-label">
                          Status
                        </InputLabel>
                        <Select
                          label="Status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          id="status"
                          labelId="vendor-view-status-label"
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="phone"
                        aria-label="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        sx={{ mb: 4 }}
                        label="Phone"
                        placeholder="+254 711 222 333"
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
                        sx={{ mb: 4 }}
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
                        sx={{ mb: 4 }}
                        label="City"
                        placeholder="e.g. Nairobi"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="vendor-view-country-label">
                          Country
                        </InputLabel>
                        <Select
                          label="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          id="country"
                          labelId="vendor-view-country-label"
                        >
                          <MenuItem value="Kenya">Kenya</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="vendor-view-language-label">
                          Language
                        </InputLabel>
                        <Select
                          label="Language"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          id="language"
                          labelId="vendor-view-language-label"
                        >
                          <MenuItem value="arabic">Arabic</MenuItem>
                          <MenuItem value="english">English</MenuItem>
                          <MenuItem value="french">French</MenuItem>
                          <MenuItem value="german">German</MenuItem>
                          <MenuItem value="portuguese">Portuguese</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label="Use as a billing address?"
                        control={<Switch defaultChecked />}
                        sx={{ "& .MuiTypography-root": { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={(e) => handleUpdateVendor(e)}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleEditClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <VendorSuspendDialog
              open={suspendDialogOpen}
              setOpen={setSuspendDialogOpen}
            />
            <VendorSubscriptionDialog
              open={subscriptionDialogOpen}
              setOpen={setSubscriptionDialogOpen}
            />
          </Card>
        </Grid>

        {/* <Grid item xs={12}>
          <Card
            sx={{
              boxShadow: "none",
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexWrap: "wrap",
                pb: "0 !important",
                justifyContent: "space-between",
              }}
            >
              <CustomChip
                rounded
                skin="light"
                size="small"
                color="primary"
                label="Standard"
              />
              <Box sx={{ display: "flex", position: "relative" }}>
                <Sup>$</Sup>
                <Typography
                  variant="h3"
                  sx={{
                    mb: -1.2,
                    lineHeight: 1,
                    fontWeight: 600,
                    color: "primary.main",
                    fontSize: "2rem !important",
                  }}
                >
                  99
                </Typography>
                <Sub>/ month</Sub>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ mt: 7, mb: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    mb: 2,
                    alignItems: "center",
                    "& svg": { mr: 2, color: "text.secondary" },
                  }}
                >
                  <Icon icon="bxs:circle" fontSize="0.35rem" />
                  <Typography
                    component="span"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    10 Vendors
                  </Typography>
                </Box>
                <Box
                  sx={{
                    my: 2,
                    display: "flex",
                    alignItems: "center",
                    "& svg": { mr: 2, color: "text.secondary" },
                  }}
                >
                  <Icon icon="bxs:circle" fontSize="0.35rem" />
                  <Typography
                    component="span"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    Up to 10GB storage
                  </Typography>
                </Box>
                <Box
                  sx={{
                    my: 2,
                    display: "flex",
                    alignItems: "center",
                    "& svg": { mr: 2, color: "text.secondary" },
                  }}
                >
                  <Icon icon="bxs:circle" fontSize="0.35rem" />
                  <Typography
                    component="span"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    Basic Support
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", mb: 1, justifyContent: "space-between" }}
              >
                <Typography sx={{ color: "text.secondary" }}>Days</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  26 of 30 Days
                </Typography>
              </Box>
              <LinearProgress
                value={86.66}
                variant="determinate"
                sx={{ height: 8, borderRadius: "5px" }}
              />
              <Typography sx={{ mb: 9, mt: 1.5, color: "text.secondary" }}>
                4 days remaining
              </Typography>
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handlePlansClickOpen}
              >
                Upgrade Plan
              </Button>
            </CardContent>

            <Dialog
              scroll="body"
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby="vendor-view-plans"
              aria-describedby="vendor-view-plans-description"
              sx={{
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: 560,
                  pt: 8,
                  pb: 8,
                },
                "& .MuiDialogTitle-root ~ .MuiDialogContent-root": {
                  pt: (theme) => `${theme.spacing(2)} !important`,
                },
              }}
            >
              <DialogTitle
                id="vendor-view-plans"
                sx={{
                  textAlign: "center",
                  fontSize: "1.5rem !important",
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
                Upgrade Plan
              </DialogTitle>

              <DialogContent
                sx={{
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                }}
              >
                <DialogContentText
                  variant="body2"
                  sx={{ textAlign: "center" }}
                  id="vendor-view-plans-description"
                >
                  Choose the best plan for the vendor.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  pb: 8,
                  gap: 4,
                  pl: [6, 15],
                  pr: [6, 15],
                  display: "flex",
                  alignItems: "center",
                  flexWrap: ["wrap", "nowrap"],
                }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel id="vendor-view-plans-select-label">
                    Choose Plan
                  </InputLabel>
                  <Select
                    label="Choose Plan"
                    defaultValue="Standard"
                    id="vendor-view-plans-select"
                    labelId="vendor-view-plans-select-label"
                  >
                    <MenuItem value="Basic">Basic - $0/month</MenuItem>
                    <MenuItem value="Standard">Standard - $99/month</MenuItem>
                    <MenuItem value="Enterprise">
                      Enterprise - $499/month
                    </MenuItem>
                    <MenuItem value="Company">Company - $999/month</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" sx={{ minWidth: ["100%", 0] }}>
                  Upgrade
                </Button>
              </DialogContent>

              <Divider
                sx={{
                  mt: (theme) => `${theme.spacing(0.5)} !important`,
                  mb: (theme) => `${theme.spacing(7.5)} !important`,
                }}
              />

              <DialogContent sx={{ pl: [6, 15], pr: [6, 15] }}>
                <Typography sx={{ fontWeight: 500, mb: 3.5 }}>
                  Vendor current plan is standard plan
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: ["wrap", "nowrap"],
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      mr: 3,
                      display: "flex",
                      ml: 2.4,
                      position: "relative",
                    }}
                  >
                    <Sup>$</Sup>
                    <Typography
                      variant="h3"
                      sx={{
                        mb: -1.2,
                        lineHeight: 1,
                        color: "primary.main",
                        fontSize: "3rem !important",
                      }}
                    >
                      99
                    </Typography>
                    <Sub sx={{ fontSize: "1.125rem", color: "text.primary" }}>
                      / month
                    </Sub>
                  </Box>
                  <Button
                    color="error"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => setSubscriptionDialogOpen(true)}
                  >
                    Cancel Subscription
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid> */}
      </Grid>
    );
  } else {
    return null;
  }
};

export default VendorViewLeft;
