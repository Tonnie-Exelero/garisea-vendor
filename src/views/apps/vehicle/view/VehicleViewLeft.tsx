// ** React Imports
import { useContext, useState } from "react";

// ** MUI Imports
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";

// ** Custom Components
import CustomChip from "@components/mui/chip";
import CustomAvatar from "@components/mui/avatar";

// ** Types
import { ThemeColor } from "@core/layouts/types";
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** Utils Import
import { getInitials } from "@utils/get-initials";

// ** React Share
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import {
  editVehicleReserved,
  editVehicleSold,
} from "@src/store/apps/vendor/vehicle/single";
import toast from "react-hot-toast";
import BasicEditDialog from "./dialogs/BasicEditDialog";
import ImagesControls from "./dialogs/ImagesDialog";
import { currency } from "../config";
import { AbilityContext } from "src/layouts/components/acl/Can";
import { mainSiteUrl } from "@src/configs/baseUrl";

interface ColorsType {
  [key: string]: ThemeColor;
}

const dataColors: ColorsType = {
  error: "error",
  info: "info",
  warning: "warning",
  success: "success",
  primary: "primary",
};

interface VehicleViewLeftProps {
  vehicle: VehicleNode;
}

const VehicleViewLeft: React.FC<VehicleViewLeftProps> = ({ vehicle }) => {
  const {
    id,
    entryNo,
    brand,
    model,
    trim,
    yearOfManufacture,
    yearOfFirstRegistration,
    registered,
    registrationNo,
    condition,
    mileage,
    mileageMetric,
    listingPrice,
    discountedPrice,
    images,
    thumbnail,
    status,
    viewingLocation,
    vehicleOriginCountry,
    reserved,
    sold,
  } = vehicle;

  const year = yearOfFirstRegistration
    ? yearOfFirstRegistration
    : yearOfManufacture;

  // ** States
  const [vReserved, setVReserved] = useState<string>(reserved);
  const [vSold, setVSold] = useState<string>(sold);
  const [markText, setMarkText] = useState<string>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openImages, setOpenImages] = useState<boolean>(false);
  const [openMarkDialog, setOpenMarkDialog] = useState<boolean>(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  // Handle Edit dialog
  const handleImagesDialogToggle = () => setOpenImages(!openImages);
  const handleEditDialogToggle = () => setOpenEdit(!openEdit);
  const handleMarkDialogToggle = (text: string) => {
    setMarkText(text);

    setOpenMarkDialog(!openMarkDialog);
  };

  const handleUpdateReserved = async (val: string) => {
    setVReserved(val);

    const vehicleData = {
      id,
      reserved: val,
    };

    const resultAction: any = await dispatch(
      editVehicleReserved({ ...vehicleData })
    );

    if (editVehicleReserved.fulfilled.match(resultAction)) {
      toast.success(`Vehicle marked as ${markText}!`);
    } else {
      toast.error(`Error reserving ${markText}: ${resultAction.error}`);
    }

    handleMarkDialogToggle("");
  };

  const handleUpdateSold = async (val: string) => {
    setVSold(val);

    const vehicleData = {
      id,
      sold: val,
    };

    const resultAction: any = await dispatch(
      editVehicleSold({ ...vehicleData })
    );

    if (editVehicleSold.fulfilled.match(resultAction)) {
      toast.success(`Vehicle marked as ${markText}!`);
    } else {
      toast.error(`Error marking as ${markText}: ${resultAction.error}`);
    }

    handleMarkDialogToggle("");
  };

  if (vehicle) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent
                sx={{
                  pt: 12,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {thumbnail ? (
                  <CustomAvatar
                    src={thumbnail}
                    variant="rounded"
                    alt={brand.name + " " + model.name}
                    onClick={handleImagesDialogToggle}
                    sx={{
                      width: 300,
                      height: 210,
                      mb: 6,
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.6,
                      },
                    }}
                  />
                ) : (
                  <CustomAvatar
                    skin="light"
                    variant="rounded"
                    color={"primary"}
                    onClick={handleImagesDialogToggle}
                    sx={{
                      width: 300,
                      height: 210,
                      fontWeight: 600,
                      mb: 6,
                      fontSize: "3rem",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.6,
                      },
                    }}
                  >
                    {getInitials(brand.name + " " + model.name)}
                  </CustomAvatar>
                )}
                <Typography
                  variant="h5"
                  sx={{ mb: 2.5, fontSize: "1.375rem !important" }}
                >
                  {year + " " + brand.name + " " + model.name + " " + trim}
                  {condition && (
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={
                        condition === "brand-new"
                          ? "Brand New"
                          : condition === "foreign-used"
                          ? "Foreign Used"
                          : condition === "locally-used" && "Locally Used"
                      }
                      sx={{ ml: 2, fontWeight: 500 }}
                      color={
                        dataColors[
                          condition === "brand-new"
                            ? "info"
                            : condition === "foreign-used"
                            ? "success"
                            : condition === "locally-used"
                            ? "warning"
                            : "default"
                        ]
                      }
                    />
                  )}
                </Typography>
              </CardContent>

              <CardContent>
                {status === "active" && (
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <TwitterShareButton
                      title={`Check out this awesome vehicle from ${
                        vehicle?.vendor?.organization?.nicename
                          ? vehicle?.vendor?.organization?.nicename
                          : vehicle?.vendor?.organization?.name
                      } shop at Garisea. Follow @Gari_sea for more...`}
                      url={`${mainSiteUrl}/${vehicle.vendor.storeLink}/${vehicle.slug}`}
                      hashtags={[
                        "Garisea",
                        `${
                          vehicle?.vendor?.organization?.nicename
                            ? vehicle?.vendor?.organization?.nicename
                            : vehicle?.vendor?.organization?.name
                        }`,
                      ]}
                      related={[
                        "cars",
                        "vehicles",
                        "automotive",
                        "auto dealers",
                      ]}
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <FacebookShareButton
                      quote={`Check out this awesome vehicle from ${
                        vehicle?.vendor?.organization?.nicename
                          ? vehicle?.vendor?.organization?.nicename
                          : vehicle?.vendor?.organization?.name
                      } shop at Garisea. Follow @Garisea for more...`}
                      url={`${mainSiteUrl}/${vehicle.vendor.storeLink}/${vehicle.slug}`}
                      hashtag={`#Garisea #${
                        vehicle?.vendor?.organization?.nicename
                          ? vehicle?.vendor?.organization?.nicename
                          : vehicle?.vendor?.organization?.name
                      }`}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      title={`Check out this awesome vehicle from ${
                        vehicle?.vendor?.organization?.nicename
                          ? vehicle?.vendor?.organization?.nicename
                          : vehicle?.vendor?.organization?.name
                      } shop at Garisea. Follow @Garisea on socials for more...`}
                      url={`${mainSiteUrl}/${vehicle.vendor.storeLink}/${vehicle.slug}`}
                      separator=" "
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TelegramShareButton
                      title={`Check out this awesome vehicle from ${
                        vehicle?.vendor?.organization?.nicename
                          ? vehicle?.vendor?.organization?.nicename
                          : vehicle?.vendor?.organization?.name
                      } shop at Garisea. Follow @Garisea on socials for more...`}
                      url={`${mainSiteUrl}/${vehicle.vendor.storeLink}/${vehicle.slug}`}
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <LinkedinShareButton
                      title={`Check out this awesome vehicle from ${
                        vehicle?.vendor?.organization?.nicename
                          ? vehicle?.vendor?.organization?.nicename
                          : vehicle?.vendor?.organization?.name
                      } shop at Garisea. Follow @Garisea on socials for more...`}
                      url={`${mainSiteUrl}/${vehicle.vendor.storeLink}/${vehicle.slug}`}
                      source={`${mainSiteUrl}`}
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </Box>
                )}
                <Typography variant="h6">Basic Details</Typography>
                <Divider
                  sx={{ mt: (theme) => `${theme.spacing(1)} !important` }}
                />
                <Box sx={{ pt: 4, pb: 2 }}>
                  <Box sx={{ display: "flex", mb: 4 }}>
                    <Typography
                      sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                    >
                      Entry No.:
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {entryNo}
                    </Typography>
                  </Box>
                  {registered && (
                    <Box sx={{ display: "flex", mb: 4 }}>
                      <Typography
                        sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                      >
                        Registered:
                      </Typography>
                      <CustomChip
                        rounded
                        skin="light"
                        size="small"
                        label={registered === "Yes" ? "Yes" : "No"}
                        sx={{ fontWeight: 500 }}
                        color={
                          dataColors[registered === "Yes" ? "success" : "error"]
                        }
                      />
                    </Box>
                  )}
                  {registered === "Yes" && registrationNo && (
                    <Box sx={{ display: "flex", mb: 4 }}>
                      <Typography
                        sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                      >
                        Registration:
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {registrationNo}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <Typography
                      sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                    >
                      Price ({currency}):
                    </Typography>
                    {listingPrice !== 0 && discountedPrice ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ textDecoration: "line-through" }}
                        >
                          {new Intl.NumberFormat().format(listingPrice)}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary" }}
                        >
                          {" " +
                            new Intl.NumberFormat().format(discountedPrice)}
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {listingPrice !== 0 &&
                        (discountedPrice === 0 ||
                          discountedPrice === null ||
                          !discountedPrice) ? (
                          <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                          >
                            {new Intl.NumberFormat().format(listingPrice)}
                          </Typography>
                        ) : (
                          <>
                            {listingPrice === 0 &&
                              (discountedPrice === 0 ||
                                discountedPrice === null ||
                                !discountedPrice) && (
                                <Typography
                                  variant="body2"
                                  sx={{ color: "text.secondary" }}
                                >
                                  Set price
                                </Typography>
                              )}
                          </>
                        )}
                      </>
                    )}
                  </Box>
                  {mileage && (
                    <Box sx={{ display: "flex", mb: 4 }}>
                      <Typography
                        sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                      >
                        Mileage:
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {mileage + " " + mileageMetric}
                      </Typography>
                    </Box>
                  )}
                  {viewingLocation && (
                    <Box sx={{ display: "flex", mb: 4 }}>
                      <Typography
                        sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                      >
                        Viewing Location:
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {viewingLocation}
                      </Typography>
                    </Box>
                  )}
                  {vehicleOriginCountry && (
                    <Box sx={{ display: "flex", mb: 4 }}>
                      <Typography
                        sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                      >
                        Country of Origin:
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {vehicleOriginCountry}
                      </Typography>
                    </Box>
                  )}
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
                      label={
                        status === "active"
                          ? "Active"
                          : status === "pending"
                          ? "In Review"
                          : "Declined"
                      }
                      sx={{ mr: 2, fontWeight: 500 }}
                      color={
                        dataColors[
                          status === "active"
                            ? "success"
                            : status === "pending"
                            ? "warning"
                            : "error"
                        ]
                      }
                    />
                  </Box>
                  <Box sx={{ display: "flex", mb: 4 }}>
                    <Typography
                      sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                    >
                      Reserved:
                    </Typography>
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={reserved === "Yes" ? "Yes" : "No"}
                      sx={{ fontWeight: 500 }}
                      color={
                        dataColors[reserved === "Yes" ? "success" : "error"]
                      }
                    />
                  </Box>
                  <Box sx={{ display: "flex", mb: 4 }}>
                    <Typography
                      sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                    >
                      Sold:
                    </Typography>
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={sold === "Yes" ? "Yes" : "No"}
                      sx={{ fontWeight: 500 }}
                      color={dataColors[sold === "Yes" ? "success" : "error"]}
                    />
                  </Box>
                </Box>
              </CardContent>

              {ability?.can("update", "vehicles") && (
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ display: "flex", gap: 4 }}>
                    <Button
                      variant="contained"
                      color={reserved === "Yes" ? "secondary" : "success"}
                      size="small"
                      onClick={() =>
                        handleMarkDialogToggle(
                          reserved === "Yes" ? "Not Reserved" : "Reserved"
                        )
                      }
                    >
                      {reserved === "Yes" ? "Not Reserved" : "Reserved"}
                    </Button>
                    <Button
                      variant="contained"
                      color={sold === "Yes" ? "secondary" : "error"}
                      size="small"
                      onClick={() =>
                        handleMarkDialogToggle(
                          sold === "Yes" ? "Not Sold" : "Sold"
                        )
                      }
                    >
                      {sold === "Yes" ? "Not Sold" : "Sold"}
                    </Button>
                  </Box>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    sx={{ mr: 2 }}
                    onClick={handleEditDialogToggle}
                  >
                    Edit
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        </Grid>

        <Dialog
          scroll="body"
          maxWidth="lg"
          open={openImages}
          onClose={handleImagesDialogToggle}
          aria-labelledby="vehicle-images-view-edit"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              p: [2, 10],
            },
            "& .MuiDialogTitle-root + .MuiDialogContent-root": {
              pt: (theme) => `${theme.spacing(2)} !important`,
            },
          }}
          aria-describedby="vehicle-images-view-edit-description"
        >
          <DialogContent sx={{ pb: 4, px: 6 }}>
            <ImagesControls
              vehicle={vehicle}
              handleImagesDialogToggle={handleImagesDialogToggle}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          scroll="body"
          maxWidth="md"
          open={openEdit}
          onClose={handleEditDialogToggle}
          aria-labelledby="vehicle-view-edit"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              p: [2, 10],
            },
            "& .MuiDialogTitle-root + .MuiDialogContent-root": {
              pt: (theme) => `${theme.spacing(2)} !important`,
            },
          }}
          aria-describedby="vehicle-view-edit-description"
        >
          <BasicEditDialog
            vehicle={vehicle}
            handleEditDialogToggle={handleEditDialogToggle}
          />
        </Dialog>

        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={handleMarkDialogToggle}
          open={openMarkDialog}
          sx={{
            "& .MuiDialogTitle-root + .MuiDialogContent-root": {
              pt: (theme) => `${theme.spacing(1.5)} !important`,
            },
          }}
        >
          <DialogTitle
            sx={{
              pt: 16,
              mx: "auto",
              textAlign: "center",
              fontSize: "1.625rem !important",
            }}
          >
            Mark Vehicle {markText}
          </DialogTitle>
          <DialogContent sx={{ pb: 16, px: 18 }}>
            <Alert severity="warning" sx={{ maxWidth: "500px" }} icon={false}>
              <AlertTitle>Warning!</AlertTitle>
              You area about to mark the vehicle as <strong>{markText}</strong>.
              Please ensure you're absolutely certain before proceeding.
            </Alert>

            <Box sx={{ mt: 3 }}>
              <FormGroup
                sx={{
                  mb: 2,
                  alignItems: "center",
                  flexDirection: "column",
                  flexWrap: ["wrap", "nowrap"],
                }}
              >
                <Box
                  className="demo-space-x"
                  sx={{ "& > :last-child": { mr: "0 !important" } }}
                >
                  <Button
                    onClick={(e) =>
                      markText === "Reserved" || markText === "Not Reserved"
                        ? handleUpdateReserved(
                            markText === "Reserved" ? "Yes" : "No"
                          )
                        : handleUpdateSold(markText === "Sold" ? "Yes" : "No")
                    }
                    variant="contained"
                    color={
                      markText === "Reserved" || markText === "Not Reserved"
                        ? "success"
                        : "info"
                    }
                  >
                    Mark {markText}
                  </Button>
                  <Button
                    type="reset"
                    size="large"
                    variant="outlined"
                    color="error"
                    onClick={() => handleMarkDialogToggle("")}
                  >
                    Close
                  </Button>
                </Box>
              </FormGroup>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return null;
  }
};

export default VehicleViewLeft;
