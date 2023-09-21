// ** React Imports
import { useState, useEffect, useCallback, useContext } from "react";

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
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch } from "react-redux";
import { Brand } from "@src/store/apps/admin/brand/types";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import TableHeader from "src/views/apps/brand/TableHeader";

// ** Types Imports
import { AppDispatch } from "src/store";
import { BrandRowType } from "src/types/apps/brandTypes";

// ** Actions Imports
import {
  editBrand,
  fetchBrands,
  fetchFilteredBrands,
  removeBrand,
} from "@src/store/apps/admin/brand";
import apolloClient from "@lib/apollo";
import { GET_BRANDS, GET_FILTERED_BRANDS } from "@src/api/admin/brand";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";
import { AbilityContext } from "src/layouts/components/acl/Can";

const PAGE_SIZE = 20;

interface CellType {
  row: BrandRowType;
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.3,
    minWidth: 270,
    field: "name",
    headerName: "Name",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row.node.name}</Typography>
    ),
  },
  {
    flex: 0.25,
    minWidth: 240,
    field: "slug",
    headerName: "Slug",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row.node.slug}</Typography>
    ),
  },
  {
    flex: 0.35,
    minWidth: 300,
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
  brands: any;
}

const Brands = (props: Partial<Props>) => {
  // ** Watch for idle time or reload
  idleTimer();

  const { brands } = props;

  // ** State
  const [vBrands, setVBrands] = useState<any>(brands);
  const [value, setValue] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Brand data
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  useEffect(() => {}, [vBrands]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query: value === "" ? GET_BRANDS : GET_FILTERED_BRANDS,
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

    setVBrands(
      value === ""
        ? () => {
            const { brands }: any = data;

            return brands;
          }
        : () => {
            const { brandsFiltered }: any = data;

            return brandsFiltered;
          }
    );
    setIsLoading(false);
  }, [paginationModel, vBrands, isLoading]);

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vBrands.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newBrands = await dispatch(
          value === ""
            ? fetchBrands({
                first: paginationModel.pageSize,
                after: vBrands.pageInfo.endCursor,
              })
            : fetchFilteredBrands({
                filter: value,
                first: paginationModel.pageSize,
                after: vBrands.pageInfo.endCursor,
              })
        );

        setVBrands(
          value === ""
            ? () => {
                const { brands }: any = newBrands.payload;

                return brands;
              }
            : () => {
                const { brandsFiltered }: any = newBrands.payload;

                return brandsFiltered;
              }
        );
      }

      if (vBrands.pageInfo.hasPreviousPage && page < paginationModel.page) {
        setPaginationModel(newPaginationModel);

        const newBrands = await dispatch(
          value === ""
            ? fetchBrands({
                last: paginationModel.pageSize,
                before: vBrands.pageInfo.startCursor,
              })
            : fetchFilteredBrands({
                filter: value,
                first: paginationModel.pageSize,
                before: vBrands.pageInfo.startCursor,
              })
        );

        setVBrands(
          value === ""
            ? () => {
                const { brands }: any = newBrands.payload;

                return brands;
              }
            : () => {
                const { brandsFiltered }: any = newBrands.payload;

                return brandsFiltered;
              }
        );
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vBrands]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(vBrands.totalCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vBrands.totalCount !== undefined ? vBrands.totalCount : prevRowCountState
    );
  }, [vBrands.totalCount, setRowCountState]);

  const handleFilter = useCallback(
    async (val: string) => {
      setValue(val);

      const filteredBrands = await dispatch(
        fetchFilteredBrands({
          first: paginationModel.pageSize,
          filter: val,
        })
      );

      setPaginationModel({
        page: 0,
        pageSize: PAGE_SIZE,
      });

      const { brandsFiltered }: any = filteredBrands.payload;

      setVBrands(brandsFiltered);
    },
    [dispatch, vBrands]
  );

  const handleEditBrand = (row: Brand) => {
    setId(row.id);
    setName(row.name);
    setSlug(row.slug);
    setDescription(row.description);
    setEditDialogOpen(true);
  };

  const handleDeleteBrand = (row: any) => {
    setId(row.node.id);
    setDeleteDialogOpen(true);
  };

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen);
  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleSubmitEditBrand = async (e: any) => {
    setEditDialogOpen(false);
    e.preventDefault();

    const brandData = {
      id,
      name,
      slug,
      description,
    };

    const resultAction = await dispatch(editBrand({ ...brandData }));

    if (editBrand.fulfilled.match(resultAction)) {
      // brand will have a type signature of Brand as we passed that as the Returned parameter in createAsyncThunk
      const brand = resultAction.payload;
      const { updateBrand }: any = brand;

      toast.success(`Brand ${updateBrand.name} updated successfully!`);
    } else {
      toast.error(`Error updating brand: ${resultAction.error}`);
    }
  };

  const handleSubmitDeleteBrand = async (e: any) => {
    e.preventDefault();

    const resultAction = await dispatch(removeBrand({ id }));

    if (removeBrand.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);

      toast.success(`Brand deleted successfully!`);
    } else {
      toast.error(`Error deleting brand: ${resultAction.error}`);
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
          {ability?.can("update", "brands") && (
            <IconButton onClick={() => handleEditBrand(row.node)}>
              <Icon fontSize={20} icon="bx:edit" />
            </IconButton>
          )}
          {ability?.can("delete", "brands") && (
            <IconButton onClick={() => handleDeleteBrand(row)}>
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
                Brands
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: "text.secondary" }}>
                These are the vehicle brands available. If any is missing,
                please create it by clicking on Add Brand.
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
            {vBrands &&
            vBrands.edges &&
            vBrands.edges.length &&
            vBrands.edges[0]?.cursor === "" ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ mt: 6, mb: 6 }} />
              </Box>
            ) : (
              <>
                {vBrands && vBrands.edges && vBrands.edges.length > 0 ? (
                  <DataGrid
                    autoHeight
                    rows={vBrands.edges}
                    columns={columns}
                    getRowId={(brand) => brand.cursor}
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
                      There are no brands created yet.
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
          Edit Brand
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Edit brand as per your requirements.
          </Typography>
          <Alert severity="warning" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the brand, you might break the system brands
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

              <Box
                className="demo-space-x"
                sx={{ "& > :last-child": { mr: "0 !important" } }}
              >
                <Button
                  onClick={(e) => handleSubmitEditBrand(e)}
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
          Delete Brand
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography
            sx={{ mb: 6, textAlign: "center", color: "text.secondary" }}
          >
            Read below carefully before proceeding.
          </Typography>
          <Alert severity="error" sx={{ maxWidth: "500px" }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By deleting the brand, you WILL break the system brands
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
                  onClick={(e) => handleSubmitDeleteBrand(e)}
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
    query: GET_BRANDS,
    variables: {
      first: PAGE_SIZE,
    },
  });

  if (loading) {
    toast.loading("Fetching brands...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching brands: ${error}`);
    return undefined;
  }

  const { brands }: any = data;

  return {
    props: {
      brands: { ...brands },
    },
  };
};

Brands.acl = {
  action: "read",
  subject: "brands",
};

export default Brands;
