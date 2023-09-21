// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Others
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/index";
import { fetchPermissions } from "@src/store/apps/admin/permission";
import { addRole, editRole } from "@src/store/apps/admin/role";
import { Role } from "@src/store/apps/admin/role/types";
import { AbilityContext } from "src/layouts/components/acl/Can";

const abilities: string[] = ["create", "read", "update", "delete"];

interface RolesCardsProps {
  roles: any;
}

const RolesCards: React.FC<Partial<RolesCardsProps>> = (props) => {
  const { roles } = props;

  // ** States
  const [vRoles, setVRoles] = useState<any>(roles);
  const [open, setOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<"Add" | "Edit">("Add");

  // ** Role data
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ability, setAbility] = useState<string[]>([]);
  const [perms, setPerms] = useState<string[]>([]); // Permissions

  // ** Hook
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const abilityCont = useContext(AbilityContext);
  const { permissions, loading, error } = useSelector(
    (state: RootState) => state.permissions
  );

  const clearRoleState = () => {
    setId("");
    setName("");
    setSlug("");
    setDescription("");
    setAbility([]);
    setPerms([]);
  };

  useEffect(() => {
    clearRoleState();
  }, [vRoles, roles]);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetupEdit = (row: Role) => {
    setId(row.id);
    setName(row.name);
    setSlug(row.slug);
    setDescription(row.description);
    setAbility(row.ability.split(","));
    setPerms(row.permissions.map((i) => i.id));
  };

  const handleAbilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (ability.some((item) => item === event.target.value)) {
      const updatedList = ability.filter((item) => item !== event.target.value);
      return setAbility(updatedList);
    }
    return setAbility((prev) => [...prev, event.target.value]);
  };

  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (perms.some((item) => item === event.target.value)) {
      const updatedList = perms.filter((item) => item !== event.target.value);
      return setPerms(updatedList);
    }
    return setPerms((prev) => [...prev, event.target.value]);
  };

  const handleSubmitEditRole = async (e: any) => {
    e.preventDefault();
    handleClose();

    const abilityString = ability.toString();

    const roleData = {
      id,
      name,
      slug,
      description,
      ability: abilityString,
      permissions: perms,
    };

    const resultAction = await dispatch(editRole({ ...roleData }));

    if (editRole.fulfilled.match(resultAction)) {
      // role will have a type signature of Role as we passed that as the Returned parameter in createAsyncThunk
      const role = resultAction.payload;
      const { updateRole }: any = role;

      toast.success(`Role ${updateRole.name} updated successfully!`);
    } else {
      toast.error(`Error updating role: ${resultAction.error}`);
    }
  };

  const handleCreateRole = async (e: any) => {
    setOpen(false);
    e.preventDefault();

    const abilityString = ability.toString();

    const roleData = {
      name,
      slug,
      description,
      ability: abilityString,
      permissions: perms,
    };

    const resultAction = await dispatch(addRole({ ...roleData }));

    if (addRole.fulfilled.match(resultAction)) {
      // role will have a type signature of Role as we passed that as the Returned parameter in createAsyncThunk
      const role = resultAction.payload;
      const { createRole }: any = role;

      toast.success(`Role ${createRole.name} created successfully!`);
    } else {
      toast.error(`Error creating role: ${resultAction.error}`);
    }
  };

  useEffect(() => {
    dispatch(fetchPermissions({ first: 100 }));

    if (loading === "pending")
      toast.loading("Fetching permissions...", { duration: 1000 });

    if (error !== null)
      toast.error(`An error occurred while fetching permissions: ${error}`, {
        duration: 3000,
      });
  }, [dispatch]);

  const renderCards = () =>
    vRoles.edges.map((role: any, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "text.secondary" }}>
                {`Total ${role.node.users ? role.node.users.length : 0} ${
                  role.node.users
                    ? role.node.users.length === 1
                      ? "user"
                      : "users"
                    : "users"
                }`}
              </Typography>
              <AvatarGroup
                max={4}
                className="pull-up"
                sx={{
                  "& .MuiAvatar-root": {
                    width: 28,
                    height: 28,
                    fontSize: "0.875rem",
                  },
                }}
              >
                {role.node.users &&
                  role.node.users.map((user: any, index: number) => (
                    <Tooltip
                      key={index}
                      title={user.firstName + " " + user.lastName}
                    >
                      <Avatar
                        key={index}
                        alt={user.firstName + " " + user.lastName}
                        src={user.image ? user.image : `/images/avatars/1.png`}
                      />
                    </Tooltip>
                  ))}
              </AvatarGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {role.node.name}
                </Typography>
                {abilityCont?.can("update", "roles") && (
                  <Typography
                    href="/"
                    variant="body2"
                    component={Link}
                    sx={{ color: "primary.main", textDecoration: "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      clearRoleState();
                      handleClickOpen();
                      setDialogTitle("Edit");
                      handleSetupEdit(role.node);
                    }}
                  >
                    Edit Role
                  </Typography>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <Grid container spacing={6} className="match-height">
      {renderCards()}
      {abilityCont?.can("create", "roles") && (
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleClickOpen();
              setDialogTitle("Add");
            }}
          >
            <Grid container sx={{ height: "100%" }}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <img
                    width={88}
                    height={105}
                    alt="add-role"
                    src={`/images/pages/add-role-illustration-${theme.palette.mode}.png`}
                  />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <CardContent>
                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      sx={{ mb: 3, whiteSpace: "nowrap" }}
                      onClick={() => {
                        clearRoleState();
                        handleClickOpen();
                        setDialogTitle("Add");
                      }}
                    >
                      Add Role
                    </Button>
                    <Typography>Add role, if it doesn't exist.</Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        scroll="body"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            pt: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <Typography variant="h5" component="span">
            {`${dialogTitle} Role`}
          </Typography>
          <Typography variant="body2">
            Set Role Ability and Permissions
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
          }}
        >
          <Box sx={{ my: 4 }}>
            <TextField
              autoFocus
              fullWidth
              id="name"
              aria-label="name"
              value={name.trimStart()}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
              }}
              type="text"
              sx={{ mb: 4 }}
              label="Name"
              placeholder="e.g. Senior Administrator"
            />
            <TextField
              fullWidth
              id="slug"
              aria-label="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              type="text"
              sx={{ mb: 4 }}
              label="Slug"
              placeholder="e.g. senior-administrator"
            />
            <TextField
              fullWidth
              id="description"
              aria-label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              sx={{ mb: 4 }}
              label="Description"
              placeholder="Describe the role"
            />
          </Box>
          <Typography variant="h6">Role Ability</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: "0 !important" }}>
                    <Box
                      sx={{
                        display: "flex",
                        fontSize: "0.875rem",
                        whiteSpace: "nowrap",
                        alignItems: "center",
                        textTransform: "capitalize",
                        "& svg": { ml: 1, cursor: "pointer" },
                      }}
                    >
                      Add Ability
                      <Tooltip
                        placement="top"
                        title="Allows a user action capabilities to the system"
                      >
                        <Box
                          sx={{
                            ml: 1,
                            display: "flex",
                            color: "text.secondary",
                          }}
                        >
                          <Icon icon="bx:info-circle" fontSize="1rem" />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={4}>
                    <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                      {abilities.map((item, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={ability.includes(item)}
                                onChange={handleAbilityChange}
                                name={item}
                                value={item}
                              />
                            }
                            label={item}
                          />
                        );
                      })}
                    </FormGroup>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    my: 4,
                    "& svg": { ml: 1, cursor: "pointer" },
                  }}
                >
                  Assign Permissions
                  <Tooltip
                    placement="top"
                    title="Allows a user to view and manage the specified modules"
                  >
                    <Box
                      sx={{
                        ml: 1,
                        display: "flex",
                        color: "text.secondary",
                      }}
                    >
                      <Icon icon="bx:info-circle" fontSize="1rem" />
                    </Box>
                  </Tooltip>
                </Typography>
                {permissions.edges.map((item: any, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "& .MuiTableCell-root:first-of-type": {
                          pl: "0 !important",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          color: `${theme.palette.text.primary} !important`,
                        }}
                        colSpan={4}
                      >
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={perms.includes(item.node.id)}
                              onChange={(e) => handlePermissionChange(e)}
                              name={item.node.id}
                              value={item.node.id}
                            />
                          }
                          label={item.node.name}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            pb: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <Box className="demo-space-x">
            <Button
              size="large"
              type="submit"
              variant="contained"
              onClick={(e) =>
                dialogTitle === "Add"
                  ? handleCreateRole(e)
                  : handleSubmitEditRole(e)
              }
            >
              Submit
            </Button>
            <Button
              size="large"
              color="secondary"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RolesCards;
