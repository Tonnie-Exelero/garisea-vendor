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
import { CircularProgress } from "@mui/material";

// ** Vercel Imports
import type { PutBlobResult } from "@vercel/blob";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Components
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

// ** API/Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { editImage } from "@src/store/apps/admin/user/single";

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
  user: any;
  sx: any;
  handleImagesDialogToggle: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const {
    handleImagesDialogToggle,
    user: { id },
  } = props;

  // ** State
  const [uploading, setUploading] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  let imagesArray: any[] = [];

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 3000000,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
    },
    onDropRejected: () => {
      toast.error("You can upload a maximum size of 3 MB.", {
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
      const response = await fetch(`/api/images/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;

      imagesArray.push(newBlob);
    }

    // Create image url array.
    let imageUrl: string[] = imagesArray.map(({ url }) => url);

    // Push images to image handler as string.
    handleUpdateUserImage(imageUrl.toString());

    setUploading("complete");
  };

  const handleUpdateUserImage = async (image: string) => {
    const userData = {
      id,
      image,
    };

    const resultAction: any = await dispatch(editImage({ ...userData }));

    if (editImage.fulfilled.match(resultAction)) {
      handleImagesDialogToggle();
      toast.success(`Image updated successfully!`);
    } else {
      toast.error(`Error updating image: ${resultAction.error}`);
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
              Drop image file here or click to upload.
            </HeadingTypography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Allowed types: *.jpeg, *.jpg, *.png, *.gif, *.webp, *.avif.
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Upto a max size of 3 MB.
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
              Remove
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleUploadFiles}
            >
              Upload File
            </Button>
          </Box>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default FileUploader;
