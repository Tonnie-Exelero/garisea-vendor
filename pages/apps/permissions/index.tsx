// ** React Imports
import { useState, useEffect, useCallback, useContext } from "react";

// ** MUI Imports
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch } from "react-redux";
import { Permission } from "@src/store/apps/admin/permission/types";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import PageHeader from "src/@core/components/page-header";
import TableHeader from "@src/views/apps/permission/TableHeader";

// ** Types Imports
import { AppDispatch } from "src/store";
import { PermissionRowType } from "src/types/apps/permissionTypes";

// ** Actions Imports
import {
  editPermission,
  fetchPermissions,
  fetchFilteredPermissions,
  removePermission,
} from "@src/store/apps/admin/permission";
import apolloClient from "@lib/apollo";
import {
  GET_FILTERED_PERMISSIONS,
  GET_PERMISSIONS,
} from "@src/api/admin/permission";

// ** Types
import { colors } from "@src/configs/permissions";

// ** Others
import toast from "react-hot-toast";
import { subjectsList } from "@src/configs/permissions";
import { idleTimer } from "@src/configs/idleOrReload";
import { AbilityContext } from "src/layouts/components/acl/Can";

const PAGE_SIZE = 20;

interface CellType {
  row: PermissionRowType;
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.15,
    minWidth: 220,
    field: "name",
    headerName: "Name",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row.node.name}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 200,
    field: "slug",
    headerName: "Slug",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row.node.slug}</Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 240,
    field: "description",
    headerName: "Description",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.node.description}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    minWidth: 280,
    field: "subjects",
    headerName: "Subjects",
    renderCell: ({ row }: CellType) => {
      const subjects = row.node.subjects.split(",");

      return (
        <Box
          sx={{
            overflowX: subjects.length > 5 ? "scroll" : "visible",
            "&::-webkit-scrollbar": {
              height: 0,
            },
          }}
        >
          {subjects.map((subject: string, index: number) => (
            <CustomChip
              rounded
              size="small"
              key={index}
              skin="light"
              color={colors[subject]}
              label={subject.replace("-", " ")}
              sx={{ "&:not(:last-of-type)": { mr: 2 } }}
            />
          ))}
        </Box>
      );
    },
  },
];

interface Props {
  permissions: any;
}

const Permissions = (props: Partial<Props>) => {
  // ** Watch for idle time or reload
  idleTimer();

  const { permissions } = props;

  // ** State
  const [vPermissions, setVPermissions] = useState<any>(permissions);
  const [value, setValue] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Permission data
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectSubjects, setSelectSubjects] = useState<string[]>([]);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  useEffect(() => {}, [vPermissions]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query: value === "" ? GET_PERMISSIONS : GET_FILTERED_PERMISSIONS,
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

    setVPermissions(
      value === ""
        ? () => {
            const { permissions }: any = data;

            return permissions;
          }
        : () => {
            const { permissionsFiltered }: any = data;

            return permissionsFiltered;
          }
    );
    setIsLoading(false);
  }, [paginationModel, vPermissions, isLoading]);

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vPermissions.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newPermissions = await dispatch(
          value === ""
            ? fetchPermissions({
                first: paginationModel.pageSize,
                after: vPermissions.pageInfo.endCursor,
              })
            : fetchFilteredPermissions({
                filter: value,
                first: paginationModel.pageSize,
                after: vPermissions.pageInfo.endCursor,
              })
        );

        setVPermissions(
          value === ""
            ? () => {
                const { permissions }: any = newPermissions.payload;

                return permissions;
              }
            : () => {
                const { permissionsFiltered }: any = newPermissions.payload;

                return permissionsFiltered;
              }
        );
      }

      if (
        vPermissions.pageInfo.hasPreviousPage &&
        page < paginationModel.page
      ) {
        setPaginationModel(newPaginationModel);

        const newPermissions = await dispatch(
          value === ""
            ? fetchPermissions({
                last: paginationModel.pageSize,
                before: vPermissions.pageInfo.startCursor,
              })
            : fetchFilteredPermissions({
                filter: value,
                first: paginationModel.pageSize,
                before: vPermissions.pageInfo.startCursor,
              })
        );

        setVPermissions(
          value === ""
            ? () => {
                const { permissions }: any = newPermissions.payload;

                return permissions;
              }
            : () => {
                const { permissionsFiltered }: any = newPermissions.payload;

                return permissionsFiltered;
              }
        );
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vPermissions]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(
    vPermissions.totalCount || 0
  );
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vPermissions.totalCount !== undefined
        ? vPermissions.totalCount
        : prevRowCountState
    );
  }, [vPermissions.totalCount, setRowCountState]);

  const handleFilter = useCallback(
    async (val: string) => {
      setValue(val);

      const filteredPermissions = await dispatch(
        fetchFilteredPermissions({
          first: paginationModel.pageSize,
          filter: val,
        })
      );

      setPaginationModel({
        page: 0,
        pageSize: PAGE_SIZE,
      });

      const { permissionsFiltered }: any = filteredPermissions.payload;

      setVPermissions(permissionsFiltered);
    },
    [dispatch, vPermissions]
  );

  const handleEditPermission = (row: Permission) => {
    setId(row.id);
    setName(row.name);
    setSlug(row.slug);
    setDescription(row.description);
    setSelectSubjects(row.subjects.split(","));
    setEditDialogOpen(true);
  };

  const handleDeletePermission = (row: any) => {
    setId(row.node.id);
    setDeleteDialogOpen(true);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectSubjects.some((subject) => subject === event.target.value)) {
      const updatedList = selectSubjects.filter(
        (subject) => subject !== event.target.value
      );
      return setSelectSubjects(updatedList);
    }
    return setSelectSubjects((prev) => [...prev, event.target.value]);
  };

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen);
  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleSubmitEditPermission = async (e: any) => {
    setEditDialogOpen(false);
    e.preventDefault();

    const subjectsString = selectSubjects.toString();

    const permissionData = {
      id,
      name,
      slug,
      description,
      subjects: subjectsString,
    };

    const resultAction = await dispatch(editPermission({ ...permissionData }));

    if (editPermission.fulfilled.match(resultAction)) {
      // permission will have a type signature of Permission as we passed that as the Returned parameter in createAsyncThunk
      const permission = resultAction.payload;
      const { updatePermission }: any = permission;

      toast.success(
        `Permission ${updatePermission.name} updated successfully!`
      );
    } else {
      toast.error(`Error updating permission: ${resultAction.error}`);
    }
  };

  const handleSubmitDeletePermission = async (e: any) => {
    e.preventDefault();

    const resultAction = await dispatch(removePermission({ id }));

    if (removePermission.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);

      toast.success(`Permission  deleted successfully!`);
    } else {
      toast.error(`Error deleting permission: ${resultAction.error}`);
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
          {ability?.can("update", "permissions") && (
            <IconButton onClick={() => handleEditPermission(row.node)}>
              <Icon fontSize={20} icon="bx:edit" />
            </IconButton>
          )}
          {ability?.can("delete", "permissions") && (
            <IconButton onClick={() => handleDeletePermission(row)}>
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
          <PageHeader
            title={
              <Typography sx={{ mb: 5, fontSize: "1.375rem", fontWeight: 700 }}>
                Permissions
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: "text.secondary" }}>
                Each category (Basic, Professional, and Business) includes the
                four predefined roles shown below.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              value={value}
              handleFilter={handleFilter}
              handleRefresh={handleRefresh}
            />
            {vPermissions &&
            vPermissions.edges &&
            vPermissions.edges.length &&
            vPermissions.edges[0]?.cursor === "" ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ mt: 6, mb: 6 }} />
              </Box>
            ) : (
              <>
                {vPermissions &&
                vPermissions.edges &&
                vPermissions.edges.length > 0 ? (
                  <DataGrid
                    autoHeight
                    rows={vPermissions.edges}
                    columns={columns}
                    getRowId={(permission) => permission.cursor}
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
                      There are no permissions created yet.
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
        onClose={handleDialogToggle}
        open={editDialogOpen}
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
          Edit Permission
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Edit permission as per your requirements.
          </Typography>
          <Alert severity="warning" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the permission, you might break the system permissions
            functionality. Please ensure you're absolutely certain before
            proceeding.
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
              <TextField
                fullWidth
                id="name"
                aria-label="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
                }}
                type="text"
                sx={{ mb: 4 }}
                label="Name"
                placeholder="e.g. Manage Users"
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
                placeholder="e.g. manage-users"
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
                placeholder="Describe it"
              />
              <Box sx={{ width: "100%", display: "flex" }}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Assign Subjects</FormLabel>
                  <FormGroup sx={{ display: "flex" }}>
                    {subjectsList.map((subject, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={selectSubjects.includes(subject)}
                              onChange={handleSubjectChange}
                              name={subject}
                              value={subject}
                            />
                          }
                          label={subject}
                        />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </Box>

              <Box
                className="demo-space-x"
                sx={{ "& > :last-child": { mr: "0 !important" } }}
              >
                <Button
                  onClick={(e) => handleSubmitEditPermission(e)}
                  variant="contained"
                >
                  Update
                </Button>
                <Button
                  type="reset"
                  size="large"
                  variant="outlined"
                  color="secondary"
                  onClick={handleDialogToggle}
                >
                  Close
                </Button>
              </Box>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleDialogToggle}
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
          Delete Permission
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Read below carefully before proceeding.
          </Typography>
          <Alert severity="error" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By deleting the permission, you WILL break the system permissions
            functionality. Please ensure you're absolutely certain before
            proceeding.
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
                  onClick={(e) => handleSubmitDeletePermission(e)}
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

export const getServerSideProps: any = async () => {
  const { data, loading, error } = await apolloClient.query({
    query: GET_PERMISSIONS,
    variables: {
      first: PAGE_SIZE,
    },
  });

  if (loading) {
    toast.loading("Fetching permissions...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching permissions: ${error}`);
    return undefined;
  }

  const { permissions }: any = data;

  return {
    props: {
      permissions: { ...permissions },
    },
  };
};

Permissions.acl = {
  action: "read",
  subject: "permissions",
};

export default Permissions;
