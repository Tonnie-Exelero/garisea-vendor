// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import Link from "next/link";
import { InferGetServerSidePropsType } from "next/types";

// ** MUI Imports
import { Button } from "@mui/material";

// ** Demo Components Imports
import VehicleViewPage from "src/views/apps/vehicle/view/VehicleViewPage";

// ** API
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { fetchVehicleById } from "@src/store/apps/vendor/vehicle/single";

// ** Others
import Icon from "@components/icon";
import { idleTimer } from "@src/configs/idleOrReload";

const VehicleView = ({
  id,
  tab,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { vehicle } = useSelector((state: RootState) => state.singleVehicle);
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  useEffect(() => {
    dispatch(fetchVehicleById({ id }));
  }, [dispatch]);

  return (
    <>
      <Button
        component={Link}
        variant="contained"
        href={`/${authedVendor.id}/apps/vehicles/list`}
        startIcon={<Icon icon="bx:arrow-back" />}
        sx={{ mb: 4 }}
      >
        Vehicles List
      </Button>
      <VehicleViewPage tab={tab} vehicle={vehicle} />
    </>
  );
};

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;

  return {
    props: {
      id,
      tab: params?.tab,
    },
  };
};

VehicleView.acl = {
  action: "read",
  subject: "vehicles",
};

export default VehicleView;
