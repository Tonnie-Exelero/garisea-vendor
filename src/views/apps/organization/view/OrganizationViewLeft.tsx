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
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

// ** Custom Components
import CustomAvatar from "@components/mui/avatar";
import OrganizationSuspendDialog from "src/views/apps/organization/view/OrganizationSuspendDialog";
import OrganizationSubscriptionDialog from "src/views/apps/organization/view/OrganizationSubscriptionDialog";

// ** Icon Imports
import Icon from "@components/icon";

// ** Types
import { ThemeColor } from "@core/layouts/types";
import { OrganizationNode } from "src/types/apps/organizationTypes";

// ** Utils Import
import { getInitials } from "@utils/get-initials";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editOrganization } from "@src/store/apps/vendor/organization";
import toast from "react-hot-toast";
import { AbilityContext } from "src/layouts/components/acl/Can";
import PDFViewer from "@src/views/components/pdf-viewer";

interface ColorsType {
  [key: string]: ThemeColor;
}

const statusColors: ColorsType = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

interface OrganizationViewLeftProps {
  organization: OrganizationNode;
}

const OrganizationViewLeft: React.FC<OrganizationViewLeftProps> = ({
  organization,
}) => {
  // ** States
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [certificate, setCertificate] = useState<string>("");
  const [openFileView, setOpenFileView] = useState<boolean>(false);
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
  const handleOpenFileView = () => setOpenFileView(!openFileView);

  const setUpdateOrganizationData = () => {
    setId(organization.id);
    setName(organization.name);
    setEmail(organization.email);
    setPhone(organization.phone);
    setAddress(organization.address);
    setAddress2(organization.address2);
    setCity(organization.city);
    setCountry(organization.country);
    setLogo(organization.logo);
    setCertificate(organization.certificate);
  };

  useEffect(() => {
    setUpdateOrganizationData();
  }, [dispatch, organization]);

  const handleUpdateOrganization = async (e: any) => {
    e.preventDefault();

    const organizationData = {
      id,
      name,
      email,
      phone,
      address,
      address2,
      city,
      country,
      logo,
      certificate,
    };

    const resultAction = await dispatch(
      editOrganization({ ...organizationData })
    );

    if (editOrganization.fulfilled.match(resultAction)) {
      // organization will have a type signature of Organization as we passed that as the Returned parameter in createAsyncThunk
      const organization = resultAction.payload;
      const { updateOrganization }: any = organization;

      toast.success(
        `Organization ${updateOrganization.firstName} updated successfully!`
      );
    } else {
      toast.error(`Error updating organization: ${resultAction.error}`);
    }

    handleEditClose();
  };

  if (organization) {
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
              {logo ? (
                <CustomAvatar
                  src={logo}
                  variant="rounded"
                  alt={name}
                  sx={{ width: 110, height: 110, mb: 6 }}
                />
              ) : (
                <CustomAvatar
                  skin="light"
                  variant="rounded"
                  color={"primary"}
                  sx={{
                    width: 110,
                    height: 110,
                    fontWeight: 600,
                    mb: 6,
                    fontSize: "3rem",
                  }}
                >
                  {getInitials(name)}
                </CustomAvatar>
              )}
              <Typography
                variant="h5"
                sx={{ mb: 2.5, fontSize: "1.375rem !important" }}
              >
                {name}
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
                    Name:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {name}
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
                    Contact:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Certificate:
                  </Typography>

                  {certificate && (
                    <Button
                      variant="contained"
                      color="info"
                      onClick={handleOpenFileView}
                      sx={{
                        mr: (theme) => theme.spacing(6.25),
                      }}
                    >
                      View
                    </Button>
                  )}
                </Box>
                <Box sx={{ display: "flex", mb: 4 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                  >
                    Address:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {address}
                    {address2 && `, ${address2}`}
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
            {ability?.can("update", "organizations") && (
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
              aria-labelledby="organization-view-edit"
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
              aria-describedby="organization-view-edit-description"
            >
              <DialogTitle
                id="organization-view-edit"
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
                Edit Organization Information
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
                  id="organization-view-edit-description"
                  sx={{ textAlign: "center", mb: 7 }}
                >
                  Updating organization details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoFocus
                        fullWidth
                        id="name"
                        aria-label="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        sx={{ mb: 4 }}
                        label="Name"
                        placeholder="johndoe"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="email"
                        aria-label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        sx={{ mb: 4 }}
                        label="Email"
                        placeholder="johndoe@example.com"
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
                        placeholder="e.g. 123 Center Ln., Apartment 34"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="address2"
                        aria-label="address2"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        type="text"
                        sx={{ mb: 4 }}
                        label="Address Line 2"
                        placeholder="e.g. Plymouth, MN 55441"
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
                        <InputLabel id="organization-view-country-label">
                          Country
                        </InputLabel>
                        <Select
                          label="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          id="country"
                          labelId="organization-view-country-label"
                        >
                          <MenuItem value="Kenya">Kenya</MenuItem>
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
                  onClick={(e) => handleUpdateOrganization(e)}
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

            <OrganizationSuspendDialog
              open={suspendDialogOpen}
              setOpen={setSuspendDialogOpen}
            />
            <OrganizationSubscriptionDialog
              open={subscriptionDialogOpen}
              setOpen={setSubscriptionDialogOpen}
            />
          </Card>

          <Dialog
            scroll="body"
            maxWidth="lg"
            open={openFileView}
            onClose={handleOpenFileView}
            aria-labelledby="organization-file-view-edit"
            sx={{
              "& .MuiPaper-root": {
                width: "100%",
                p: [2, 10],
              },
              "& .MuiDialogTitle-root + .MuiDialogContent-root": {
                pt: (theme) => `${theme.spacing(2)} !important`,
              },
            }}
            aria-describedby="organization-file-view-edit-description"
          >
            <DialogContent
              sx={{
                position: "relative",
                overflowX: "hidden",
                "& .react-pdf__Page__canvas": {
                  width: "100% !important",
                  height: "auto !important",
                },
              }}
            >
              <Tooltip title="Close">
                <IconButton
                  onClick={handleOpenFileView}
                  color="inherit"
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                  }}
                >
                  <Icon fontSize={30} icon="bx:x" />
                </IconButton>
              </Tooltip>
              <PDFViewer url={certificate} />
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default OrganizationViewLeft;
