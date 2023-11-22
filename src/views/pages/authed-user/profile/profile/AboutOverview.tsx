// ** React Imports
import { ChangeEvent, ElementType, useState } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** API
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editIdentification } from "@src/store/apps/vendor/vendor/single";

// ** Others
import CustomChip from "src/@core/components/mui/chip";
import { ThemeColor } from "@core/layouts/types";
import PDFViewer from "@src/views/components/pdf-viewer";
import { uploadFile, removeFile } from "@core/utils/file-manager";
import toast from "react-hot-toast";

interface ColorsType {
  [key: string]: ThemeColor;
}

const statusColors: ColorsType = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
  suspended: "warning",
};

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

interface AboutOverviewProps {
  user: any;
}
const AboutOverview: React.FC<AboutOverviewProps> = ({ user }) => {
  const {
    id,
    username,
    email,
    phone,
    language,
    status,
    storeLink,
    identification,
    vendorVerified,
  } = user;

  // ** State
  const [vIdentification, setVIdentification] =
    useState<string>(identification);
  const [docInputValue, setDocInputValue] = useState<string>("");
  const [openFileView, setOpenFileView] = useState<boolean>(false);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenFileView = () => setOpenFileView(!openFileView);

  const handleInputDocChange = async (file: ChangeEvent) => {
    setUploadingFile(true);

    const newFile = await uploadFile(file);

    newFile && handleUpdateIdentification(newFile.url);
    newFile && setVIdentification(newFile.url);

    // Then remove the previous file from server.
    identification && removeFile(identification);

    setUploadingFile(false);
  };

  const handleUpdateIdentification = async (docUrl: string) => {
    const vendorData = {
      id,
      identification: docUrl,
    };

    const resultAction: any = await dispatch(
      editIdentification({ ...vendorData })
    );

    if (editIdentification.fulfilled.match(resultAction)) {
      toast.success(`Identification updated successfully!`);
    } else {
      toast.error(`Error updating identification: ${resultAction.error}`);
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
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
                  Store Link:
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {storeLink}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
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
                  sx={{ fontWeight: 500, mr: 2 }}
                  color={statusColors[status]}
                />
                {status === "pending" && (
                  <Tooltip
                    title={
                      "Your account information is being verified by Garisea. Once completed successfully, your account will be activated and vehicle listings will show up on Garisea."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {status === "suspended" && (
                  <Tooltip
                    title={
                      "Your account has been suspended and vehicle listings will not show up on Garisea. Please contact support to resolve."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {status === "inactive" && (
                  <Tooltip
                    title={
                      "Your account has been deactivated and vehicle listings will not show up on Garisea. Please contact support to resolve."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Verified:
                </Typography>
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={
                    vendorVerified === "yes" ? "Verified" : "Not Yet Verified"
                  }
                  sx={{ fontWeight: 500, mr: 2 }}
                  color={vendorVerified === "yes" ? "success" : "warning"}
                />
                {vendorVerified === "yes" && (
                  <Tooltip
                    title={
                      "Your physical address and other personal/organization information has been verified by Garisea."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {vendorVerified === "no" && (
                  <Tooltip
                    title={
                      "Your physical address and other personal/organization information is not yet verified by Garisea. Once done successfully, you will receive a Verified badge on your Garisea shop and vehicle listings."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
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
                  sx={{ color: "text.secondary", textTransform: "capitalize" }}
                >
                  {language}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Identification:
                </Typography>
                {vIdentification && (
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
                {vendorVerified === "no" && (
                  <div>
                    <Box sx={{ display: "flex" }}>
                      <Tooltip
                        title="Scan of your ID or Passport document in PDF. Max size of 2MB."
                        placement="top"
                      >
                        <ButtonStyled
                          // @ts-ignore
                          component={"label"}
                          variant="contained"
                          htmlFor="upload-identification"
                        >
                          Upload
                          <input
                            hidden
                            type="file"
                            value={docInputValue}
                            accept="application/pdf"
                            onChange={handleInputDocChange}
                            id="upload-identification"
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
                          <CircularProgress size="1.2rem" sx={{ mr: 2 }} />
                        </Box>
                      )}
                    </Box>
                  </div>
                )}
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={Link}
              href={"/account/settings/account"}
              variant="contained"
              color="info"
              size="small"
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
          </CardActions>
        </Card>

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
            <PDFViewer url={vIdentification} />
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default AboutOverview;
