// ** React Imports
import { Fragment, MouseEvent, useCallback, useEffect, useState } from "react";

// ** MUI Imports
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import { Menu, MenuItem } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Import
import ChatLog from "./ChatLog";
import SendMsgForm from "@src/views/apps/chat/customer/SendMsgForm";
import CustomAvatar from "src/@core/components/mui/avatar";
import UserProfileRight from "@src/views/apps/chat/customer/UserProfileRight";

// ** Types
import { ChatContentType } from "src/types/apps/chatTypes";

// ** Others
import { useSettings } from "src/@core/hooks/useSettings";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import apolloClient from "@src/lib/apollo";
import { GET_MESSAGES } from "@src/api/shared/vendorCustomerMessage";

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  borderRadius: 1,
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.action.hover,
}));

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    authedVendor,
    hidden,
    mdAbove,
    dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
  } = props;

  // ** States
  const [messages, setMessages] = useState<any>();
  const [currCustomer, setCurrCustomer] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ** Hooks
  const { vendorCustomerMessages } = useSelector(
    (state: RootState) => state.vendorCustomerMessages
  );
  const { customer } = useSelector(
    (state: RootState) => state.activeVendorCustomerContact
  );
  const { settings } = useSettings();
  const { direction } = settings;

  useEffect(() => {
    setMessages(vendorCustomerMessages);
    setCurrCustomer(customer);
  }, [vendorCustomerMessages, customer]);

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };

  const handleRefresh = useCallback(async () => {
    const { data } = await apolloClient.query({
      query: GET_MESSAGES,
      variables: {
        vendorId: authedVendor.id,
        customerId: currCustomer.id,
        last: 100,
      },
      fetchPolicy: "no-cache",
    });

    const { vendorCustomerMessages }: any = data;

    setMessages(vendorCustomerMessages);
  }, [messages, currCustomer]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderContent = () => {
    if (currCustomer && currCustomer.id !== "") {
      return (
        <Box
          sx={{
            width: 0,
            flexGrow: 1,
            height: "100%",
            backgroundColor: "action.hover",
          }}
        >
          <Box
            sx={{
              py: 3,
              px: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {mdAbove ? null : (
                <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                  <Icon icon="bx:menu" />
                </IconButton>
              )}
              <Box
                onClick={handleUserProfileRightSidebarToggle}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{ mr: 3 }}
                  badgeContent={
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        color: `${
                          statusObj[
                            currCustomer.onlineStatus === "online"
                              ? "online"
                              : "offline"
                          ]
                        }.main`,
                        boxShadow: (theme) =>
                          `0 0 0 2px ${theme.palette.background.paper}`,
                        backgroundColor: `${
                          statusObj[
                            currCustomer.onlineStatus === "online"
                              ? "online"
                              : "offline"
                          ]
                        }.main`,
                      }}
                    />
                  }
                >
                  {currCustomer.image ? (
                    <MuiAvatar
                      src={currCustomer.image}
                      alt={currCustomer.firstName + " " + currCustomer.lastName}
                      sx={{ width: "2.375rem", height: "2.375rem" }}
                    />
                  ) : (
                    <CustomAvatar
                      skin="light"
                      color={"primary"}
                      sx={{
                        width: "2.375rem",
                        height: "2.375rem",
                        fontSize: "1rem",
                      }}
                    >
                      {getInitials(
                        currCustomer.firstName + " " + currCustomer.lastName
                      )}
                    </CustomAvatar>
                  )}
                </Badge>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                    {currCustomer.firstName + " " + currCustomer.lastName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    Customer
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {mdAbove ? (
                <Fragment>
                  <IconButton
                    size="small"
                    sx={{ color: "text.secondary" }}
                    onClick={handleRefresh}
                  >
                    <Icon icon="bx:refresh" fontSize="1.25rem" />
                  </IconButton>
                </Fragment>
              ) : null}

              <>
                <IconButton
                  aria-haspopup="true"
                  onClick={handleClick}
                  size="small"
                >
                  <Icon icon="bx:dots-vertical-rounded" />
                </IconButton>
                <Menu
                  keepMounted
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  open={Boolean(anchorEl)}
                  {...{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: direction === "ltr" ? "right" : "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: direction === "ltr" ? "right" : "left",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleUserProfileRightSidebarToggle();
                      handleClose();
                    }}
                  >
                    View Contact
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleRefresh();
                      handleClose();
                    }}
                  >
                    Refresh
                  </MenuItem>
                </Menu>
              </>
            </Box>
          </Box>

          <ChatLog
            hidden={hidden}
            data={{ ...messages, customer: currCustomer }}
          />

          <SendMsgForm
            dispatch={dispatch}
            authedVendor={authedVendor}
            recipient={currCustomer}
            handleRefresh={handleRefresh}
          />

          <UserProfileRight
            currCustomer={currCustomer}
            hidden={hidden}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            userProfileRightOpen={userProfileRightOpen}
            handleUserProfileRightSidebarToggle={
              handleUserProfileRightSidebarToggle
            }
          />
        </Box>
      );
    } else {
      return (
        <ChatWrapperStartChat
          sx={{
            ...(mdAbove
              ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
              : {}),
          }}
        >
          <MuiAvatar
            sx={{
              mb: 6,
              pt: 8,
              pb: 7,
              px: 7.5,
              width: 110,
              height: 110,
              boxShadow: 3,
              backgroundColor: "background.paper",
            }}
          >
            <Icon icon="bx:message" fontSize="3.125rem" />
          </MuiAvatar>
          <Box
            onClick={handleStartConversation}
            sx={{
              py: 2,
              px: 6,
              boxShadow: 3,
              borderRadius: 5,
              backgroundColor: "background.paper",
              cursor: mdAbove ? "default" : "pointer",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "1.125rem",
                lineHeight: "normal",
              }}
            >
              Start Conversation
            </Typography>
          </Box>
        </ChatWrapperStartChat>
      );
    }
  };

  return renderContent();
};

export default ChatContent;
