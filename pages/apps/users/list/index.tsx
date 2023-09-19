// ** React Imports
import { useState, useEffect, useCallback, useContext } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "@components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import CardStatisticsHorizontal from "src/@core/components/card-statistics/card-stats-horizontal";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Actions Imports
import {
  fetchFilteredUsers,
  fetchUsersByRole,
  fetchUsersByStatus,
  removeUser,
} from "@redux/apps/admin/user";
import { fetchRoles } from "@redux/apps/admin/role";
import apolloClient from "@lib/apollo";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { CardStatsType } from "src/@fake-db/types";
import { ThemeColor } from "src/@core/layouts/types";
import { UserRowType } from "src/types/apps/userTypes";
import { CardStatsHorizontalProps } from "src/@core/components/card-statistics/types";

// ** Custom Table Components Imports
import TableHeader from "src/views/apps/user/list/TableHeader";
import UserDrawer from "@src/views/apps/user/list/UserDrawer";

// ** Others
import toast from "react-hot-toast";
import {
  GET_FILTERED_USERS,
  GET_USERS_BY_ROLE_ID,
  GET_USERS_BY_STATUS,
} from "@src/api/admin/user";
import { idleTimer } from "@src/configs/idleOrReload";
import { AbilityContext } from "src/layouts/components/acl/Can";

const PAGE_SIZE = 20;

interface UserStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: UserRowType;
}

const userStatusObj: UserStatusType = {
  active: "success",
  pending: "warning",
  suspended: "warning",
  inactive: "secondary",
};

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  textDecoration: "none",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

// ** renders client column
const renderClient = (row: UserRowType) => {
  if (row.node.image) {
    return (
      <CustomAvatar
        src={row.node.image}
        sx={{ mr: 3, width: 32, height: 32 }}
      />
    );
  } else {
    const fullName = row.node.firstName + " " + row.node.lastName;

    return (
      <CustomAvatar
        skin="light"
        color={row.node.avatarColor || "primary"}
        sx={{ mr: 3, width: 32, height: 32, fontSize: ".875rem" }}
      >
        {getInitials(fullName ? fullName : row.node.username)}
      </CustomAvatar>
    );
  }
};

const defaultColumns: GridColDef[] = [
  {
    flex: 0.3,
    minWidth: 240,
    field: "fullName",
    headerName: "User",
    renderCell: ({ row }: CellType) => {
      const { id, firstName, lastName, email, phone, language } = row.node;
      const fullName = firstName + " " + lastName;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row)}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <LinkStyled href={`/apps/users/${id}/view/account`}>
              {fullName}
            </LinkStyled>
            <Typography
              noWrap
              variant="caption"
              sx={{ color: "text.disabled" }}
            >
              {email} {phone && " | " + phone} {language && " | " + language}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    field: "role",
    minWidth: 160,
    headerName: "Role",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textTransform: "capitalize" }}
        >
          {row.node.role.name}
        </Typography>
      );
    },
  },
  {
    flex: 0.3,
    minWidth: 220,
    headerName: "Address",
    field: "address",
    renderCell: ({ row }: CellType) => {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              color: "text.secondary",
              textTransform: "capitalize",
            }}
          >
            {row.node.address}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              color: "text.secondary",
              textTransform: "capitalize",
            }}
          >
            {row.node.city}, {row.node.country}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: "status",
    headerName: "Status",
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.node.status}
          color={userStatusObj[row.node.status]}
        />
      );
    },
  },
];

const UserList = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** State
  const [vUsers, setVUsers] = useState<any>();
  const [id, setId] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [userData, setUserData] = useState<any>();
  const [drawerType, setDrawerType] = useState<string>("Add");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  const { roles } = useSelector((state: RootState) => state.roles);

  useEffect(() => {
    dispatch(fetchRoles({ first: 100 }));
  }, [dispatch, roles]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query:
        type === "role"
          ? GET_USERS_BY_ROLE_ID
          : type === "status"
          ? GET_USERS_BY_STATUS
          : GET_FILTERED_USERS,
      variables: {
        ...(type === "role"
          ? { roleId }
          : type === "status"
          ? { status }
          : { filter: value }),
        first: PAGE_SIZE,
      },
      fetchPolicy: "no-cache",
    });

    setPaginationModel({
      page: 0,
      pageSize: PAGE_SIZE,
    });

    setVUsers(
      type === "role"
        ? () => {
            const { usersByRoleId }: any = data;

            return usersByRoleId;
          }
        : type === "status"
        ? () => {
            const { usersByStatus }: any = data;

            return usersByStatus;
          }
        : () => {
            const { usersFiltered }: any = data;

            return usersFiltered;
          }
    );
    setIsLoading(false);
  }, [paginationModel, vUsers, isLoading]);

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vUsers.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newUsers = await dispatch(
          type === "role"
            ? fetchUsersByRole({
                roleId,
                first: paginationModel.pageSize,
                after: vUsers.pageInfo.endCursor,
              })
            : type === "status"
            ? fetchUsersByStatus({
                status,
                first: paginationModel.pageSize,
                after: vUsers.pageInfo.endCursor,
              })
            : fetchFilteredUsers({
                filter: value,
                first: paginationModel.pageSize,
                after: vUsers.pageInfo.endCursor,
              })
        );

        setVUsers(
          type === "role"
            ? () => {
                const { usersByRoleId }: any = newUsers.payload;

                return usersByRoleId;
              }
            : type === "status"
            ? () => {
                const { usersByStatus }: any = newUsers.payload;

                return usersByStatus;
              }
            : () => {
                const { usersFiltered }: any = newUsers.payload;

                return usersFiltered;
              }
        );
      }

      if (vUsers.pageInfo.hasPreviousPage && page < paginationModel.page) {
        setPaginationModel(newPaginationModel);

        const newUsers = await dispatch(
          type === "role"
            ? fetchUsersByRole({
                roleId,
                last: paginationModel.pageSize,
                before: vUsers.pageInfo.startCursor,
              })
            : type === "status"
            ? fetchUsersByStatus({
                status,
                last: paginationModel.pageSize,
                before: vUsers.pageInfo.startCursor,
              })
            : fetchFilteredUsers({
                filter: value,
                last: paginationModel.pageSize,
                before: vUsers.pageInfo.startCursor,
              })
        );

        setVUsers(
          type === "role"
            ? () => {
                const { usersByRoleId }: any = newUsers.payload;

                return usersByRoleId;
              }
            : type === "status"
            ? () => {
                const { usersByStatus }: any = newUsers.payload;

                return usersByStatus;
              }
            : () => {
                const { usersFiltered }: any = newUsers.payload;

                return usersFiltered;
              }
        );
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vUsers]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(
    (vUsers && vUsers.totalCount) || 0
  );
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vUsers && vUsers.totalCount !== undefined
        ? vUsers.totalCount
        : prevRowCountState
    );
  }, [vUsers, vUsers && vUsers.totalCount, setRowCountState]);

  const handleFilter = useCallback(
    async (val: string) => {
      setType("");
      setValue(val);

      const filteredUsers = await dispatch(
        fetchFilteredUsers({
          first: paginationModel.pageSize,
          filter: val,
        })
      );

      const { usersFiltered }: any = filteredUsers.payload;

      setVUsers(usersFiltered);
    },
    [dispatch, vUsers, value]
  );

  const handleRoleChange = useCallback(
    async (e: SelectChangeEvent) => {
      setType("role");

      const {
        target: { value },
      } = e;

      setRoleId(value);

      const usersByRole = await dispatch(
        fetchUsersByRole({ first: PAGE_SIZE, roleId: value })
      );

      const { usersByRoleId }: any = usersByRole.payload;

      setVUsers(usersByRoleId);
    },
    [dispatch, value]
  );

  const handleStatusChange = useCallback(
    async (e: SelectChangeEvent) => {
      setType("status");

      const {
        target: { value },
      } = e;

      setStatus(value);

      const statusUsers = await dispatch(
        fetchUsersByStatus({ first: PAGE_SIZE, status: value })
      );

      const { usersByStatus }: any = statusUsers.payload;

      setVUsers(usersByStatus);
    },
    [dispatch, value]
  );

  const toggleUserDrawer = (type: string) => {
    setDrawerType(type);
    setUserDrawerOpen(!userDrawerOpen);
  };
  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleDeleteUser = (row: any) => {
    setId(row.node.id);
    setDeleteDialogOpen(true);
  };

  const handleSubmitDeleteUser = async (e: any) => {
    setDeleteDialogOpen(false);
    e.preventDefault();

    const resultAction = await dispatch(removeUser({ id }));

    if (removeUser.fulfilled.match(resultAction)) {
      // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
      const user = resultAction.payload;
      const { deleteUser }: any = user;

      toast.success(`User ${deleteUser.firstName} removed successfully!`);
    } else {
      toast.error(`Error removing user: ${resultAction.error}`);
    }
  };

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 115,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {row.node.role.slug !== "superadmin" && (
            <>
              {ability?.can("delete", "users") && (
                <IconButton onClick={() => handleDeleteUser(row)}>
                  <Icon fontSize={20} icon="bx:trash" />
                </IconButton>
              )}
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={6}>
        {/* <Grid item xs={12}>
          {apiData && (
            <Grid container spacing={6}>
              {apiData.map((item: CardStatsHorizontalProps, index: number) => {
                return (
                  <Grid item xs={12} md={3} sm={6} key={index}>
                    <CardStatisticsHorizontal {...item} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid> */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Search Filters" />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role-select">Select Role</InputLabel>
                    <Select
                      fullWidth
                      value={roleId}
                      id="select-role"
                      label="Select Role"
                      labelId="role-select"
                      onChange={(e) => handleRoleChange(e)}
                      inputProps={{ placeholder: "Select Role" }}
                    >
                      {roles.edges.map((role, index) => (
                        <MenuItem key={index} value={role.node.id}>
                          {role.node.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="status-select">Select Status</InputLabel>
                    <Select
                      fullWidth
                      value={status}
                      id="select-status"
                      label="Select Status"
                      labelId="status-select"
                      onChange={(e) => handleStatusChange(e)}
                      inputProps={{ placeholder: "Select Role" }}
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ m: "0 !important" }} />
            <TableHeader
              value={value}
              handleFilter={handleFilter}
              handleRefresh={handleRefresh}
              toggle={toggleUserDrawer}
            />
            {roleId || status || value ? (
              <>
                {vUsers &&
                vUsers.edges &&
                vUsers.edges.length &&
                vUsers.edges[0]?.cursor === "" ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{ mt: 6, mb: 6 }} />
                  </Box>
                ) : (
                  <>
                    {vUsers && vUsers.edges && vUsers.edges.length > 0 ? (
                      <DataGrid
                        autoHeight
                        rows={vUsers.edges}
                        columns={columns}
                        getRowId={(user) => user.cursor}
                        rowCount={rowCountState}
                        paginationMode="server"
                        disableRowSelectionOnClick
                        pageSizeOptions={[PAGE_SIZE]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationModelChange}
                        loading={isLoading}
                      />
                    ) : (
                      <Box sx={{ margin: "2rem" }}>
                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontStyle: "italic",
                            textAlign: "center",
                          }}
                        >
                          There are no users.
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </>
            ) : (
              <Box sx={{ margin: "2rem" }}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  Please select a <strong>Role</strong> or{" "}
                  <strong>Status</strong> to show users.
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        <UserDrawer
          open={userDrawerOpen}
          toggle={toggleUserDrawer}
          type={drawerType}
          data={userData}
        />
      </Grid>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleDeleteDialogToggle}
        open={deleteDialogOpen}
        sx={{
          "& .MuiDialogTitle-root + .MuiDialogContent-root": {
            pt: (theme) => `${theme.spacing(1.5)} !important`,
          },
        }}
      >
        <DialogTitle
          sx={{
            pt: 16,
            mx: "auto",
            textAlign: "center",
            fontSize: "1.625rem !important",
          }}
        >
          Remove User
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Read below carefully before proceeding.
          </Typography>
          <Alert severity="error" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            You will not be able to reverse this action. Please ensure you're
            absolutely certain before proceeding.
          </Alert>

          <Box sx={{ mt: 3 }}>
            <FormGroup
              sx={{
                mb: 2,
                alignItems: "center",
                flexDirection: "column",
                flexWrap: ["wrap", "nowrap"],
              }}
            >
              <Box
                className="demo-space-x"
                sx={{ "& > :last-child": { mr: "0 !important" } }}
              >
                <Button
                  onClick={(e) => handleSubmitDeleteUser(e)}
                  variant="outlined"
                  color="secondary"
                >
                  Remove
                </Button>
                <Button
                  type="reset"
                  size="large"
                  variant="contained"
                  color="error"
                  onClick={handleDeleteDialogToggle}
                >
                  Close
                </Button>
              </Box>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await axios.get("/apps/users/stats");
//   const apiData: CardStatsType["statsHorizontal"] = res.data;

//   return {
//     props: {
//       apiData,
//     },
//   };
// };

UserList.acl = {
  action: "read",
  subject: "users",
};

export default UserList;
