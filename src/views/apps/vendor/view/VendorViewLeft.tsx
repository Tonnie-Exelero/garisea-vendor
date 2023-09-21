// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** MUI Imports
import {
  Alert,
  AlertTitle,
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
  FormGroup,
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { editVendor } from "@src/store/apps/vendor/vendor";
import { editStatus } from "@src/store/apps/vendor/vendor/single";
import { fetchOrganizations } from "@src/store/apps/vendor/organization";
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
  const [organization, setOrganization] = useState<any>();
  const [organizationId, setOrganizationId] = useState<string>("");
  const [avatarColor, setAvatarColor] = useState<string | undefined>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] =
    useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [openStatusDialog, setOpenStatusDialog] = useState<boolean>(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);
  const { organizations } = useSelector(
    (state: RootState) => state.organizations
  );

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const handleStatusDialogToggle = (text: string) => {
    setStatusText(text);

    setOpenStatusDialog(!openStatusDialog);
  };

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
    setOrganization(vendor.organization);
    setAvatarColor(vendor.avatarColor);
  };

  useEffect(() => {
    dispatch(fetchOrganizations({ first: 100 }));

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
      organizationId,
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

  const handleUpdateUserStatus = async (val: string) => {
    setStatus(val);

    const vendorData = {
      id,
      status: val,
    };

    const resultAction: any = await dispatch(editStatus({ ...vendorData }));

    if (editStatus.fulfilled.match(resultAction)) {
      toast.success(`User marked as ${statusText}!`);
    } else {
      toast.error(`Error marking as ${status}: ${resultAction.error}`);
    }

    handleStatusDialogToggle("");
  };

  if (vendor) {
    return (
      <>
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
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ display: "flex", gap: 4 }}>
                    <Button
                      variant="contained"
                      color={
                        status === "pending" ||
                        status === "suspended" ||
                        status === "inactive"
                          ? "success"
                          : "warning"
                      }
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={() =>
                        handleStatusDialogToggle(
                          status === "pending" ||
                            status === "suspended" ||
                            status === "inactive"
                            ? "active"
                            : "suspended"
                        )
                      }
                    >
                      {status === "pending" ||
                      status === "suspended" ||
                      status === "inactive"
                        ? "Activate"
                        : status === "active" && "Suspend"}
                    </Button>
                    {status !== "inactive" && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ mr: 2 }}
                        onClick={() => handleStatusDialogToggle("inactive")}
                      >
                        Deactivate
                      </Button>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
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
                              <InputAdornment position="start">
                                @
                              </InputAdornment>
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
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="vendor-view-organization-label">
                            Organization
                          </InputLabel>
                          <Select
                            label="Organization"
                            value={organizationId}
                            onChange={(e) => setOrganizationId(e.target.value)}
                            id="organization"
                            labelId="vendor-view-organization-label"
                          >
                            {organizations.edges.length > 0 ? (
                              organizations.edges.map((org, index) => {
                                const { id, name } = org.node;

                                return (
                                  <MenuItem key={index} value={id}>
                                    {name}
                                  </MenuItem>
                                );
                              })
                            ) : (
                              <Typography
                                sx={{
                                  padding: 3,
                                  color: "text.secondary",
                                  fontStyle: "italic",
                                }}
                              >
                                No organizations available
                              </Typography>
                            )}
                          </Select>
                        </FormControl>
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
        </Grid>

        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={handleStatusDialogToggle}
          open={openStatusDialog}
          sx={{
            "& .MuiDialogTitle-root + .MuiDialogContent-root": {
              pt: (theme) => `${theme.spacing(1.5)} !important`,
            },
          }}
        >
          <DialogTitle
            sx={{
              pt: 16,
              mx: "auto",
              textAlign: "center",
              fontSize: "1.625rem !important",
              textTransform: "capitalize",
            }}
          >
            Mark Vendor {statusText}
          </DialogTitle>
          <DialogContent sx={{ pb: 16, px: 18 }}>
            <Alert severity="warning" sx={{ maxWidth: "500px" }} icon={false}>
              <AlertTitle>Warning!</AlertTitle>
              You area about to mark the vendor as <strong>{statusText}</strong>
              . Please ensure you're absolutely certain before proceeding.
            </Alert>

            <Box sx={{ mt: 3 }}>
              <FormGroup
                sx={{
                  mb: 2,
                  alignItems: "center",
                  flexDirection: "column",
                  flexWrap: ["wrap", "nowrap"],
                }}
              >
                <Box
                  className="demo-space-x"
                  sx={{ "& > :last-child": { mr: "0 !important" } }}
                >
                  <Button
                    onClick={(e) => handleUpdateUserStatus(statusText)}
                    variant="contained"
                    color={
                      statusText === "pending" || statusText === "suspended"
                        ? "warning"
                        : statusText === "active"
                        ? "success"
                        : "error"
                    }
                  >
                    Mark {statusText}
                  </Button>
                  <Button
                    type="reset"
                    size="large"
                    variant="outlined"
                    color="error"
                    onClick={() => handleStatusDialogToggle("")}
                  >
                    Close
                  </Button>
                </Box>
              </FormGroup>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return null;
  }
};

export default VendorViewLeft;
