// ** React Imports
import { SyntheticEvent, useState, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import { styled, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTabList, { TabListProps } from "@mui/lab/TabList";
import CircularProgress from "@mui/material/CircularProgress";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Demo Components Imports
import VehicleViewDetails from "src/views/apps/vehicle/view/VehicleViewDetails";

// ** Types
import { VehicleNode } from "@src/types/apps/vehicleTypes";

interface Props {
  tab: string;
  vehicle: VehicleNode;
}

//  ** Styled TabList component
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  minHeight: 40,
  marginBottom: theme.spacing(6),
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTab-root": {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    "&.Mui-selected": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const VehicleViewRight = ({ tab, vehicle }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ** Hooks
  const router = useRouter();
  const hideText = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    router
      .push({
        pathname: `/apps/vehicles/${vehicle.id}/view/${value.toLowerCase()}`,
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return activeTab ? (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
      >
        <Tab
          value="details"
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ...(!hideText && { "& svg": { mr: 2 } }),
              }}
            >
              <Icon icon="bx:vehicle" />
              {!hideText && "Details"}
            </Box>
          }
        />
      </TabList>
      <Box
        sx={{
          "& .MuiTabPanel-root": {
            p: 0,
            border: 0,
            boxShadow: 0,
            backgroundColor: "transparent",
          },
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              mt: 6,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel value="details">
              <VehicleViewDetails vehicle={vehicle} />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  ) : (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <CircularProgress sx={{ mb: 4 }} />
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default VehicleViewRight;
