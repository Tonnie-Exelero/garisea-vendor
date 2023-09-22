// ** React Imports
import { ChangeEvent, ElementType, useContext, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
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
  editLogo,
  editCertificate,
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
    email,
    phone,
    address,
    address2,
    city,
    country,
    logo,
    certificate,
  } = vendor.organization;

  // ** States
  const [oLogo, setOLogo] = useState<string>(logo);
  const [oCertificate, setOCertificate] = useState<string>(certificate);
  const [inputValue, setInputValue] = useState<string>("");
  const [certInputValue, setCertInputValue] = useState<string>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openFileView, setOpenFileView] = useState<boolean>(false);
  const [uploadingLogo, setUploadingLogo] = useState<boolean>(false);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);

  // ** Hooks
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch<AppDispatch>();

  // Handle Edit dialog
  const handleEditDialogToggle = () => setOpenEdit(!openEdit);
  const handleOpenFileView = () => setOpenFileView(!openFileView);

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Organization"
            action={
              ability?.can("update", "organizations") && (
                <Button
                  size="small"
                  variant="contained"
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
                          {name && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {name}
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
                          {email && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {email}
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
                          {phone && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {phone}
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
                          {address ||
                            (address2 && (
                              <Typography sx={{ color: "text.secondary" }}>
                                {address}, {address2}
                              </Typography>
                            ))}
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
                          {city && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {city}
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
                          {country && (
                            <Typography sx={{ color: "text.secondary" }}>
                              {country}
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
                                width: 60,
                                height: 60,
                                marginInlineEnd: (theme) => theme.spacing(6.25),
                              }}
                            />
                          )}
                          {ability?.can("update", "organizations") && (
                            <div>
                              <Box sx={{ display: "flex" }}>
                                <Tooltip title="Allowed PNG/JPEG/SVG. Max size of 2MB.">
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
                              onClick={handleOpenFileView}
                              sx={{
                                mr: (theme) => theme.spacing(6.25),
                              }}
                            >
                              View
                            </Button>
                          )}
                          {ability?.can("update", "organizations") && (
                            <div>
                              <Box sx={{ display: "flex" }}>
                                <Tooltip title="Allowed PDF only. Max size of 2MB.">
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
            organization={vendor.organization}
            handleEditDialogToggle={handleEditDialogToggle}
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
            <PDFViewer url={oCertificate} />
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default OrganizationInfo;
