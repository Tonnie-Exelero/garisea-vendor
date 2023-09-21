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
  addOrganization,
  editOrganization,
  fetchOrganizations,
} from "@src/store/apps/vendor/organization";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";

// ** Others
import toast from "react-hot-toast";

interface SidebarOrganizationType {
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

const SidebarOrganization = (props: SidebarOrganizationType) => {
  // ** Props
  const { open, toggle, type, data } = props;

  // ** State
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

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { organizations } = useSelector(
    (state: RootState) => state.organizations
  );

  const resetData = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setAddress2("");
    setCity("");
    setCountry("");
    setLogo("");
    setCertificate("");
  };

  const setUpdateOrganizationData = () => {
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setPhone(data.phone);
    setAddress(data.address);
    setAddress2(data.address2);
    setCity(data.city);
    setCountry(data.country);
    setLogo(data.logo);
    setCertificate(data.certificate);
  };

  useEffect(() => {
    resetData();

    dispatch(fetchOrganizations({ first: 20 }));

    type === "Update" && setUpdateOrganizationData();
  }, [dispatch, type]);

  const handleCreateOrganization = async (e: any) => {
    e.preventDefault();

    if (
      organizations &&
      organizations.edges.some((u: any) => u.node.name === name)
    ) {
      organizations &&
        organizations.edges.forEach((u: any) => {
          if (u.node.name === name) {
            toast.error("Organization name already exists!");
          }
        });
    } else {
      const organizationData = {
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
        addOrganization({ ...organizationData })
      );

      if (addOrganization.fulfilled.match(resultAction)) {
        toast.success(`Organization  created successfully!`);

        // Clear local state
        resetData();
      } else {
        toast.error(`Error creating organization: ${resultAction.error}`);
      }
      toggle("");
    }
  };

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
      toast.success(`Organization  updated successfully!`);

      // Clear local state
      resetData();
    } else {
      toast.error(`Error updating organization: ${resultAction.error}`);
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
        <Typography variant="h6">{type} Organization</Typography>
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
          id="name"
          aria-label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          sx={{ mb: 4 }}
          label="Name"
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
          placeholder="e.g. 123 Center Ln., Apartment 34"
        />
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
                ? handleCreateOrganization(e)
                : handleUpdateOrganization(e);
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

export default SidebarOrganization;
