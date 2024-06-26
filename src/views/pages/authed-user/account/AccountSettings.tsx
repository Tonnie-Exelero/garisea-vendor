// ** React Imports
import { ReactElement, useState, useEffect, SyntheticEvent } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import { styled, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTabList, { TabListProps } from "@mui/lab/TabList";
import CircularProgress from "@mui/material/CircularProgress";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Demo Tabs Imports
import TabAccount from "./TabAccount";
import TabSecurity from "./TabSecurity";

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
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

interface AccountSettingsProps {
  tab: string;
  user: any;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ tab, user }) => {
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
    router
      .push(`/account/settings/${value.toLowerCase()}`)
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const tabContentList: { [key: string]: ReactElement } = {
    account: <TabAccount user={user} />,
    security: <TabSecurity user={user} />,
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                aria-label="customized tabs example"
              >
                <Tab
                  value="account"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ...(!hideText && { "& svg": { mr: 2 } }),
                      }}
                    >
                      <Icon icon="bx:user" />
                      {!hideText && "Account"}
                    </Box>
                  }
                />
                <Tab
                  value="security"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ...(!hideText && { "& svg": { mr: 2 } }),
                      }}
                    >
                      <Icon icon="bx:lock-alt" />
                      {!hideText && "Security"}
                    </Box>
                  }
                />
              </TabList>
            </Grid>
            <Grid item xs={12}>
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
                <TabPanel
                  sx={{
                    p: 0,
                    border: 0,
                    boxShadow: 0,
                    backgroundColor: "transparent",
                  }}
                  value={activeTab}
                >
                  {tabContentList[activeTab]}
                </TabPanel>
              )}
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default AccountSettings;
