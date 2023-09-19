// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** Demo Components Imports
import VehicleViewLeft from "src/views/apps/vehicle/view/VehicleViewLeft";
import VehicleViewRight from "src/views/apps/vehicle/view/VehicleViewRight";

type VehicleViewProps = {
  tab: string;
  vehicle: VehicleNode;
};

const VehicleView: React.FC<VehicleViewProps> = ({ tab, vehicle }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <VehicleViewLeft vehicle={vehicle} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <VehicleViewRight tab={tab} vehicle={vehicle} />
      </Grid>
    </Grid>
  );
};

export default VehicleView;
