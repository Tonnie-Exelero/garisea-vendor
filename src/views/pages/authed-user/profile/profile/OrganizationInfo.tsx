// ** React Imports
import { ChangeEvent, ElementType, useContext, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

// ** Custom Components
import CustomAvatar from "@components/mui/avatar";

// ** Icon Imports
import Icon from "@components/icon";

// ** API
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import {
  editOrganization,
  editLogo,
  editCertificate,
  editKRAPin,
} from "@src/store/apps/vendor/organization/single";

// ** Others
import { AbilityContext } from "src/layouts/components/acl/Can";
import OrganizationEditDialog from "./dialogs/OrganizationEditDialog";
import toast from "react-hot-toast";
import PDFViewer from "@src/views/components/pdf-viewer";
import { uploadFile, removeFile } from "@core/utils/file-manager";

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

interface Props {
  vendor: any;
}

const OrganizationInfo = ({ vendor }: Props) => {
  const {
    id,
    name,
    nicename,
    email,
    phone,
    address,
    address2,
    city,
    country,
    logo,
    certificate,
    kraPin,
  } = vendor.organization;

  // ** States
  const [oName, setOName] = useState<string>(name);
  const [oNicename, setONicename] = useState<string>(nicename);
  const [oEmail, setOEmail] = useState<string>(email);
  const [oPhone, setOPhone] = useState<string>(phone);
  const [oAddress, setOAddress] = useState<string>(address);
  const [oAddress2, setOAddress2] = useState<string>(address2);
  const [oCity, setOCity] = useState<string>(city);
  const [oCountry, setOCountry] = useState<string>(country);
  const [oLogo, setOLogo] = useState<string>(logo);
  const [oCertificate, setOCertificate] = useState<string>(certificate);
  const [oKraPin, setOKraPin] = useState<string>(kraPin);
  const [inputValue, setInputValue] = useState<string>("");
  const [certInputValue, setCertInputValue] = useState<string>("");
  const [pinInputValue, setPinInputValue] = useState<string>("");
  const [fileToView, setFileToView] = useState<string>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openFileView, setOpenFileView] = useState<boolean>(false);
  const [uploadingLogo, setUploadingLogo] = useState<boolean>(false);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [uploadingPinFile, setUploadingPinFile] = useState<boolean>(false);

  // ** Hooks
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch<AppDispatch>();

  const orgData = {
    id,
    name: oName,
    nicename: oNicename,
    email: oEmail,
    phone: oPhone,
    address: oAddress,
    address2: oAddress2,
    city: oCity,
    country: oCountry,
  };

  // Handle Edit dialog
  const handleEditDialogToggle = () => setOpenEdit(!openEdit);
  const handleOpenFileView = (val: string) => {
    setFileToView(val);
    setOpenFileView(!openFileView);
  };

  const handleInputLogoChange = async (file: ChangeEvent) => {
    setUploadingLogo(true);

    const newFile = await uploadFile(file);

    newFile && handleUpdateLogo(newFile.url);
    newFile && setOLogo(newFile.url);

    // Then remove the previous image from server.
    logo && removeFile(logo);

    setUploadingLogo(false);
  };

  const handleUpdateLogo = async (imageUrl: string) => {
    const organizationData = {
      id,
      logo: imageUrl,
    };

    const resultAction: any = await dispatch(editLogo({ ...organizationData }));

    if (editLogo.fulfilled.match(resultAction)) {
      toast.success(`Logo updated successfully!`);
    } else {
      toast.error(`Error updating logo: ${resultAction.error}`);
    }
  };

  const handleInputCertificateChange = async (file: ChangeEvent) => {
    setUploadingFile(true);

    const newFile = await uploadFile(file);

    newFile && handleUpdateCertificate(newFile.url);
    newFile && setOCertificate(newFile.url);

    // Then remove the previous image from server.
    certificate && removeFile(certificate);

    setUploadingFile(false);
  };

  const handleUpdateCertificate = async (certUrl: string) => {
    const organizationData = {
      id,
      certificate: certUrl,
    };

    const resultAction: any = await dispatch(
      editCertificate({ ...organizationData })
    );

    if (editCertificate.fulfilled.match(resultAction)) {
      toast.success(`Certificate updated successfully!`);
    } else {
      toast.error(`Error updating certificate: ${resultAction.error}`);
    }
  };

  const handleInputKRAPinChange = async (file: ChangeEvent) => {
    setUploadingPinFile(true);

    const newFile = await uploadFile(file);

    newFile && handleUpdateKRAPin(newFile.url);
    newFile && setOKraPin(newFile.url);

    // Then remove the previous image from server.
    certificate && removeFile(certificate);

    setUploadingPinFile(false);
  };

  const handleUpdateKRAPin = async (pinUrl: string) => {
    const organizationData = {
      id,
      kraPin: pinUrl,
    };

    const resultAction: any = await dispatch(
      editKRAPin({ ...organizationData })
    );

    if (editKRAPin.fulfilled.match(resultAction)) {
      toast.success(`KRA Pin updated successfully!`);
    } else {
      toast.error(`Error updating KRA Pin: ${resultAction.error}`);
    }
  };

  const handleUpdateOrganization = async (val: any) => {
    // Update local state
    setOName(val.name);
    setONicename(val.nicename);
    setOEmail(val.email);
    setOPhone(val.phone);
    setOAddress(val.address);
    setOAddress2(val.address2);
    setOCity(val.city);
    setOCountry(val.country);

    const organizationData = {
      id: val.id,
      name: val.name,
      nicename: val.nicename,
      email: val.email,
      phone: val.phone,
      address: val.address,
      address2: val.address2,
      city: val.city,
      country: val.country,
    };

    const resultAction: any = await dispatch(
      editOrganization({ ...organizationData })
    );

    if (editOrganization.fulfilled.match(resultAction)) {
      toast.success(`Organization information updated successfully!`);
    } else {
      toast.error(`Error updating organization: ${resultAction.error}`);
    }

    handleEditDialogToggle();
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Organization Information"
            action={
              ability?.can("update", "organizations") && (
                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  onClick={handleEditDialogToggle}
                >
                  Edit
                </Button>
              )
            }
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={6}>
                <TableContainer>
                  <Table size="small" sx={{ width: "95%" }}>
                    <TableBody
                      sx={{
                        "& .MuiTableCell-root": {
                          pt: 2,
                          pb: 2,
                          border: 0,
                          pl: "0 !important",
                          pr: "0 !important",
                          "&:first-of-type": {
                            width: 150,
                          },
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Name:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {oName && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {oName}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Nicename:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {oNicename && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {oNicename}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Email:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {oEmail && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {oEmail}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Phone:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {oPhone && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {oPhone}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Address:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ color: "text.secondary" }}>
                            {oAddress}, {oAddress2}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            City:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {oCity && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {oCity}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Country:
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {oCountry && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {oCountry}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={6}>
                <TableContainer>
                  <Table size="small" sx={{ width: "95%" }}>
                    <TableBody
                      sx={{
                        "& .MuiTableCell-root": {
                          pt: 2,
                          pb: 2,
                          border: 0,
                          pl: "0 !important",
                          pr: "0 !important",
                          "&:first-of-type": {
                            width: 150,
                          },
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Logo:
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {oLogo && (
                            <CustomAvatar
                              src={oLogo}
                              variant="rounded"
                              alt={"Logo"}
                              sx={{
                                width: 75,
                                height: 60,
                                marginInlineEnd: (theme) => theme.spacing(6.25),
                              }}
                            />
                          )}
                          {ability?.can("update", "organizations") && (
                            <div>
                              <Box sx={{ display: "flex" }}>
                                <Tooltip
                                  title="Allowed PNG/JPEG/SVG. Max size of 2MB."
                                  placement="top"
                                >
                                  <ButtonStyled
                                    // @ts-ignore
                                    component={"label"}
                                    variant="contained"
                                    htmlFor="upload-logo"
                                  >
                                    Upload
                                    <input
                                      hidden
                                      type="file"
                                      value={inputValue}
                                      accept="image/png, image/jpeg, image/svg"
                                      onChange={handleInputLogoChange}
                                      id="upload-logo"
                                    />
                                  </ButtonStyled>
                                </Tooltip>

                                {uploadingLogo && (
                                  <Box
                                    sx={{
                                      ml: 4,
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    <CircularProgress
                                      size="1.2rem"
                                      sx={{ mr: 2 }}
                                    />
                                  </Box>
                                )}
                              </Box>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            Certificate:
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {oCertificate && (
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => handleOpenFileView(oCertificate)}
                              sx={{
                                mr: (theme) => theme.spacing(6.25),
                              }}
                            >
                              View
                            </Button>
                          )}
                          {vendor.status !== "active" &&
                            ability?.can("update", "organizations") && (
                              <div>
                                <Box sx={{ display: "flex" }}>
                                  <Tooltip
                                    title="Your Business/Company Registration Certificate. Max size of 2MB."
                                    placement="top"
                                  >
                                    <ButtonStyled
                                      // @ts-ignore
                                      component={"label"}
                                      variant="contained"
                                      htmlFor="upload-certificate"
                                    >
                                      Upload
                                      <input
                                        hidden
                                        type="file"
                                        value={certInputValue}
                                        accept="application/pdf"
                                        onChange={handleInputCertificateChange}
                                        id="upload-certificate"
                                      />
                                    </ButtonStyled>
                                  </Tooltip>

                                  {uploadingFile && (
                                    <Box
                                      sx={{
                                        ml: 4,
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CircularProgress
                                        size="1.2rem"
                                        sx={{ mr: 2 }}
                                      />
                                    </Box>
                                  )}
                                </Box>
                              </div>
                            )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.53,
                              whiteSpace: "nowrap",
                              color: "text.secondary",
                            }}
                          >
                            KRA Pin:
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {oKraPin && (
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => handleOpenFileView(oKraPin)}
                              sx={{
                                mr: (theme) => theme.spacing(6.25),
                              }}
                            >
                              View
                            </Button>
                          )}
                          {vendor.status !== "active" &&
                            ability?.can("update", "organizations") && (
                              <div>
                                <Box sx={{ display: "flex" }}>
                                  <Tooltip
                                    title="Your Business/Company KRA Pin. Max size of 2MB."
                                    placement="top"
                                  >
                                    <ButtonStyled
                                      // @ts-ignore
                                      component={"label"}
                                      variant="contained"
                                      htmlFor="upload-kra-pin"
                                    >
                                      Upload
                                      <input
                                        hidden
                                        type="file"
                                        value={pinInputValue}
                                        accept="application/pdf"
                                        onChange={handleInputKRAPinChange}
                                        id="upload-kra-pin"
                                      />
                                    </ButtonStyled>
                                  </Tooltip>

                                  {uploadingPinFile && (
                                    <Box
                                      sx={{
                                        ml: 4,
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CircularProgress
                                        size="1.2rem"
                                        sx={{ mr: 2 }}
                                      />
                                    </Box>
                                  )}
                                </Box>
                              </div>
                            )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Dialog
          scroll="body"
          maxWidth="md"
          open={openEdit}
          onClose={handleEditDialogToggle}
          aria-labelledby="organization-view-edit"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              p: [2, 10],
            },
            "& .MuiDialogTitle-root + .MuiDialogContent-root": {
              pt: (theme) => `${theme.spacing(2)} !important`,
            },
          }}
          aria-describedby="organization-view-edit-description"
        >
          <OrganizationEditDialog
            organization={orgData}
            handleEditDialogToggle={handleEditDialogToggle}
            handleUpdateOrganization={handleUpdateOrganization}
          />
        </Dialog>

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
                onClick={() => handleOpenFileView("")}
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
            <PDFViewer url={fileToView} />
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default OrganizationInfo;
