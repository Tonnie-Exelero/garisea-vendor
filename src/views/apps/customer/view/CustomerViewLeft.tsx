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
import CustomerSuspendDialog from "src/views/apps/customer/view/CustomerSuspendDialog";
import CustomerSubscriptionDialog from "src/views/apps/customer/view/CustomerSubscriptionDialog";

// ** Types
import { ThemeColor } from "@core/layouts/types";
import { CustomerNode } from "src/types/apps/customerTypes";

// ** Utils Import
import { getInitials } from "@utils/get-initials";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editCustomer } from "@src/store/apps/frontend/customer";
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

interface CustomerViewLeftProps {
  customer: CustomerNode;
}

const CustomerViewLeft: React.FC<CustomerViewLeftProps> = ({ customer }) => {
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

  const setUpdateCustomerData = () => {
    setId(customer.id);
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
    setUsername(customer.username);
    setEmail(customer.email);
    setPhone(customer.phone);
    setImage(customer.image);
    setLanguage(customer.language);
    setStatus(customer.status);
    setAddress(customer.address);
    setCity(customer.city);
    setCountry(customer.country);
    setAvatarColor(customer.avatarColor);
  };

  useEffect(() => {
    setUpdateCustomerData();
  }, [dispatch, customer]);

  const handleUpdateCustomer = async (e: any) => {
    e.preventDefault();

    const customerData = {
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

    const resultAction = await dispatch(editCustomer({ ...customerData }));

    if (editCustomer.fulfilled.match(resultAction)) {
      // customer will have a type signature of Customer as we passed that as the Returned parameter in createAsyncThunk
      const customer = resultAction.payload;
      const { updateCustomer }: any = customer;

      toast.success(
        `Customer ${updateCustomer.firstName} updated successfully!`
      );
    } else {
      toast.error(`Error updating customer: ${resultAction.error}`);
    }

    handleEditClose();
  };

  if (customer) {
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
            {ability?.can("update", "customers") && (
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
              aria-labelledby="customer-view-edit"
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
              aria-describedby="customer-view-edit-description"
            >
              <DialogTitle
                id="customer-view-edit"
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
                Edit Customer Information
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
                  id="customer-view-edit-description"
                  sx={{ textAlign: "center", mb: 7 }}
                >
                  Updating customer details will receive a privacy audit.
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
                        <InputLabel id="customer-view-status-label">
                          Status
                        </InputLabel>
                        <Select
                          label="Status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          id="status"
                          labelId="customer-view-status-label"
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
                        <InputLabel id="customer-view-country-label">
                          Country
                        </InputLabel>
                        <Select
                          label="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          id="country"
                          labelId="customer-view-country-label"
                        >
                          <MenuItem value="Kenya">Kenya</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="customer-view-language-label">
                          Language
                        </InputLabel>
                        <Select
                          label="Language"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          id="language"
                          labelId="customer-view-language-label"
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
                  onClick={(e) => handleUpdateCustomer(e)}
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

            <CustomerSuspendDialog
              open={suspendDialogOpen}
              setOpen={setSuspendDialogOpen}
            />
            <CustomerSubscriptionDialog
              open={subscriptionDialogOpen}
              setOpen={setSubscriptionDialogOpen}
            />
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default CustomerViewLeft;
