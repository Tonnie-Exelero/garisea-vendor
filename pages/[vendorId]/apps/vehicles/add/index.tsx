// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import { Button, Typography } from "@mui/material";

// ** Icon Imports
import Icon from "@components/icon";

// ** Others
import VehicleListing from "src/views/apps/vehicle/list/vehicle-listing";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { idleTimer } from "@src/configs/idleOrReload";

const AddVehicle = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** Hooks
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  return (
    <DatePickerWrapper>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Add Vehicle
      </Typography>
      <Button
        component={Link}
        variant="contained"
        href={`/${authedVendor.id}/apps/vehicles/list`}
        startIcon={<Icon icon="bx:arrow-back" />}
        sx={{ mb: 4 }}
      >
        Vehicles List
      </Button>
      <VehicleListing />
    </DatePickerWrapper>
  );
};

AddVehicle.acl = {
  action: "read",
  subject: "vehicles",
};

export default AddVehicle;
