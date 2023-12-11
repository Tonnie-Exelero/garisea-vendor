// ** React Imports
import { useState } from "react";

// ** Next Imports
import Image from "next/image";

// ** MUI Imports
import {
  Badge,
  Box,
  CircularProgress,
  Direction,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

// ** Custom Components Imports
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";

// ** Icon Imports
import Icon from "@components/icon";

// ** Third Party Components
import clsx from "clsx";
import { useKeenSlider } from "keen-slider/react";

// ** API/Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import {
  editVehicleImages,
  editVehicleThumbnail,
} from "@src/store/apps/vendor/vehicle/single";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** Others
import toast from "react-hot-toast";
import FileUploader from "./FileUploader";
import { removeFile } from "@core/utils/file-manager";

const SwiperControls: React.FC<any> = ({
  direction,
  vehicle,
  handleImagesDialogToggle,
}: {
  direction: Direction;
  vehicle: VehicleNode;
  handleImagesDialogToggle: () => void;
}) => {
  const { id, images, thumbnail } = vehicle;

  // ** States
  const [vImages, setVImages] = useState<string[]>(
    images ? images.split(",") : []
  );
  const [vThumbnail, setVThumbnail] = useState<string>(thumbnail);
  const [deleting, setDeleting] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [openAddSection, setOpenAddSection] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: direction === "rtl",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const ImagesDropZone = () => {
    return (
      <DropzoneWrapper>
        <Grid container spacing={5} className="match-height">
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography variant="h5" sx={{ mb: 4 }}>
                Add Images
              </Typography>
              <FileUploader
                vehicle={vehicle}
                sx={{ width: "100%" }}
                handleImagesDialogToggle={handleImagesDialogToggle}
              />
            </Box>
          </Grid>
        </Grid>
      </DropzoneWrapper>
    );
  };

  const handleAddImagesSection = () => setOpenAddSection(!openAddSection);

  const handleDeleteImage = async (url: string) => {
    setDeleting("ongoing");

    const newResp = await removeFile(url);

    if (vImages.some((image) => image === newResp.url)) {
      const updatedList = vImages.filter((image) => image !== newResp.url);

      setVImages(updatedList);
      handleUpdateVehicleImageDelete(updatedList);
    }

    setDeleting("complete");
  };

  const handleUpdateThumbnail = async (image: string) => {
    setVThumbnail(image);

    const vehicleData = {
      id,
      thumbnail: image,
    };

    const resultAction: any = await dispatch(
      editVehicleThumbnail({ ...vehicleData })
    );

    if (editVehicleThumbnail.fulfilled.match(resultAction)) {
      toast.success(`Thumbnail updated successfully!`);
    } else {
      toast.error(`Error updating thumbnail image: ${resultAction.error}`);
    }
  };

  const handleUpdateVehicleImageDelete = async (images: string[]) => {
    const vehicleData = {
      id,
      images: [...new Set(images)].toString(),
    };

    const resultAction: any = await dispatch(
      editVehicleImages({ ...vehicleData })
    );

    if (editVehicleImages.fulfilled.match(resultAction)) {
      images.length === 0 && handleImagesDialogToggle();
      toast.success(`Image deleted successfully!`);
    } else {
      toast.error(`Error deleting image: ${resultAction.error}`);
    }
  };

  return (
    <>
      {vImages.length > 0 ? (
        <>
          <Box className="navigation-wrapper">
            <Box ref={sliderRef} className="keen-slider">
              {vImages.map((image, index) => (
                <Box
                  key={index}
                  className="keen-slider__slide"
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="Close">
                    <IconButton
                      onClick={handleImagesDialogToggle}
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: -10,
                      }}
                    >
                      <Icon fontSize={30} icon="bx:x" />
                    </IconButton>
                  </Tooltip>

                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={800}
                    height={600}
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />

                  <Tooltip title="Set image as thumbnail" placement="top">
                    <IconButton
                      onClick={() => handleUpdateThumbnail(image)}
                      color="info"
                      sx={{
                        position: "absolute",
                        bottom: 100,
                        right: -14,
                      }}
                    >
                      <Icon
                        fontSize={40}
                        icon={
                          image === vThumbnail
                            ? "bx:checkbox-checked"
                            : "bx:checkbox"
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add more images" placement="top">
                    <IconButton
                      onClick={handleAddImagesSection}
                      color="success"
                      sx={{
                        position: "absolute",
                        bottom: 50,
                        right: -10,
                      }}
                    >
                      <Icon fontSize={30} icon="bx:bxs-image-add" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete image">
                    <IconButton
                      onClick={() => handleDeleteImage(image)}
                      color="error"
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        right: -10,
                      }}
                    >
                      {deleting === "ongoing" && (
                        <Box
                          sx={{
                            mr: 4,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress
                            size="1.5rem"
                            sx={{ mr: 2, color: "lightgrey" }}
                          />
                          <Typography variant="h6" sx={{ color: "lightgrey" }}>
                            Deleting image...
                          </Typography>
                        </Box>
                      )}
                      <Icon fontSize={30} icon="bx:trash" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            </Box>
            {loaded && instanceRef.current && (
              <>
                <Icon
                  icon="bx:chevron-left"
                  className={clsx("arrow arrow-left", {
                    "arrow-disabled": currentSlide === 0,
                  })}
                  color={currentSlide !== 0 ? "black" : ""}
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                />

                <Icon
                  icon="bx:chevron-right"
                  className={clsx("arrow arrow-right", {
                    "arrow-disabled":
                      currentSlide ===
                      instanceRef.current.track.details.slides.length - 1,
                  })}
                  color={
                    currentSlide !==
                    instanceRef.current.track.details.slides.length - 1
                      ? "black"
                      : ""
                  }
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                />
              </>
            )}
          </Box>
          {loaded && instanceRef.current && (
            <Box className="swiper-dots">
              {[
                ...Array(
                  instanceRef.current.track.details.slides.length
                ).keys(),
              ].map((idx) => {
                return (
                  <Badge
                    key={idx}
                    variant="dot"
                    component="div"
                    className={clsx({
                      active: currentSlide === idx,
                    })}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                  ></Badge>
                );
              })}
            </Box>
          )}
          {openAddSection && (
            <>
              <Divider sx={{ mt: 10 }} />
              <Box sx={{ position: "relative", mt: 6 }}>
                <Tooltip title="Close add section">
                  <IconButton
                    onClick={handleAddImagesSection}
                    color="inherit"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <Icon fontSize={30} icon="bx:x" />
                  </IconButton>
                </Tooltip>
                <ImagesDropZone />
              </Box>
            </>
          )}
        </>
      ) : (
        <ImagesDropZone />
      )}
    </>
  );
};

export default SwiperControls;
