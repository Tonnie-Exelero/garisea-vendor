// ** React Imports
import { useState, SyntheticEvent, Fragment } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Context
import { useAuth } from "src/hooks/useAuth";

// ** Type Imports
import { Settings } from "src/@core/context/settingsContext";

// ** Custom Components
import CustomAvatar from "@components/mui/avatar";

// ** Others
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { getInitials } from "@utils/get-initials";

interface Props {
  settings: Settings;
}

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props;

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks
  const { authedUser } = useSelector((state: RootState) => state.authedUser);
  const router = useRouter();
  const { logout } = useAuth();

  // ** Vars
  const { direction } = settings;

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.secondary",
    textDecoration: "none",
    "& svg": {
      mr: 2,
      fontSize: "1.25rem",
      color: "text.secondary",
    },
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };

  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {authedUser.image ? (
          <Avatar
            alt={authedUser.firstName}
            src={authedUser.image}
            onClick={handleDropdownOpen}
            sx={{ width: 40, height: 40 }}
          />
        ) : (
          <CustomAvatar
            skin="light"
            variant="rounded"
            color={"primary"}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              fontWeight: 400,
              fontSize: "1rem",
            }}
          >
            {getInitials(authedUser.firstName + " " + authedUser.lastName)}
          </CustomAvatar>
        )}
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
      >
        <Box sx={{ py: 2, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {authedUser.image ? (
                <Avatar
                  alt={authedUser.firstName}
                  src={authedUser.image}
                  onClick={handleDropdownOpen}
                  sx={{ width: 40, height: 40 }}
                />
              ) : (
                <CustomAvatar
                  skin="light"
                  variant="rounded"
                  color={"primary"}
                  sx={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    fontWeight: 400,
                    fontSize: "1rem",
                  }}
                >
                  {getInitials(
                    authedUser.firstName + " " + authedUser.lastName
                  )}
                </CustomAvatar>
              )}
            </Badge>
            <Box
              sx={{
                ml: 3,
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {authedUser.firstName + " " + authedUser.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {authedUser.role ? authedUser.role.name : "User"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: "0 !important" }} />
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/account/user/profile")}
        >
          <Box sx={styles}>
            <Icon icon="bx:user" />
            Profile
          </Box>
        </MenuItem>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/account/settings/account")}
        >
          <Box sx={styles}>
            <Icon icon="bx:cog" />
            Settings
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            px: 4,
            color: "text.secondary",
            "& svg": { mr: 2, fontSize: "1.25rem", color: "text.secondary" },
          }}
        >
          <Icon icon="bx:power-off" />
          Sign Out
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
