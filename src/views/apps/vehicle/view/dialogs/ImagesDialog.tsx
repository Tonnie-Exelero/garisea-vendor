// ** MUI Imports
import { Box, Grid } from "@mui/material";

// ** Components Imports
import SwiperControls from "./components/SwiperControls";

// ** Styled Component Import
import KeenSliderWrapper from "src/@core/styles/libs/keen-slider";

// ** Hook Import
import { useSettings } from "src/@core/hooks/useSettings";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

interface ImagesControlsProps {
  vehicle: VehicleNode;
  handleImagesDialogToggle: () => void;
}

const ImagesControls: React.FC<ImagesControlsProps> = ({
  vehicle,
  handleImagesDialogToggle,
}) => {
  // ** Hooks
  const {
    settings: { direction },
  } = useSettings();

  return (
    <KeenSliderWrapper>
      <Grid container spacing={6} className="match-height">
        <Grid item xs={12}>
          <Box sx={{ position: "relative" }}>
            <SwiperControls
              direction={direction}
              vehicle={vehicle}
              handleImagesDialogToggle={handleImagesDialogToggle}
            />
          </Box>
        </Grid>
      </Grid>
    </KeenSliderWrapper>
  );
};

export default ImagesControls;
