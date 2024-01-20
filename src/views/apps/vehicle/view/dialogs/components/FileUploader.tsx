// ** React Imports
import { Fragment, useState } from "react";

// ** Next Imports
import Image from "next/image";

// ** MUI Imports
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Components
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

// ** API/Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { editVehicleImages } from "@src/store/apps/vendor/vehicle/single";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";
import { uploadFileOfFiles } from "@core/utils/file-manager";

// ** Others
import { InView } from "react-intersection-observer";

// Styled component for the upload image inside the dropzone area
const Img = styled("img")(({ theme }) => ({
  width: 300,
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(15.75),
  },
  [theme.breakpoints.down("md")]: {
    width: 250,
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    width: 200,
  },
}));

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

interface FileUploaderProps {
  vehicle: VehicleNode;
  sx: any;
  handleImagesDialogToggle: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const {
    handleImagesDialogToggle,
    vehicle: { id, images },
  } = props;
  const hasImages = images !== "" && images !== null;

  // ** State
  const [files, setFiles] = useState<File[]>([]);
  const [vImages, setVImages] = useState<string[]>(
    hasImages ? images.split(",") : []
  );
  const [uploadFuncCalled, setUploadFuncCalled] = useState<boolean>(false);

  let imagesArray: any[] = [];

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: {
      "image/*": [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".webp",
        ".avif",
        ".svg",
        ".heic",
      ],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
    },
    onDropRejected: () => {
      toast.error("You can upload upto 10 files.", {
        duration: 5000,
      });
    },
  });
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  const handleUploadFiles = async () => {
    setUploadFuncCalled(true);

    const type = authedVendor.organization.logo ? "image" : "name";
    const name = authedVendor.organization.nicename
      ? authedVendor.organization.nicename
      : authedVendor.organization.name;
    const vendorIdentity: any = authedVendor.organization.logo
      ? authedVendor.organization.logo
      : name;

    for (const file of files) {
      const newBlob = await uploadFileOfFiles(file, type, vendorIdentity);

      imagesArray.push(newBlob);
    }

    // Create image url array.
    let imageUrls: string[] = imagesArray.map(({ url }) => url);

    // If vImages arrays isn't empty, add new image urls without duplication.
    const newArray =
      vImages.length === 0 ? imageUrls : [...vImages, ...imageUrls];

    // Set images without duplication.
    setVImages([...new Set(newArray)]);

    // Push images to image handler as string.
    handleUpdateVehicleImages([...new Set(newArray)]);
  };

  const handleUpdateVehicleImages = async (images: string[]) => {
    const vehicleData = {
      id,
      images: images.toString(),
    };

    const resultAction: any = await dispatch(
      editVehicleImages({ ...vehicleData })
    );

    if (editVehicleImages.fulfilled.match(resultAction)) {
      handleImagesDialogToggle();
      toast.success(`Images updated successfully!`);
    } else {
      toast.error(`Error updating images: ${resultAction.error}`);
    }
  };

  const ImagesToUpload = () => {
    return (
      <InView>
        {({ inView, ref }) => {
          inView && !uploadFuncCalled && handleUploadFiles();

          return (
            <Box
              ref={ref}
              sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", mt: 6 }}
            >
              {fileList}
            </Box>
          );
        }}
      </InView>
    );
  };

  const fileList = files.map((file: File, index) => {
    return (
      <Box sx={{ position: "relative" }} key={index}>
        <Image
          src={URL.createObjectURL(file as any)}
          alt={file.name}
          width={150}
          height={150}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: ".4rem",
            opacity: 0.6,
          }}
        />

        <IconButton
          color="success"
          sx={{
            position: "absolute",
            top: "30%",
            right: "30%",
            opacity: 1,
          }}
        >
          <Icon fontSize={50} icon="line-md:loading-twotone-loop" />
        </IconButton>
      </Box>
    );
  });

  return (
    <Fragment>
      {files.length === 0 && (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "row"],
              alignItems: "center",
            }}
          >
            <Img
              alt="Upload img"
              src={`/images/misc/upload-${theme.palette.mode}.png`}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: ["center", "center", "inherit"],
              }}
            >
              <HeadingTypography variant="h5">
                Drop images here or click to upload.
              </HeadingTypography>

              <Typography color="textSecondary" sx={{ mb: 2 }}>
                Allowed types: *.jpeg, *.jpg, *.png, *.gif, *.webp, *.avif,
                *.heic.
              </Typography>
              <Typography color="textSecondary" sx={{ mb: 2 }}>
                Upload upto <strong>10 images</strong>.
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Images may not exceed <strong>5MB</strong>.
              </Typography>
            </Box>
          </Box>
        </div>
      )}

      {files.length ? (
        <Fragment>
          {files.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <ImagesToUpload />
            </Box>
          )}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default FileUploader;
