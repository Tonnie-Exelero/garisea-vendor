// ** React Imports
import { useState, useEffect, ChangeEvent, ReactNode } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import MuiAvatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import InputAdornment from "@mui/material/InputAdornment";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Types
import { ChatSidebarLeftType } from "src/types/apps/chatTypes";

// ** Custom Components Import
import CustomAvatar from "src/@core/components/mui/avatar";

// ** API
import apolloClient from "@src/lib/apollo";
import { fetchAdminVendorMessages } from "@src/store/apps/shared/adminVendorMessage";
import { GET_MESSAGES } from "@src/api/shared/adminVendorMessage";
import { fetchActiveAdminById } from "@src/store/apps/shared/adminVendorContact/single/activeAdmin";

const ScrollWrapper = ({
  children,
  hidden,
}: {
  children: ReactNode;
  hidden: boolean;
}) => {
  if (hidden) {
    return <Box sx={{ height: "100%", overflow: "auto" }}>{children}</Box>;
  } else {
    return (
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        {children}
      </PerfectScrollbar>
    );
  }
};

const SidebarLeft = (props: ChatSidebarLeftType) => {
  // ** Props
  const {
    authedVendor,
    adminVendorContacts,
    hidden,
    mdAbove,
    dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    leftSidebarOpen,
    formatDateToMonthShort,
    handleLeftSidebarToggle,
  } = props;

  // ** States
  const [query, setQuery] = useState<string>("");
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [active, setActive] = useState<null | {
    type: string;
    id: string | number;
  }>(null);
  const [adminMessages, setAdminMessages] = useState<any[]>([]);

  const handleChatClick = (type: "chat" | "contact", id: string) => {
    dispatch(fetchActiveAdminById({ id }));
    dispatch(
      fetchAdminVendorMessages({
        vendorId: authedVendor.id,
        userId: id,
        last: 100,
      })
    );
    setActive({ type, id });
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };

  useEffect(() => {
    if (adminVendorContacts && adminVendorContacts.totalCount !== 0) {
      const fetchLastMessage = () => {
        adminVendorContacts.edges.forEach(async (user: any) => {
          const { data } = await apolloClient.query({
            query: GET_MESSAGES,
            variables: {
              vendorId: authedVendor.id,
              userId: user.node.user.id,
              last: 1,
            },
          });

          const lastMessage =
            data &&
            data.adminVendorMessages.edges &&
            data.adminVendorMessages.edges[0].node;

          const unreadCount = data.adminVendorMessages.totalCount;

          const messageData = { lastMessage, unreadCount };

          setAdminMessages((prev) =>
            prev ? [...prev, messageData] : [messageData]
          );
        });
      };

      fetchLastMessage();
    }
  }, [adminVendorContacts]);

  const AdminVendorContacts = () => {
    if (adminVendorContacts && adminVendorContacts.totalCount !== 0) {
      if (query.length && !filteredContacts.length) {
        return (
          <List sx={{ mb: 4, p: 0 }}>
            <ListItem>
              <Typography sx={{ color: "text.secondary" }}>
                No Chats Found
              </Typography>
            </ListItem>
          </List>
        );
      } else {
        const arrToMap =
          query.length && filteredContacts.length
            ? filteredContacts
            : adminVendorContacts.edges;

        if (arrToMap.length === 0) {
          return (
            <List sx={{ mb: 4, p: 0 }}>
              <ListItem>
                <Typography sx={{ color: "text.secondary" }}>
                  No Chats Available
                </Typography>
              </ListItem>
            </List>
          );
        }

        return (
          <List sx={{ mb: 4, p: 0 }}>
            {arrToMap.map((user: any, index: number) => {
              const currAdmin =
                adminMessages &&
                adminMessages.length > 0 &&
                adminMessages.find(
                  (message) =>
                    message.lastMessage &&
                    message.lastMessage.senderId === user.node.user.id
                );

              const activeCondition =
                active !== null &&
                active.id === user.node.user.id &&
                active.type === "chat";

              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ "&:not(:last-child)": { mb: 1.5 } }}
                >
                  <ListItemButton
                    disableRipple
                    onClick={() => handleChatClick("chat", user.node.user.id)}
                    sx={{
                      px: 3,
                      py: 2.5,
                      width: "100%",
                      borderRadius: 1,
                      alignItems: "flex-start",
                      ...(activeCondition && {
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main} !important`,
                      }),
                    }}
                  >
                    <ListItemAvatar sx={{ m: 0 }}>
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
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              color: `${
                                statusObj[
                                  user.node.user.onlineStatus === "online"
                                    ? "online"
                                    : "offline"
                                ]
                              }.main`,
                              backgroundColor: `${
                                statusObj[
                                  user.node.user.onlineStatus === "online"
                                    ? "online"
                                    : "offline"
                                ]
                              }.main`,
                              boxShadow: (theme) =>
                                `0 0 0 2px ${
                                  !activeCondition
                                    ? theme.palette.background.paper
                                    : theme.palette.common.white
                                }`,
                            }}
                          />
                        }
                      >
                        {user.node.user.image ? (
                          <MuiAvatar
                            src={user.node.user.image}
                            alt={
                              user.node.user.firstName +
                              " " +
                              user.node.user.lastName
                            }
                            sx={{
                              width: 38,
                              height: 38,
                              outline: (theme) =>
                                `2px solid ${
                                  activeCondition
                                    ? theme.palette.common.white
                                    : "transparent"
                                }`,
                            }}
                          />
                        ) : (
                          <CustomAvatar
                            color={"primary"}
                            skin={activeCondition ? "light-static" : "light"}
                            sx={{
                              width: 38,
                              height: 38,
                              fontSize: "1rem",
                              outline: (theme) =>
                                `2px solid ${
                                  activeCondition
                                    ? theme.palette.common.white
                                    : "transparent"
                                }`,
                            }}
                          >
                            {getInitials(
                              user.node.user.firstName +
                                " " +
                                user.node.user.lastName
                            )}
                          </CustomAvatar>
                        )}
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        my: 0,
                        ml: 4,
                        mr: 1.5,
                        "& .MuiTypography-root": {
                          ...(activeCondition && { color: "common.white" }),
                        },
                      }}
                      primary={
                        <Typography
                          noWrap
                          sx={{ fontWeight: 500, fontSize: "0.875rem" }}
                        >
                          {user.node.user.firstName +
                            " " +
                            user.node.user.lastName}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          noWrap
                          variant="body2"
                          sx={{
                            ...(!activeCondition && { color: "text.disabled" }),
                          }}
                        >
                          {currAdmin ? currAdmin.lastMessage.message : null}
                        </Typography>
                      }
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "nowrap",
                          color: activeCondition
                            ? "common.white"
                            : "text.disabled",
                        }}
                      >
                        <>
                          {currAdmin &&
                            currAdmin.lastMessage &&
                            formatDateToMonthShort(
                              currAdmin.lastMessage.timeSent as string,
                              true
                            )}
                        </>
                      </Typography>
                      {currAdmin &&
                      currAdmin.unreadCount &&
                      currAdmin.unreadCount > 0 ? (
                        <Chip
                          color="error"
                          label={currAdmin.unreadCount}
                          sx={{
                            mt: 0.5,
                            height: 18,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            "& .MuiChip-label": { pt: 0.25, px: 1.655 },
                          }}
                        />
                      ) : null}
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        );
      }
    } else {
      return (
        <List sx={{ mb: 4, p: 0 }}>
          <ListItem>
            <Typography sx={{ color: "text.secondary" }}>
              No Chats Available
            </Typography>
          </ListItem>
        </List>
      );
    }
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (adminVendorContacts !== null && adminVendorContacts.edges.length) {
      const filteredContactsArr = adminVendorContacts.edges.filter(
        (item: any) =>
          `${item.node.user.firstName} ${item.node.user.lastName}`
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );

      setFilteredContacts(filteredContactsArr);
    }
  };

  return (
    <div>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? "permanent" : "temporary"}
        ModalProps={{
          disablePortal: true,
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          zIndex: 7,
          height: "100%",
          display: "block",
          position: mdAbove ? "static" : "absolute",
          "& .MuiDrawer-paper": {
            boxShadow: "none",
            width: sidebarWidth,
            position: mdAbove ? "static" : "absolute",
            borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
          },
          "& > .MuiBackdrop-root": {
            borderRadius: 1,
            position: "absolute",
            zIndex: (theme) => theme.zIndex.drawer - 1,
          },
        }}
      >
        <Box
          sx={{
            px: 5,
            py: 3.125,
            display: "flex",
            alignItems: "center",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{ mr: 4 }}
            badgeContent={
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  color: `${statusObj["online"]}.main`,
                  backgroundColor: `${statusObj["online"]}.main`,
                  boxShadow: (theme) =>
                    `0 0 0 2px ${theme.palette.background.paper}`,
                }}
              />
            }
          >
            <MuiAvatar
              src={authedVendor.image}
              alt={authedVendor.firstName + " " + authedVendor.lastName}
              sx={{
                width: "2.375rem",
                height: "2.375rem",
              }}
            />
          </Badge>
          <TextField
            fullWidth
            size="small"
            value={query}
            onChange={handleFilter}
            placeholder="Search contact..."
            sx={{ "& .MuiInputBase-root": { borderRadius: 5 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: "text.secondary" }}>
                  <IconButton>
                    <Icon icon="bx:search" fontSize={20} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!mdAbove ? (
            <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
              <Icon icon="bx:x" />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ height: `calc(100% - 4.125rem)` }}>
          <ScrollWrapper hidden={hidden}>
            <Box sx={{ p: (theme) => theme.spacing(7, 3, 3) }}>
              <Typography
                variant="h6"
                sx={{ ml: 3, mb: 3, color: "primary.main" }}
              >
                Chats
              </Typography>
              <AdminVendorContacts />
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>
    </div>
  );
};

export default SidebarLeft;
