// ** React Imports
import { Fragment, ReactNode } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Type
import { UserProfileRightType } from "src/types/apps/chatTypes";

// ** Custom Component Imports
import Sidebar from "src/@core/components/sidebar";
import CustomAvatar from "src/@core/components/mui/avatar";

const UserProfileRight = (props: UserProfileRightType) => {
  const {
    currAdmin,
    hidden,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleUserProfileRightSidebarToggle,
  } = props;

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return (
        <Box sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Sidebar
      direction="right"
      show={userProfileRightOpen}
      backDropClick={handleUserProfileRightSidebarToggle}
      sx={{
        zIndex: 9,
        height: "100%",
        width: sidebarWidth,
        borderTopRightRadius: (theme) => theme.shape.borderRadius,
        borderBottomRightRadius: (theme) => theme.shape.borderRadius,
        "& + .MuiBackdrop-root": {
          zIndex: 8,
          borderRadius: 1,
        },
      }}
    >
      {currAdmin ? (
        <Fragment>
          <Box sx={{ position: "relative" }}>
            <IconButton
              size="small"
              onClick={handleUserProfileRightSidebarToggle}
              sx={{
                top: "0.5rem",
                right: "0.5rem",
                position: "absolute",
                color: "text.secondary",
              }}
            >
              <Icon icon="bx:x" />
            </IconButton>
            <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
              <Box sx={{ mb: 5.5, display: "flex", justifyContent: "center" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <Box
                      component="span"
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        color: `${
                          statusObj[
                            currAdmin.onlineStatus === "online"
                              ? "online"
                              : "offline"
                          ]
                        }.main`,
                        boxShadow: (theme) =>
                          `0 0 0 2px ${theme.palette.background.paper}`,
                        backgroundColor: `${
                          statusObj[
                            currAdmin.onlineStatus === "online"
                              ? "online"
                              : "offline"
                          ]
                        }.main`,
                      }}
                    />
                  }
                >
                  {currAdmin.image ? (
                    <MuiAvatar
                      sx={{ width: "5rem", height: "5rem" }}
                      src={currAdmin.image}
                      alt={currAdmin.firstName + " " + currAdmin.lastName}
                    />
                  ) : (
                    <CustomAvatar
                      skin="light"
                      color={"info"}
                      sx={{
                        width: "5rem",
                        height: "5rem",
                        fontWeight: 500,
                        fontSize: "2rem",
                      }}
                    >
                      {getInitials(
                        currAdmin.firstName + " " + currAdmin.lastName
                      )}
                    </CustomAvatar>
                  )}
                </Badge>
              </Box>
              <Typography
                sx={{ mb: 0.5, fontWeight: 500, textAlign: "center" }}
              >
                {currAdmin.firstName + " " + currAdmin.lastName}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Garisea Admin
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: "calc(100% - 11.8125rem)" }}>
            <ScrollWrapper>
              <Box sx={{ p: 5 }}>
                <Box sx={{ mb: 8.5 }}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 3.5, textTransform: "uppercase" }}
                  >
                    Additional Information
                  </Typography>
                  <List dense sx={{ p: 0 }}>
                    <ListItem sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2, color: "text.primary" }}>
                        <Icon icon="bx:envelope" />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ textTransform: "lowercase" }}
                        primary={`${currAdmin.email}`}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </ScrollWrapper>
          </Box>
        </Fragment>
      ) : null}
    </Sidebar>
  );
};

export default UserProfileRight;
