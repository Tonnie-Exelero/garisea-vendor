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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
import { Model } from "@src/store/apps/admin/model/types";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import TableHeader from "@src/views/apps/model/TableHeader";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { ModelRowType } from "src/types/apps/modelTypes";

// ** Actions Imports
import {
  editModel,
  fetchModels,
  fetchFilteredModels,
  removeModel,
} from "@src/store/apps/admin/model";
import { fetchBrands } from "@src/store/apps/admin/brand";
import apolloClient from "@lib/apollo";
import { GET_FILTERED_MODELS, GET_MODELS } from "@src/api/admin/model";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";
import { AbilityContext } from "src/layouts/components/acl/Can";

const PAGE_SIZE = 20;

interface CellType {
  row: ModelRowType;
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 240,
    field: "name",
    headerName: "Name",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row.node.name}</Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "brand",
    headerName: "Brand",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.node.brand.name}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "slug",
    headerName: "Slug",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row.node.slug}</Typography>
    ),
  },
  {
    flex: 0.25,
    minWidth: 240,
    field: "description",
    headerName: "Description",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.node.description}
      </Typography>
    ),
  },
];

interface Props {
  models: any;
}

const Models = (props: Partial<Props>) => {
  // ** Watch for idle time or reload
  idleTimer();

  const { models } = props;

  // ** State
  const [vModels, setVModels] = useState<any>(models);
  const [value, setValue] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Model data
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [brandId, setBrandId] = useState<string | undefined>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);
  const { brands } = useSelector((state: RootState) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands({ first: 100 }));
  }, [dispatch, vModels]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query: value === "" ? GET_MODELS : GET_FILTERED_MODELS,
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

    setVModels(
      value === ""
        ? () => {
            const { models }: any = data;

            return models;
          }
        : () => {
            const { modelsFiltered }: any = data;

            return modelsFiltered;
          }
    );
    setIsLoading(false);
  }, [paginationModel, vModels, isLoading]);

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vModels.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newModels = await dispatch(
          value === ""
            ? fetchModels({
                first: paginationModel.pageSize,
                after: vModels.pageInfo.endCursor,
              })
            : fetchFilteredModels({
                filter: value,
                first: paginationModel.pageSize,
                after: vModels.pageInfo.endCursor,
              })
        );

        setVModels(
          value === ""
            ? () => {
                const { models }: any = newModels.payload;

                return models;
              }
            : () => {
                const { modelsFiltered }: any = newModels.payload;

                return modelsFiltered;
              }
        );
      }

      if (vModels.pageInfo.hasPreviousPage && page < paginationModel.page) {
        setPaginationModel(newPaginationModel);

        const newModels = await dispatch(
          value === ""
            ? fetchModels({
                last: paginationModel.pageSize,
                before: vModels.pageInfo.startCursor,
              })
            : fetchFilteredModels({
                filter: value,
                first: paginationModel.pageSize,
                before: vModels.pageInfo.startCursor,
              })
        );

        setVModels(
          value === ""
            ? () => {
                const { models }: any = newModels.payload;

                return models;
              }
            : () => {
                const { modelsFiltered }: any = newModels.payload;

                return modelsFiltered;
              }
        );
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vModels]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(vModels.totalCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vModels.totalCount !== undefined ? vModels.totalCount : prevRowCountState
    );
  }, [vModels.totalCount, setRowCountState]);

  const handleFilter = useCallback(
    async (val: string) => {
      setValue(val);

      const filteredModels = await dispatch(
        fetchFilteredModels({
          first: paginationModel.pageSize,
          filter: val,
        })
      );

      const { modelsFiltered }: any = filteredModels.payload;

      setVModels(modelsFiltered);
    },
    [dispatch, vModels]
  );

  const handleEditModel = (row: Model) => {
    setId(row.id);
    setName(row.name);
    setSlug(row.slug);
    setDescription(row.description);
    setBrandId(row.brand.id);
    setEditDialogOpen(true);
  };

  const handleDeleteModel = (row: any) => {
    setId(row.node.id);
    setDeleteDialogOpen(true);
  };

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen);
  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleSubmitEditModel = async (e: any) => {
    setEditDialogOpen(false);
    e.preventDefault();

    const modelData = {
      id,
      name,
      slug,
      description,
      brandId,
    };

    const resultAction = await dispatch(editModel({ ...modelData }));

    if (editModel.fulfilled.match(resultAction)) {
      // model will have a type signature of Model as we passed that as the Returned parameter in createAsyncThunk
      const model = resultAction.payload;
      const { updateModel }: any = model;

      toast.success(`Model ${updateModel.name} updated successfully!`);
    } else {
      toast.error(`Error updating model: ${resultAction.error}`);
    }
  };

  const handleSubmitDeleteModel = async (e: any) => {
    setDeleteDialogOpen(false);
    e.preventDefault();

    const resultAction = await dispatch(removeModel({ id }));

    if (removeModel.fulfilled.match(resultAction)) {
      // model will have a type signature of Model as we passed that as the Returned parameter in createAsyncThunk
      const model = resultAction.payload;
      const { deleteModel }: any = model;

      toast.success(`Model ${deleteModel.name} deleted successfully!`);
    } else {
      toast.error(`Error deleting model: ${resultAction.error}`);
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
          {ability?.can("update", "models") && (
            <IconButton onClick={() => handleEditModel(row.node)}>
              <Icon fontSize={20} icon="bx:edit" />
            </IconButton>
          )}
          {ability?.can("delete", "models") && (
            <IconButton onClick={() => handleDeleteModel(row)}>
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
                Models
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: "text.secondary" }}>
                Vehicle models are associated with a specific brand. If a model
                for a specific brand is missing, please create it using the Add
                Model button.
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
            {vModels &&
            vModels.edges &&
            vModels.edges.length &&
            vModels.edges[0]?.cursor === "" ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ mt: 6, mb: 6 }} />
              </Box>
            ) : (
              <>
                {vModels && vModels.edges && vModels.edges.length > 0 ? (
                  <DataGrid
                    autoHeight
                    rows={vModels.edges}
                    columns={columns}
                    getRowId={(model) => model.cursor}
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
                      There are no models created yet.
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
          Edit Model
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Edit model as per your requirements.
          </Typography>
          <Alert severity="warning" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the model, you might break the vehicle models
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
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id="brand-select">Select Brand</InputLabel>
                <Select
                  fullWidth
                  value={brandId}
                  id="brand"
                  label="Select Brand"
                  labelId="brand-select"
                  onChange={(e) => setBrandId(e.target.value)}
                  inputProps={{ placeholder: "Select Brand" }}
                >
                  {brands.edges.map((brand, index) => {
                    const { id, name } = brand.node;

                    return (
                      <MenuItem key={index} value={id}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <Box
                className="demo-space-x"
                sx={{ "& > :last-child": { mr: "0 !important" } }}
              >
                <Button
                  onClick={(e) => handleSubmitEditModel(e)}
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
          Delete Model
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Read below carefully before proceeding.
          </Typography>
          <Alert severity="error" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By deleting the model, you WILL break the system models
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
                  onClick={(e) => handleSubmitDeleteModel(e)}
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
    query: GET_MODELS,
    variables: {
      first: PAGE_SIZE,
    },
  });

  if (loading) {
    toast.loading("Fetching models...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching models: ${error}`);
    return undefined;
  }

  const { models }: any = data;

  return {
    props: {
      models: { ...models },
    },
  };
};

Models.acl = {
  action: "read",
  subject: "models",
};

export default Models;
