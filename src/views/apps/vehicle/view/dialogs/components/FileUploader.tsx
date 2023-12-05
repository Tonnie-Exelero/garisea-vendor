// ** React Imports
import { Fragment, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Components
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { CircularProgress } from "@mui/material";

// ** API/Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { editVehicleImages } from "@src/store/apps/vendor/vehicle/single";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";
import { uploadFileOfFiles } from "@core/utils/file-manager";

interface FileProp {
  name: string;
  type: string;
  size: number;
}

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
  const [uploading, setUploading] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [vImages, setVImages] = useState<string[]>(
    hasImages ? images.split(",") : []
  );

  let imagesArray: any[] = [];

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    maxSize: 5000000,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
    },
    onDropRejected: () => {
      toast.error("You can upload upto 10 files & maximum size of 5 MB/file.", {
        duration: 5000,
      });
    },
  });
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={URL.createObjectURL(file as any)}
        />
      );
    } else {
      return <Icon icon="bx:file" />;
    }
  };

  const handleUploadFiles = async () => {
    setUploading("ongoing");
    const logo = authedVendor.organization.logo || "";

    for (const file of files) {
      const newBlob = await uploadFileOfFiles(file, logo);

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

    setUploading("complete");
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

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter(
      (i: FileProp) => i.name !== file.name
    );
    setFiles([...filtered]);
  };

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">{file.name}</Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon="bx:x" fontSize={20} />
      </IconButton>
    </ListItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
    setUploading("");
  };

  return (
    <Fragment>
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
              Drop files here or click to upload.
            </HeadingTypography>
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{ mb: 2, fontStyle: "italic", fontWeight: 600 }}
            >
              (Select all images at once. You can update them later.)
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Allowed types: *.jpeg, *.jpg, *.png, *.gif, *.webp, *.avif.
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Upto <strong>10 files</strong> and max size of{" "}
              <strong>5 MB/file</strong>.
            </Typography>
            <Typography color="textSecondary">
              The <strong>first</strong> image is the <b>main</b> image.
            </Typography>
          </Box>
        </Box>
      </div>

      {files.length ? (
        <Fragment>
          <List
            sx={{
              mb: 4,
            }}
          >
            {fileList}
          </List>
          <div>
            {uploading === "ongoing" && (
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CircularProgress size="1.5rem" sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Uploading...
                </Typography>
              </Box>
            )}
            {uploading === "complete" && (
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "green" }}>
                  Uploading completed successfully!
                </Typography>
              </Box>
            )}
          </div>
          <Box
            className="buttons"
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Button
              color="error"
              variant="outlined"
              onClick={handleRemoveAllFiles}
            >
              Remove All
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleUploadFiles}
            >
              Upload Files
            </Button>
          </Box>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default FileUploader;
