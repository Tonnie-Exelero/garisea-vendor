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
import UserSuspendDialog from "src/views/apps/user/view/UserSuspendDialog";
import UserSubscriptionDialog from "src/views/apps/user/view/UserSubscriptionDialog";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";

// ** Types
import { ThemeColor } from "@core/layouts/types";
import { UserNode } from "src/types/apps/userTypes";

// ** Utils Import
import { getInitials } from "@utils/get-initials";

// ** Others
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { fetchRoles } from "@src/store/apps/admin/role";
import { editUser, editStatus } from "@src/store/apps/admin/user/single";
import toast from "react-hot-toast";
import FileUploader from "./dialog/FileUploader";
import { AbilityContext } from "src/layouts/components/acl/Can";

interface ColorsType {
  [key: string]: ThemeColor;
}

const roleColors: ColorsType = {
  superadmin: "error",
  editor: "info",
  author: "warning",
  maintainer: "success",
  subscriber: "primary",
};

const statusColors: ColorsType = {
  active: "success",
  pending: "warning",
  suspended: "warning",
  inactive: "secondary",
};

interface UserViewLeftProps {
  user: UserNode;
}

const UserViewLeft: React.FC<UserViewLeftProps> = ({ user }) => {
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
  const [role, setRole] = useState<any>();
  const [roleId, setRoleId] = useState<string>("");
  const [avatarColor, setAvatarColor] = useState<string | undefined>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] =
    useState<boolean>(false);
  const [imageDialog, setImageDialog] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [openStatusDialog, setOpenStatusDialog] = useState<boolean>(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);
  const { roles } = useSelector((state: RootState) => state.roles);

  // Handle Edit dialog
  const handleImagesDialogToggle = () => setImageDialog(!imageDialog);
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const handleStatusDialogToggle = (text: string) => {
    setStatusText(text);

    setOpenStatusDialog(!openStatusDialog);
  };

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
    setRole(user.role);
    setRoleId(user.role.id);
    setAvatarColor(user.avatarColor);
  };

  useEffect(() => {
    dispatch(fetchRoles({ first: 100 }));

    setUpdateUserData();
  }, [dispatch, user]);

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
      roleId,
    };

    const resultAction = await dispatch(editUser({ ...userData }));

    if (editUser.fulfilled.match(resultAction)) {
      // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
      const user = resultAction.payload;
      const { updateUser }: any = user;

      toast.success(`User ${updateUser.firstName} updated successfully!`);
    } else {
      toast.error(`Error updating user: ${resultAction.error}`);
    }

    handleEditClose();
  };

  const handleUpdateUserStatus = async (val: string) => {
    setStatus(val);

    const userData = {
      id,
      status: val,
    };

    const resultAction: any = await dispatch(editStatus({ ...userData }));

    if (editStatus.fulfilled.match(resultAction)) {
      toast.success(`User marked as ${statusText}!`);
    } else {
      toast.error(`Error marking as ${status}: ${resultAction.error}`);
    }

    handleStatusDialogToggle("");
  };

  if (user) {
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
                    onClick={handleImagesDialogToggle}
                    sx={{
                      width: 110,
                      height: 110,
                      mb: 6,
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.6,
                      },
                    }}
                  />
                ) : (
                  <CustomAvatar
                    skin="light"
                    variant="rounded"
                    color={avatarColor as ThemeColor}
                    onClick={handleImagesDialogToggle}
                    sx={{
                      width: 110,
                      height: 110,
                      fontWeight: 600,
                      mb: 6,
                      fontSize: "3rem",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.6,
                      },
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
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={role ? role.name : "Editor"}
                  sx={{ fontWeight: 500 }}
                  color={roleColors[role ? role.slug : "editor"]}
                />
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
                      Role:
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        textTransform: "capitalize",
                      }}
                    >
                      {role ? role.name : "Editor"}
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

              {ability?.can("update", "users") && (
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
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={() => handleStatusDialogToggle("inactive")}
                    >
                      Deactivate
                    </Button>
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
                aria-labelledby="user-view-edit"
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
                aria-describedby="user-view-edit-description"
              >
                <DialogTitle
                  id="user-view-edit"
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
                  Edit User Information
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
                    id="user-view-edit-description"
                    sx={{ textAlign: "center", mb: 7 }}
                  >
                    Updating user details will receive a privacy audit.
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
                          <InputLabel id="user-view-status-label">
                            Status
                          </InputLabel>
                          <Select
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            id="status"
                            labelId="user-view-status-label"
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="suspended">Suspended</MenuItem>
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
                          <InputLabel id="user-view-country-label">
                            Country
                          </InputLabel>
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
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <InputLabel id="role-select">Select Role</InputLabel>
                          <Select
                            fullWidth
                            value={roleId}
                            id="role"
                            label="Select Role"
                            labelId="role-select"
                            onChange={(e) => {
                              setRoleId(e.target.value);

                              const selectedRole: any = roles.edges
                                .filter(
                                  (role: any) => role.node.id === e.target.value
                                )
                                .pop();

                              setRole(selectedRole.node);
                            }}
                            inputProps={{ placeholder: "Select Role" }}
                          >
                            {roles.edges.map((role, index) => {
                              const { id, name } = role.node;

                              return (
                                <MenuItem key={index} value={id}>
                                  {name}
                                </MenuItem>
                              );
                            })}
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
                    onClick={(e) => handleUpdateUser(e)}
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

              <UserSuspendDialog
                open={suspendDialogOpen}
                setOpen={setSuspendDialogOpen}
              />
              <UserSubscriptionDialog
                open={subscriptionDialogOpen}
                setOpen={setSubscriptionDialogOpen}
              />
            </Card>
          </Grid>
        </Grid>
        <Dialog
          scroll="body"
          maxWidth="lg"
          open={imageDialog}
          onClose={handleImagesDialogToggle}
          aria-labelledby="vehicle-images-view-edit"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              p: [2, 10],
            },
            "& .MuiDialogTitle-root + .MuiDialogContent-root": {
              pt: (theme) => `${theme.spacing(2)} !important`,
            },
          }}
          aria-describedby="vehicle-images-view-edit-description"
        >
          <DialogContent sx={{ pb: 16, px: 18 }}>
            <DropzoneWrapper>
              <Grid container spacing={5} className="match-height">
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 4 }}>
                      Update Image
                    </Typography>
                    <FileUploader
                      user={user}
                      sx={{ width: "100%" }}
                      handleImagesDialogToggle={handleImagesDialogToggle}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DropzoneWrapper>
          </DialogContent>
        </Dialog>

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
            Mark User {statusText}
          </DialogTitle>
          <DialogContent sx={{ pb: 16, px: 18 }}>
            <Alert severity="warning" sx={{ maxWidth: "500px" }} icon={false}>
              <AlertTitle>Warning!</AlertTitle>
              You area about to mark the user as <strong>{statusText}</strong>.
              Please ensure you're absolutely certain before proceeding.
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

export default UserViewLeft;
