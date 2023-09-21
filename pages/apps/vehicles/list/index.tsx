// ** React Imports
import { useState, useEffect, useCallback, useContext } from "react";

// ** Next Imports
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import { useRouter } from "next/router";

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
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";
import CardStatisticsHorizontal from "src/@core/components/card-statistics/card-stats-horizontal";
import PageHeader from "src/@core/components/page-header";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Actions Imports
import apolloClient from "@lib/apollo";
import { fetchVendors } from "@src/store/apps/vendor/vendor";
import {
  fetchFilteredVehicles,
  removeVehicle,
} from "@src/store/apps/vendor/vehicle";
import { GET_FILTERED_VEHICLES } from "@src/api/vendor/vehicle";

// ** Third Party Components
import axios from "axios";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { CardStatsType } from "src/@fake-db/types";
import { VehicleRowType } from "src/types/apps/vehicleTypes";
import { CardStatsHorizontalProps } from "src/@core/components/card-statistics/types";

// ** Custom Table Components Imports
import TableHeader from "src/views/apps/vehicle/list/TableHeader";
import VehicleSearch from "@src/views/apps/vehicle/view/search";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";
import { AbilityContext } from "src/layouts/components/acl/Can";
import { removeFile } from "@core/utils/file-manager";

const PAGE_SIZE = 20;

interface CellType {
  row: VehicleRowType;
}

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

const currency = "KES";

// ** renders client column
const renderClient = (row: VehicleRowType) => {
  if (row.node.images) {
    const firstImage = row.node.images.split(",")[0];

    return (
      <CustomAvatar src={firstImage} sx={{ mr: 3, width: 32, height: 32 }} />
    );
  } else {
    const fullName = row.node.brand.name + " " + row.node.model.name;

    return (
      <CustomAvatar
        skin="light"
        color={"primary"}
        sx={{ mr: 3, width: 32, height: 32, fontSize: ".875rem" }}
      >
        {getInitials(fullName)}
      </CustomAvatar>
    );
  }
};

const defaultColumns: GridColDef[] = [
  {
    flex: 0.35,
    minWidth: 320,
    field: "basic",
    headerName: "Basic Info",
    renderCell: ({ row }: CellType) => {
      const {
        id,
        brand,
        model,
        trim,
        yearOfManufacture,
        yearOfFirstRegistration,
        condition,
        transmissionType,
        fuelType,
        mileage,
        mileageMetric,
        exteriorColor,
      } = row.node;

      const year = yearOfFirstRegistration
        ? yearOfFirstRegistration
        : yearOfManufacture;

      const fullName = year + " " + brand.name + " " + model.name + " " + trim;

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
            <LinkStyled href={`/apps/vehicles/${id}/view/details`}>
              {fullName}
            </LinkStyled>
            <Typography
              noWrap
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              {condition === "brand-new"
                ? "Brand New"
                : condition === "foreign-used"
                ? "Foreign Used"
                : condition === "locally-used"
                ? "Locally Used"
                : ""}
              {exteriorColor && " | " + exteriorColor}
              {transmissionType && " | " + transmissionType}
              {fuelType && " | " + fuelType}
              {mileage && " | " + mileage}
              {mileageMetric && mileageMetric}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.35,
    minWidth: 320,
    headerName: "Specs",
    field: "specs",
    renderCell: ({ row }: CellType) => {
      const {
        bodyType,
        engineCapacity,
        driveType,
        steering,
        upholstery,
        interiorColor,
      } = row.node;

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
            {bodyType}
            {engineCapacity && " | " + engineCapacity + "cc"}
            {driveType && " | " + driveType}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              color: "text.secondary",
              textTransform: "capitalize",
            }}
          >
            {steering}
            {upholstery && " | " + upholstery + " interior"}
            {interiorColor && " | " + interiorColor + " interior color"}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    headerName: `Price (${currency})`,
    field: "price",
    minWidth: 160,
    renderCell: ({ row }: CellType) => {
      const { listingPrice, discountedPrice } = row.node;

      return (
        <>
          {listingPrice !== 0 && discountedPrice !== 0 ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="body2"
                color="error"
                sx={{ textDecoration: "line-through" }}
              >
                {new Intl.NumberFormat().format(listingPrice)}
              </Typography>
              <Typography variant="body1">
                {" " + new Intl.NumberFormat().format(discountedPrice)}
              </Typography>
            </Box>
          ) : (
            <>
              {listingPrice !== 0 || discountedPrice !== 0 ? (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {new Intl.NumberFormat().format(listingPrice) ||
                    new Intl.NumberFormat().format(discountedPrice)}
                </Typography>
              ) : (
                <>
                  {listingPrice === 0 && discountedPrice === 0 && (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Set price
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </>
      );
    },
  },
];

const VehiclesList = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** State
  const [vVehicles, setVVehicles] = useState<any>();
  const [id, setId] = useState<string>("");
  const [images, setImages] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehiclesSearchParams, setVehiclesSearchParams] = useState<any>();

  // ** Hooks
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);
  const { vendors } = useSelector((state: RootState) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors({ first: 100 }));
  }, [dispatch, vendors]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query: GET_FILTERED_VEHICLES,
      variables: {
        ...vehiclesSearchParams,
        first: PAGE_SIZE,
      },
      fetchPolicy: "no-cache",
    });

    setPaginationModel({
      page: 0,
      pageSize: PAGE_SIZE,
    });

    const { vehiclesFiltered }: any = data;

    setVVehicles(vehiclesFiltered);

    setIsLoading(false);
  }, [paginationModel, vVehicles, isLoading]);

  const handleVehiclesFilter = async (params: any) => {
    setVehiclesSearchParams(params);

    const filteredVehicles = await dispatch(
      fetchFilteredVehicles({
        ...params,
        first: paginationModel.pageSize,
      })
    );

    setPaginationModel({
      page: 0,
      pageSize: PAGE_SIZE,
    });

    const { vehiclesFiltered }: any = filteredVehicles.payload;

    setVVehicles(vehiclesFiltered);
  };

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vVehicles.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newVehicles = await dispatch(
          fetchFilteredVehicles({
            ...vehiclesSearchParams,
            first: paginationModel.pageSize,
            after: vVehicles.pageInfo.endCursor,
          })
        );

        setVVehicles(() => {
          const { vehiclesFiltered }: any = newVehicles.payload;

          return vehiclesFiltered;
        });
      }

      if (vVehicles.pageInfo.hasPreviousPage && page < paginationModel.page) {
        setPaginationModel(newPaginationModel);

        const newVehicles = await dispatch(
          fetchFilteredVehicles({
            ...vehiclesSearchParams,
            last: paginationModel.pageSize,
            before: vVehicles.pageInfo.startCursor,
          })
        );

        setVVehicles(() => {
          const { vehiclesFiltered }: any = newVehicles.payload;

          return vehiclesFiltered;
        });
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vVehicles]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(
    (vVehicles && vVehicles.totalCount) || 0
  );
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vVehicles && vVehicles.totalCount !== undefined
        ? vVehicles.totalCount
        : prevRowCountState
    );
  }, [vVehicles, vVehicles && vVehicles.totalCount, setRowCountState]);

  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleEditVehicle = (row: any) => {
    setId(row.node.id);
    router.push({
      pathname: `/apps/vehicles/${row.node.id}/edit`,
    });
  };

  const handleDeleteVehicle = (row: any) => {
    setId(row.node.id);
    setImages(row.node.images);
    setDeleteDialogOpen(true);
  };

  const handleSubmitDeleteVehicle = async (e: any) => {
    e.preventDefault();

    // Remove images from server
    images.split(",").forEach(async (image) => await removeFile(image));

    const resultAction = await dispatch(removeVehicle({ id }));

    if (removeVehicle.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);

      toast.success(`Vehicle listing removed successfully!`);
    } else {
      toast.error(`Error removing vehicle: ${resultAction.error}`);
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
          {ability?.can("update", "vehicles") && (
            <IconButton onClick={() => handleEditVehicle(row)}>
              <Icon fontSize={20} icon="bx:edit" />
            </IconButton>
          )}
          {ability?.can("delete", "vehicles") && (
            <IconButton onClick={() => handleDeleteVehicle(row)}>
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
          <PageHeader
            title={
              <Typography sx={{ fontSize: "1.375rem", fontWeight: 700 }}>
                Vehicles
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Search Filters" />
            <CardContent>
              <VehicleSearch handleVehiclesFilter={handleVehiclesFilter} />
            </CardContent>
            <Divider sx={{ m: "0 !important" }} />
            <TableHeader handleRefresh={handleRefresh} />
            {vehiclesSearchParams ? (
              <>
                {vVehicles &&
                vVehicles.edges &&
                vVehicles.edges.length &&
                vVehicles.edges[0]?.cursor === "" ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{ mt: 6, mb: 6 }} />
                  </Box>
                ) : (
                  <>
                    {vVehicles &&
                    vVehicles.edges &&
                    vVehicles.edges.length > 0 ? (
                      <DataGrid
                        autoHeight
                        rows={vVehicles.edges}
                        columns={columns}
                        getRowId={(vehicle) => vehicle.cursor}
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
                          There are no vehicles matching criteria.
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
                  Please select some parameters to show vehicle listings.
                </Typography>
              </Box>
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
          Remove Vehicle
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
                  onClick={(e) => handleSubmitDeleteVehicle(e)}
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

VehiclesList.acl = {
  action: "read",
  subject: "vehicles",
};

export default VehiclesList;
