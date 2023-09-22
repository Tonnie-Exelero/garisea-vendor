// ** React Imports
import { useState } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icon Imports
import Icon from "src/@core/components/icon";
import { Tooltip } from "@mui/material";

interface Props {
  handleNext: () => void;
  handleAddPersonalInfo: (val: any) => void;
}

const StepAccountDetails = (props: Props) => {
  const { handleNext, handleAddPersonalInfo } = props;

  // ** States
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [storeLink, setStoreLink] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const personalInfo = {
    firstName,
    lastName,
    username,
    email,
    phone: "+254" + phone,
    storeLink,
    address,
    city,
    country: "Kenya",
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Account Information</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Enter Your Account Details
        </Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
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
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
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
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                ),
              }}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
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
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="phone"
              aria-label="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              sx={{ mb: 4 }}
              label="Phone"
              placeholder="711 222 333"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">KE (+254)</InputAdornment>
                ),
              }}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="storeLink"
              aria-label="storeLink"
              value={storeLink}
              onChange={(e) => setStoreLink(e.target.value)}
              type="text"
              sx={{ mb: 4 }}
              label="Unique Garisea Link"
              placeholder="e.g. gariseacars"
              InputProps={{
                endAdornment: (
                  <Tooltip
                    title={
                      "This will be your permanent Garisea store url. You cannot change it later."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <InputAdornment position="end">
                      <Icon
                        icon="material-symbols:error"
                        fontSize={20}
                        color="blue"
                      />
                    </InputAdornment>
                  </Tooltip>
                ),
              }}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="address"
              aria-label="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              sx={{ mb: 4 }}
              label="Address"
              placeholder="e.g. 123 Center Ln., Garisea Mall, Ngong Rd"
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
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
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              disabled
              variant="contained"
              startIcon={<Icon icon="bx:chevron-left" fontSize={20} />}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleAddPersonalInfo(personalInfo);
                handleNext();
              }}
              endIcon={<Icon icon="bx:chevron-right" fontSize={20} />}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StepAccountDetails;
