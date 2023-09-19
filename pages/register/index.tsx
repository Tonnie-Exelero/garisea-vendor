// ** React Imports
import { useState, ReactNode } from "react";
import toast from "react-hot-toast";

// ** Next Import
import Link from "next/link";
import Router from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Custom Components Imports
import AuthIllustrationWrapper from "src/views/pages/auth/AuthIllustrationWrapper";
import CustomAvatar from "@components/mui/avatar";

// ** API
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { addPermission } from "@src/store/apps/admin/permission/single";
import { addRole } from "@src/store/apps/admin/role/single";
import { addUser } from "@src/store/apps/admin/user/single";

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // ** Hook
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  // ** Local Storage
  const fromLocalStore = window.localStorage.getItem("settings");
  const appSettings = fromLocalStore && JSON.parse(fromLocalStore);

  const userVariables = {
    username,
    email,
    password,
  };

  const registerUser = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Create User.
    const createFirstUser = async (id: string) => {
      const userData = {
        ...userVariables,
        roleId: id,
      };

      const userResultAction = await dispatch(addUser({ ...userData }));

      if (addUser.fulfilled.match(userResultAction)) {
        setIsLoading(false);
        toast.success(`User account created successfully!`);

        // Route on success.
        return Router.push("/login");
      } else {
        toast.error(`Error creating user account: ${userResultAction.error}`);
      }
    };

    // Create first Role.
    const createFirstRole = async (id: string) => {
      const firstRoleData = {
        name: "Superadmin",
        slug: "superadmin",
        description: "Manages the platform",
        ability: "create,read,update,delete",
        permissions: [id],
      };

      const roleResultAction = await dispatch(addRole({ ...firstRoleData }));

      if (addRole.fulfilled.match(roleResultAction)) {
        const role = roleResultAction.payload;
        const {
          createRole: { id },
        }: any = role;

        // Create first user with role id.
        createFirstUser(id);

        toast.success(`User role created successfully!`);
      } else {
        toast.error(`Error creating user role: ${roleResultAction.error}`);
      }
    };

    // Create first Permission.
    const firstPermissionData = {
      name: "Administration",
      slug: "administration",
      description: "Manage everything",
      subjects: "all, dashboards",
    };

    const permissionResultAction = await dispatch(
      addPermission({ ...firstPermissionData })
    );

    if (addPermission.fulfilled.match(permissionResultAction)) {
      const permission = permissionResultAction.payload;
      const {
        createPermission: { id },
      }: any = permission;

      // Create Role using permission id.
      createFirstRole(id);

      toast.success(`User permission created successfully!`);
    } else {
      toast.error(
        `Error creating user permission: ${permissionResultAction.error}`
      );
    }
  };

  return (
    <Box className="content-center">
      <AuthIllustrationWrapper>
        <Card>
          <CardContent sx={{ p: `${theme.spacing(8, 8, 7)} !important` }}>
            <Box
              sx={{
                mb: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <CustomAvatar
                  src={
                    appSettings?.mode === "dark"
                      ? themeConfig.logos.greenLight
                      : themeConfig.logos.greenDark
                  }
                  variant="rounded"
                  alt={"Garisea"}
                  sx={{
                    width: 200,
                    height: "auto",
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1,
                      fontWeight: 400,
                      letterSpacing: "-0.45px",
                      textTransform: "lowercase",
                      fontSize: ".85rem !important",
                      transition:
                        "opacity .35s ease-in-out, margin .35s ease-in-out",
                    }}
                  >
                    Vendor
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography sx={{ mb: 6, color: "text.secondary" }}>
              Make your app management easy and fun!
            </Typography>
            <Box>
              <TextField
                autoFocus
                fullWidth
                id="username"
                aria-label="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                sx={{ mb: 4 }}
                label="Username"
                placeholder="johndoe"
              />
              <TextField
                fullWidth
                id="email"
                aria-label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                sx={{ mb: 4 }}
                placeholder="user@email.com"
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  id="password"
                  aria-label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          icon={
                            showPassword
                              ? "mdi:eye-outline"
                              : "mdi:eye-off-outline"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                    color: "text.secondary",
                  },
                }}
                control={<Checkbox />}
                label={
                  <>
                    <Typography variant="body2" component="span">
                      I agree to{" "}
                    </Typography>
                    <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </>
                }
              />
              <Button
                fullWidth
                onClick={(e) => registerUser(e)}
                disabled={
                  username.length === 0 ||
                  email.length === 0 ||
                  password.length === 0
                }
                size="large"
                variant="contained"
                sx={{ mb: 4 }}
              >
                Sign up
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Already have an account?
                </Typography>
                <Typography variant="body2">
                  <LinkStyled href="/login">Sign in instead</LinkStyled>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  );
};

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Register.guestGuard = true;

export default Register;
