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

interface FileUploaderRestrictionsProps {
  handleImages: (images: string) => void;
  sx: any;
}

const FileUploaderRestrictions: React.FC<FileUploaderRestrictionsProps> = (
  props
) => {
  const { handleImages } = props;

  // ** State
  const [uploading, setUploading] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  let imagesArray: any[] = [];

  // ** Hooks
  const theme = useTheme();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    maxSize: 3000000,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
    },
    onDropRejected: () => {
      toast.error("You can upload upto 10 files & maximum size of 3 MB/file.", {
        duration: 2000,
      });
    },
  });

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
    for (const file of files) {
      const newBlob = await uploadFileOfFiles(file);

      imagesArray.push(newBlob);
    }

    // Create image url array.
    let imageUrls: string[] = imagesArray.map(({ url }) => url);

    // Set images without duplication.
    // Push images to image handler as string.
    handleImages([...new Set(imageUrls)].toString());

    setUploading("complete");
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
              Upto 10 files and max size of 3 MB/file.
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              The <strong>first</strong> image is the <b>thumbnail</b> image.
            </Typography>
            <Typography variant="body1" color="textPrimary">
              <strong>PRO TIP:</strong>{" "}
              <i>
                Use aspect-ratio of <strong>16:9</strong>, and center the image
                focal point, for maximum visibility on all devices.
              </i>
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

export default FileUploaderRestrictions;
