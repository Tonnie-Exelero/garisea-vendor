// ** React Imports
import { ChangeEvent, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Others
import { uploadFile } from "@core/utils/file-manager";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Tooltip,
} from "@mui/material";

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

interface Props {
  handlePrev: () => void;
  handleCreateVendor: (val: any) => void;
}

const StepOrganizationInfo = (props: Props) => {
  const { handlePrev, handleCreateVendor } = props;

  // ** States
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [certificate, setCertificate] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [certInputValue, setCertInputValue] = useState<string>("");
  const [uploadingLogo, setUploadingLogo] = useState<boolean>(false);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const handleInputLogoChange = async (file: ChangeEvent) => {
    setUploadingLogo(true);

    const newFile = await uploadFile(file);

    newFile && setLogo(newFile.url);

    setUploadingLogo(false);
  };

  const handleInputCertificateChange = async (file: ChangeEvent) => {
    setUploadingFile(true);

    const newFile = await uploadFile(file);

    newFile && setCertificate(newFile.url);

    setUploadingFile(false);
  };

  const organizationData = {
    name,
    email,
    phone: "+254" + phone,
    address,
    address2,
    city,
    country: "Kenya",
    logo,
    certificate,
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Organization Information</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Enter Your Organization Information
        </Typography>
      </Box>

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
            label="Organization Name"
            placeholder="Garisea Cars Ltd"
            required
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
            placeholder="e.g. garisea@email.com"
            required
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
            placeholder="711 222 333"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">KE (+254)</InputAdornment>
              ),
            }}
            required
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
            placeholder="e.g. 123 Center Plaza"
            required
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
            placeholder="e.g. Simba Court, Ngong Rd"
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
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            {logo ? (
              <Typography sx={{ color: "green", textAlign: "center" }}>
                Uploaded!
              </Typography>
            ) : (
              <>
                {uploadingLogo ? (
                  <Box
                    sx={{
                      ml: 4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size="1.5rem" sx={{ mr: 2 }} />
                  </Box>
                ) : (
                  <Tooltip
                    title="Allowed PNG/JPEG/SVG. Max size of 2MB."
                    placement="top"
                  >
                    <Button
                      // @ts-ignore
                      component={"label"}
                      variant="contained"
                      htmlFor="upload-logo"
                    >
                      Logo
                      <input
                        hidden
                        type="file"
                        value={inputValue}
                        accept="image/png, image/jpeg, image/svg"
                        onChange={handleInputLogoChange}
                        id="upload-logo"
                      />
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            {certificate ? (
              <Typography sx={{ color: "green", textAlign: "center" }}>
                Uploaded!
              </Typography>
            ) : (
              <>
                {uploadingFile ? (
                  <Box
                    sx={{
                      ml: 4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size="1.5rem" sx={{ mr: 2 }} />
                  </Box>
                ) : (
                  <Tooltip
                    title="Allowed PDF only. Max size of 2MB."
                    placement="top"
                  >
                    <Button
                      // @ts-ignore
                      component={"label"}
                      variant="contained"
                      color="info"
                      htmlFor="upload-certificate"
                    >
                      Registration Certificate
                      <input
                        hidden
                        type="file"
                        value={certInputValue}
                        accept="application/pdf"
                        onChange={handleInputCertificateChange}
                        id="upload-certificate"
                      />
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
              />
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.875rem",
                color: "text.secondary",
              },
            }}
            label={
              <>
                <span>I agree to </span>
                <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
                  privacy policy & terms
                </LinkStyled>
              </>
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handlePrev}
              startIcon={<Icon icon="bx:chevron-left" fontSize={20} />}
            >
              Previous
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                handleCreateVendor(organizationData);
              }}
              disabled={
                !termsChecked ||
                name === "" ||
                email === "" ||
                phone === "" ||
                address === "" ||
                city === ""
              }
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StepOrganizationInfo;
