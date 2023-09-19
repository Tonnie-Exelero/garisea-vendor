// ** React Imports
import { useCallback, useContext, useEffect, useState } from "react";

// ** MUI Imports
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch } from "react-redux";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";

// ** Types Imports
import { RoleRowType } from "src/types/apps/roleTypes";
import { PermissionNode } from "@src/types/apps/permissionTypes";

// ** Custom Components Imports
import TableHeader from "@src/views/apps/role/TableHeader";
import { ThemeColor } from "src/@core/layouts/types";

// ** Redux
import { AppDispatch } from "src/store";
import { fetchRoles, fetchFilteredRoles } from "@src/store/apps/admin/role";
import apolloClient from "@lib/apollo";
import { GET_FILTERED_ROLES, GET_ROLES } from "@src/api/admin/role";

// ** Actions Imports
import { removeRole } from "@src/store/apps/admin/role";

// ** Others
import toast from "react-hot-toast";
import { AbilityContext } from "src/layouts/components/acl/Can";

const PAGE_SIZE = 20;

interface CellType {
  row: RoleRowType;
}

interface Colors {
  [key: string]: ThemeColor;
}

const abilityColors: Colors = {
  create: "info",
  read: "success",
  update: "warning",
  delete: "error",
};

const defaultColumns: GridColDef[] = [
  {
    flex: 0.15,
    minWidth: 180,
    field: "name",
    headerName: "Name",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row.node.name}</Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 220,
    field: "description",
    headerName: "Description",
    renderCell: ({ row }: CellType) => {
      return (
        <Box
          sx={{
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              height: 0,
            },
          }}
        >
          <Typography noWrap sx={{ color: "text.secondary" }}>
            {row.node.description}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "ability",
    headerName: "Ability",
    renderCell: ({ row }: CellType) => {
      const abilities = row.node.ability.split(",");

      return (
        <Box
          sx={{
            overflowX: abilities.length > 2 ? "scroll" : "visible",
            "&::-webkit-scrollbar": {
              height: 0,
            },
          }}
        >
          {abilities.map((item: string, index: number) => (
            <CustomChip
              rounded
              size="small"
              key={index}
              skin="light"
              color={abilityColors[item]}
              label={item.replace("-", " ")}
              sx={{ "&:not(:last-of-type)": { mr: 2 } }}
            />
          ))}
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "permissions",
    headerName: "Permissions",
    renderCell: ({ row }: CellType) => {
      return (
        <Box
          sx={{
            overflowX: row.node.permissions.length > 2 ? "scroll" : "visible",
            "&::-webkit-scrollbar": {
              height: 0,
            },
          }}
        >
          {row.node.permissions.map((item: PermissionNode, index: number) => (
            <CustomChip
              rounded
              size="small"
              key={index}
              skin="light"
              color={"info"}
              label={item.name}
              sx={{ "&:not(:last-of-type)": { mr: 2 } }}
            />
          ))}
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: "users",
    headerName: "Users",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: "text.secondary" }}>
          {row.node.users ? row.node.users.length : 0}
        </Typography>
      );
    },
  },
];

interface RoleListProps {
  roles: any;
}

const RoleList: React.FC<Partial<RoleListProps>> = (props) => {
  const { roles } = props;

  // ** State
  const [vRoles, setVRoles] = useState<any>(roles);
  const [value, setValue] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ** Role data
  const [id, setId] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  useEffect(() => {}, [vRoles]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query: value === "" ? GET_ROLES : GET_FILTERED_ROLES,
      variables: {
        ...(value !== "" && { filter: value }),
        first: PAGE_SIZE,
      },
      fetchPolicy: "no-cache",
    });

    setPaginationModel({
      page: 0,
      pageSize: PAGE_SIZE,
    });

    setVRoles(
      value === ""
        ? () => {
            const { roles }: any = data;

            return roles;
          }
        : () => {
            const { rolesFiltered }: any = data;

            return rolesFiltered;
          }
    );
    setIsLoading(false);
  }, [paginationModel, vRoles, isLoading]);

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vRoles.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newRoles = await dispatch(
          value === ""
            ? fetchRoles({
                first: paginationModel.pageSize,
                after: vRoles.pageInfo.endCursor,
              })
            : fetchFilteredRoles({
                filter: value,
                first: paginationModel.pageSize,
                after: vRoles.pageInfo.endCursor,
              })
        );

        setVRoles(
          value === ""
            ? () => {
                const { roles }: any = newRoles.payload;

                return roles;
              }
            : () => {
                const { rolesFiltered }: any = newRoles.payload;

                return rolesFiltered;
              }
        );
      }

      if (vRoles.pageInfo.hasPreviousPage && page < paginationModel.page) {
        setPaginationModel(newPaginationModel);

        const newRoles = await dispatch(
          value === ""
            ? fetchRoles({
                last: paginationModel.pageSize,
                before: vRoles.pageInfo.startCursor,
              })
            : fetchFilteredRoles({
                filter: value,
                first: paginationModel.pageSize,
                before: vRoles.pageInfo.startCursor,
              })
        );

        setVRoles(
          value === ""
            ? () => {
                const { roles }: any = newRoles.payload;

                return roles;
              }
            : () => {
                const { rolesFiltered }: any = newRoles.payload;

                return rolesFiltered;
              }
        );
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vRoles]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(vRoles.totalCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vRoles.totalCount !== undefined ? vRoles.totalCount : prevRowCountState
    );
  }, [vRoles.totalCount, setRowCountState]);

  const handleFilter = useCallback(
    async (val: string) => {
      setValue(val);

      const filteredRoles = await dispatch(
        fetchFilteredRoles({
          first: paginationModel.pageSize,
          filter: val,
        })
      );

      const { rolesFiltered }: any = filteredRoles.payload;

      setVRoles(rolesFiltered);
    },
    [dispatch, vRoles]
  );

  const handleDeleteRole = (row: any) => {
    setId(row.node.id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleSubmitDeleteRole = async (e: any) => {
    setDeleteDialogOpen(false);
    e.preventDefault();

    const resultAction = await dispatch(removeRole({ id }));

    if (removeRole.fulfilled.match(resultAction)) {
      // permission will have a type signature of Role as we passed that as the Returned parameter in createAsyncThunk
      const role = resultAction.payload;
      const { deleteRole }: any = role;

      toast.success(`Role ${deleteRole.name} deleted successfully!`);
    } else {
      toast.error(`Error deleting role: ${resultAction.error}`);
    }
  };

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 60,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }: CellType) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ability?.can("delete", "roles") && (
            <IconButton onClick={() => handleDeleteRole(row)}>
              <Icon fontSize={20} icon="bx:trash" />
            </IconButton>
          )}
        </Box>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              value={value}
              handleFilter={handleFilter}
              handleRefresh={handleRefresh}
            />
            {vRoles &&
            vRoles.edges &&
            vRoles.edges.length &&
            vRoles.edges[0]?.cursor === "" ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ mt: 6, mb: 6 }} />
              </Box>
            ) : (
              <>
                {vRoles && vRoles.edges && vRoles.edges.length > 0 ? (
                  <DataGrid
                    autoHeight
                    rows={vRoles.edges}
                    columns={columns}
                    getRowId={(role) => role.cursor}
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
                      There are no roles created yet.
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Card>
        </Grid>
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
          Delete Role
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Read below carefully before proceeding.
          </Typography>
          <Alert severity="error" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By deleting the role, you WILL break the system roles functionality.
            Ensure no user is assigned to this role before deleting. Please
            ensure you're absolutely certain before proceeding.
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
                  onClick={(e) => handleSubmitDeleteRole(e)}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
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

export default RoleList;
