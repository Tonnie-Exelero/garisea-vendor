// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Store & Actions Imports
import { useDispatch, useSelector } from "react-redux";

// ** Types
import { RootState, AppDispatch } from "src/store";
import { StatusObjType, StatusType } from "src/types/apps/chatTypes";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** Utils Imports
import { getInitials } from "src/@core/utils/get-initials";
import { formatDateToMonthShort } from "src/@core/utils/format";

// ** Chat App Components Imports
import SidebarLeft from "@src/views/apps/chat/admin/SidebarLeft";
import ChatContent from "@src/views/apps/chat/admin/ChatContent";
import { fetchAdminVendorContacts } from "@src/store/apps/shared/adminVendorContact";
import { idleTimer } from "@src/configs/idleOrReload";

const AdminChat = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** States
  const [userStatus, setUserStatus] = useState<StatusType>("online");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] =
    useState<boolean>(false);
  const [userProfileRightOpen, setUserProfileRightOpen] =
    useState<boolean>(false);

  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();
  const dispatch = useDispatch<AppDispatch>();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );
  const { adminVendorContacts } = useSelector(
    (state: RootState) => state.adminVendorContacts
  );

  // ** Vars
  const { skin } = settings;
  const smAbove = useMediaQuery(theme.breakpoints.up("sm"));
  const sidebarWidth = smAbove ? 370 : 300;
  const mdAbove = useMediaQuery(theme.breakpoints.up("md"));
  const statusObj: StatusObjType = {
    online: "success",
    offline: "secondary",
  };

  useEffect(() => {
    dispatch(fetchAdminVendorContacts({ vendorId: authedVendor.id }));
  }, [dispatch, adminVendorContacts]);

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () =>
    setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = () =>
    setUserProfileRightOpen(!userProfileRightOpen);

  return (
    <Box
      className="app-chat"
      sx={{
        width: "100%",
        display: "flex",
        borderRadius: 1,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "background.paper",
        boxShadow: skin === "bordered" ? 0 : 6,
        ...(skin === "bordered" && {
          border: `1px solid ${theme.palette.divider}`,
        }),
      }}
    >
      <SidebarLeft
        authedVendor={authedVendor}
        adminVendorContacts={adminVendorContacts}
        hidden={hidden}
        mdAbove={mdAbove}
        dispatch={dispatch}
        statusObj={statusObj}
        userStatus={userStatus}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        setUserStatus={setUserStatus}
        leftSidebarOpen={leftSidebarOpen}
        userProfileLeftOpen={userProfileLeftOpen}
        formatDateToMonthShort={formatDateToMonthShort}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
      />
      <ChatContent
        authedVendor={authedVendor}
        hidden={hidden}
        mdAbove={mdAbove}
        dispatch={dispatch}
        statusObj={statusObj}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        userProfileRightOpen={userProfileRightOpen}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleUserProfileRightSidebarToggle={
          handleUserProfileRightSidebarToggle
        }
      />
    </Box>
  );
};

AdminChat.contentHeightFixed = true;

AdminChat.acl = {
  action: "read",
  subject: "messages",
};

export default AdminChat;
