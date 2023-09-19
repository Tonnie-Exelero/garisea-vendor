// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import {
  Box,
  BoxProps,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Actions Imports
import { addUser, editUser, fetchUsers } from "src/store/apps/admin/user";
import { fetchRoles } from "@src/store/apps/admin/role";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { UserRowType } from "src/types/apps/userTypes";

// ** Email Imports
import EmailVerify from "@src/emails/EmailVerify";

// ** Others
import toast from "react-hot-toast";
import { baseUrl } from "@src/configs/baseUrl";
import { createToken } from "@src/configs/jwt";
import { sendEmail } from "@src/configs/email";
import { APP_SECRET } from "@graphql/utils/auth";

interface SidebarUserType {
  open: boolean;
  toggle: (type: string) => void;
  type: string;
  data: any;
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3, 4),
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
}));

const SidebarUser = (props: SidebarUserType) => {
  // ** Props
  const { open, toggle, type, data } = props;

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
  const [roleId, setRoleId] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const { roles } = useSelector((state: RootState) => state.roles);

  const resetData = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setImage("");
    setLanguage("");
    setStatus("");
    setAddress("");
    setCity("");
    setCountry("");
    setRoleId("");
  };

  const setUpdateUserData = () => {
    setId(data.id);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setUsername(data.username);
    setEmail(data.email);
    setPhone(data.phone);
    setImage(data.image);
    setLanguage(data.language);
    setStatus(data.status);
    setAddress(data.address);
    setCity(data.city);
    setCountry(data.country);
    setRoleId(data.role.id);
  };

  useEffect(() => {
    resetData();

    dispatch(fetchUsers({ first: 20 }));
    dispatch(fetchRoles({ first: 20 }));

    type === "Update" && setUpdateUserData();
  }, [dispatch, type]);

  const handleCreateUser = async (e: any) => {
    e.preventDefault();

    if (
      users &&
      users.edges.some(
        (u: any) => u.node.email === email || u.node.username === username
      )
    ) {
      users &&
        users.edges.forEach((u: any) => {
          if (u.node.email === email) {
            toast.error("Email already exists!");
          }
          if (u.node.username === username) {
            toast.error("Username already exists!");
          }
        });
    } else {
      const userData = {
        firstName,
        lastName,
        username,
        email,
        password: "",
        phone,
        image: "",
        language: "english",
        status: "pending",
        address,
        city,
        country,
        emailVerified: "No",
        roleId,
      };

      const resultAction = await dispatch(addUser({ ...userData }));

      if (addUser.fulfilled.match(resultAction)) {
        // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
        const user = resultAction.payload;
        const { createUser }: any = user;

        toast.success(`User ${createUser.firstName} created successfully!`);

        // ** Send verification email.
        const newSecret = APP_SECRET + createUser.email;

        const tokenPayload = {
          data: {
            id: createUser.id,
            email: createUser.email,
            firstName: createUser.firstName,
          },
          secret: newSecret.toString(),
          expirationTime: "1d",
        };

        const tokenObject = await createToken(tokenPayload);

        // Verification link.
        const url = `${baseUrl}/verify-email?token=${tokenObject.token}`;

        const payload = {
          name: createUser.firstName,
          to: createUser.email,
          subject: "Welcome to Garisea",
          template: EmailVerify(url, createUser.firstName),
        };

        sendEmail({ ...payload });
        // ** End Send verification email.

        // Clear local state
        resetData();
      } else {
        toast.error(`Error creating user: ${resultAction.error}`);
      }
      toggle("");
    }
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
      roleId,
    };

    const resultAction = await dispatch(editUser({ ...userData }));

    if (editUser.fulfilled.match(resultAction)) {
      // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
      const user = resultAction.payload;
      const { updateUser }: any = user;

      toast.success(`User ${updateUser.firstName} updated successfully!`);

      // Clear local state
      resetData();
    } else {
      toast.error(`Error updating user: ${resultAction.error}`);
    }
    toggle("");
  };

  const handleClose = () => {
    toggle("");
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant="h6">{type} User</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ color: "text.primary" }}
        >
          <Icon icon="bx:x" fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
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
        <TextField
          fullWidth
          id="username"
          aria-label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          sx={{ mb: 4 }}
          label="Username"
          placeholder="johndoe"
        />
        <TextField
          fullWidth
          id="email"
          aria-label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          sx={{ mb: 4 }}
          label="Email"
          placeholder="e.g. johndoe@email.com"
        />
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
        <TextField
          fullWidth
          id="country"
          aria-label="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          type="text"
          sx={{ mb: 4 }}
          label="Country"
          placeholder="e.g. Kenya"
        />
        <FormControl fullWidth sx={{ mb: 6 }}>
          <InputLabel id="role-select">Select Role</InputLabel>
          <Select
            fullWidth
            value={roleId}
            id="role"
            label="Select Role"
            labelId="role-select"
            onChange={(e) => setRoleId(e.target.value)}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            size="large"
            onClick={(e) => {
              type === "Add" ? handleCreateUser(e) : handleUpdateUser(e);
            }}
            variant="contained"
            sx={{ mr: 3 }}
          >
            {type === "Add" ? "Add" : "Update"} User
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarUser;
