// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** Others
import Specifications from "./sections/specifications";
import ExtraInfo from "./sections/extraInfo";

interface VehicleViewDetailsProps {
  vehicle: VehicleNode;
}

const VehicleViewDetails: React.FC<VehicleViewDetailsProps> = ({ vehicle }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Specifications vehicle={vehicle} />
      </Grid>
      <Grid item xs={12}>
        <ExtraInfo vehicle={vehicle} />
      </Grid>
    </Grid>
  );
};

export default VehicleViewDetails;
