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
  addVendor,
  editVendor,
  fetchVendors,
} from "@src/store/apps/vendor/vendor";
import { fetchOrganizations } from "@src/store/apps/vendor/organization";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";

// ** Others
import toast from "react-hot-toast";

interface SidebarVendorType {
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

const SidebarVendor = (props: SidebarVendorType) => {
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
  const [organization, setOrganization] = useState<any>();
  const [organizationId, setOrganizationId] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { vendors } = useSelector((state: RootState) => state.vendors);
  const { organizations } = useSelector(
    (state: RootState) => state.organizations
  );

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
    setOrganization("");
    setOrganizationId("");
  };

  const setUpdateVendorData = () => {
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
    setOrganization(data.organization);
  };

  useEffect(() => {
    resetData();

    dispatch(fetchOrganizations({ first: 100 }));
    dispatch(fetchVendors({ first: 20 }));

    type === "Update" && setUpdateVendorData();
  }, [dispatch, type]);

  const handleCreateVendor = async (e: any) => {
    e.preventDefault();

    if (
      vendors &&
      vendors.edges.some(
        (u: any) => u.node.email === email || u.node.username === username
      )
    ) {
      vendors &&
        vendors.edges.forEach((u: any) => {
          if (u.node.email === email) {
            toast.error("Email already exists!");
          }
          if (u.node.username === username) {
            toast.error("Username already exists!");
          }
        });
    } else {
      const vendorData = {
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
        addedOrganization: "No",
        organizationId,
      };

      const resultAction = await dispatch(addVendor({ ...vendorData }));

      if (addVendor.fulfilled.match(resultAction)) {
        // vendor will have a type signature of Vendor as we passed that as the Returned parameter in createAsyncThunk
        const vendor = resultAction.payload;
        const { createVendor }: any = vendor;

        toast.success(`Vendor ${createVendor.firstName} created successfully!`);

        // Clear local state
        resetData();
      } else {
        toast.error(`Error creating vendor: ${resultAction.error}`);
      }
      toggle("");
    }
  };

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

      // Clear local state
      resetData();
    } else {
      toast.error(`Error updating vendor: ${resultAction.error}`);
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
        <Typography variant="h6">{type} Vendor</Typography>
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
          <InputLabel id="vendor-view-country-label">Country</InputLabel>
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
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="vendor-view-organization-label">
            Organization
          </InputLabel>
          <Select
            label="Organization"
            value={organization}
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
              type === "Add" ? handleCreateVendor(e) : handleUpdateVendor(e);
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

export default SidebarVendor;
