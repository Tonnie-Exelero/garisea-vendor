// ** MUI Imports
import { useTheme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// ** Custom Components
import CustomAvatar from "@components/mui/avatar";

// ** Configs
import themeConfig from "src/configs/themeConfig";

const FallbackSpinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  // ** Hook
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <CustomAvatar
        src={themeConfig.logos.favicon}
        variant="rounded"
        alt={"Garisea"}
        sx={{
          width: 80,
          height: "auto",
        }}
      />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export default FallbackSpinner;
