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
import {
  addCustomer,
  editCustomer,
  fetchCustomers,
} from "@src/store/apps/frontend/customer";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { CustomerRowType } from "src/types/apps/customerTypes";

// ** Others
import toast from "react-hot-toast";

interface SidebarCustomerType {
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

const SidebarCustomer = (props: SidebarCustomerType) => {
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

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { customers } = useSelector((state: RootState) => state.customers);

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
  };

  const setUpdateCustomerData = () => {
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
  };

  useEffect(() => {
    resetData();

    dispatch(fetchCustomers({ first: 20 }));

    type === "Update" && setUpdateCustomerData();
  }, [dispatch, type]);

  const handleCreateCustomer = async (e: any) => {
    e.preventDefault();

    if (
      customers &&
      customers.edges.some(
        (u: any) => u.node.email === email || u.node.username === username
      )
    ) {
      customers &&
        customers.edges.forEach((u: any) => {
          if (u.node.email === email) {
            toast.error("Email already exists!");
          }
          if (u.node.username === username) {
            toast.error("Username already exists!");
          }
        });
    } else {
      const customerData = {
        firstName,
        lastName,
        username,
        email,
        password: "",
        phone,
        image: "",
        language: "english",
        status: "active",
        address,
        city,
        country,
        emailVerified: "No",
      };

      const resultAction = await dispatch(addCustomer({ ...customerData }));

      if (addCustomer.fulfilled.match(resultAction)) {
        // customer will have a type signature of Customer as we passed that as the Returned parameter in createAsyncThunk
        const customer = resultAction.payload;
        const { createCustomer }: any = customer;

        toast.success(
          `Customer ${createCustomer.firstName} created successfully!`
        );

        // Clear local state
        resetData();
      } else {
        toast.error(`Error creating customer: ${resultAction.error}`);
      }
      toggle("");
    }
  };

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

      // Clear local state
      resetData();
    } else {
      toast.error(`Error updating customer: ${resultAction.error}`);
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
        <Typography variant="h6">{type} Customer</Typography>
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
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="customer-view-country-label">Country</InputLabel>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            onClick={(e) => {
              type === "Add"
                ? handleCreateCustomer(e)
                : handleUpdateCustomer(e);
            }}
            variant="contained"
            sx={{ mr: 3 }}
          >
            {type === "Add" ? "Create" : "Update"}
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

export default SidebarCustomer;
