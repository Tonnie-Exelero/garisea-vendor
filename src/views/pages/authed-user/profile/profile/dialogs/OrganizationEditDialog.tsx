// ** React Imports
import { useState } from "react";

// ** MUI Imports
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// ** Types
import { OrganizationNode } from "src/types/apps/organizationTypes";

interface OrganizationEditDialogProps {
  organization: Partial<OrganizationNode>;
  handleEditDialogToggle: () => void;
  handleUpdateOrganization: (val: any) => void;
}

const OrganizationEditDialog: React.FC<OrganizationEditDialogProps> = ({
  organization,
  handleEditDialogToggle,
  handleUpdateOrganization,
}) => {
  const { id, name, email, phone, address, address2, city, country } =
    organization;

  // ** State
  const [oName, setOName] = useState<string>(name || "");
  const [oEmail, setOEmail] = useState<string>(email || "");
  const [oPhone, setOPhone] = useState<string>(phone || "");
  const [oAddress, setOAddress] = useState<string>(address || "");
  const [oAddress2, setOAddress2] = useState<string>(address2 || "");
  const [oCity, setOCity] = useState<string>(city || "");
  const [oCountry, setOCountry] = useState<string>(country || "");

  const handleEditOrganization = async (e: any) => {
    e.preventDefault();

    const organizationData = {
      id,
      name: oName,
      email: oEmail,
      phone: oPhone,
      address: oAddress,
      address2: oAddress2,
      city: oCity,
      country: oCountry,
    };

    handleUpdateOrganization(organizationData);
  };

  return (
    <>
      <DialogTitle
        id="organization-info-edit"
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
        Edit Organization
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
          id="organization-info-edit-description"
          sx={{ textAlign: "center", mb: 7 }}
        >
          Updating organization information.
        </DialogContentText>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                fullWidth
                id="name"
                aria-label="name"
                value={oName}
                onChange={(e) => setOName(e.target.value)}
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
                value={oEmail}
                onChange={(e) => setOEmail(e.target.value)}
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
                value={oPhone}
                onChange={(e) => setOPhone(e.target.value)}
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
                value={oAddress}
                onChange={(e) => setOAddress(e.target.value)}
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
                value={oAddress2}
                onChange={(e) => setOAddress2(e.target.value)}
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
                value={oCity}
                onChange={(e) => setOCity(e.target.value)}
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
                  value={oCountry}
                  onChange={(e) => setOCountry(e.target.value)}
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
          onClick={(e) => handleEditOrganization(e)}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleEditDialogToggle}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default OrganizationEditDialog;
