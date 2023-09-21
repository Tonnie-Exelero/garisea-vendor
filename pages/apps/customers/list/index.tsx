// ** React Imports
import { useState, useEffect, useCallback, useContext } from "react";

// ** Next Imports
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";

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
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import CardStatisticsHorizontal from "src/@core/components/card-statistics/card-stats-horizontal";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Actions Imports
import {
  fetchCustomers,
  fetchCustomersByStatus,
  fetchFilteredCustomers,
  removeCustomer,
} from "@src/store/apps/frontend/customer";
import apolloClient from "@lib/apollo";
import {
  GET_CUSTOMERS,
  GET_FILTERED_CUSTOMERS,
  GET_CUSTOMERS_BY_STATUS,
} from "@src/api/frontend/customer";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { CardStatsType } from "src/@fake-db/types";
import { ThemeColor } from "src/@core/layouts/types";
import { CustomerRowType } from "src/types/apps/customerTypes";
import { CardStatsHorizontalProps } from "src/@core/components/card-statistics/types";

// ** Custom Table Components Imports
import TableHeader from "@src/views/apps/customer/list/TableHeader";
import CustomerDrawer from "@src/views/apps/customer/list/CustomerDrawer";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";
import { AbilityContext } from "src/layouts/components/acl/Can";
import { removeFile } from "@core/utils/file-manager";

const PAGE_SIZE = 20;

interface CustomerStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: CustomerRowType;
}

const userStatusObj: CustomerStatusType = {
  active: "success",
  pending: "warning",
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
const renderClient = (row: CustomerRowType) => {
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
    headerName: "Customer",
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
            <LinkStyled href={`/apps/customers/${id}/view/account`}>
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
    flex: 0.4,
    minWidth: 270,
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

interface Props {
  customers: any;
}

const CustomerList = (props: Partial<Props>) => {
  // ** Watch for idle time or reload
  idleTimer();

  const { customers } = props;

  // ** State
  const [vCustomers, setVCustomers] = useState<any>(customers);
  const [id, setId] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [customerData, setCustomerData] = useState<any>();
  const [drawerType, setDrawerType] = useState<string>("Add");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [customerDrawerOpen, setCustomerDrawerOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  useEffect(() => {}, [vCustomers]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query:
        type === "status"
          ? GET_CUSTOMERS_BY_STATUS
          : type === "filter"
          ? GET_FILTERED_CUSTOMERS
          : GET_CUSTOMERS,
      variables: {
        ...(type === "status"
          ? { status }
          : type === "filter"
          ? { filter: value }
          : {}),
        first: PAGE_SIZE,
      },
      fetchPolicy: "no-cache",
    });

    setPaginationModel({
      page: 0,
      pageSize: PAGE_SIZE,
    });

    setVCustomers(
      type === "status"
        ? () => {
            const { customersByStatus }: any = data;

            return customersByStatus;
          }
        : type === "filter"
        ? () => {
            const { customersFiltered }: any = data;

            return customersFiltered;
          }
        : () => {
            const { customers }: any = data;

            return customers;
          }
    );
    setIsLoading(false);
  }, [paginationModel, vCustomers, isLoading]);

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vCustomers.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newCustomers = await dispatch(
          type === "status"
            ? fetchCustomersByStatus({
                status,
                first: paginationModel.pageSize,
                after: vCustomers.pageInfo.endCursor,
              })
            : type === "filter"
            ? fetchFilteredCustomers({
                filter: value,
                first: paginationModel.pageSize,
                after: vCustomers.pageInfo.endCursor,
              })
            : fetchCustomers({
                first: paginationModel.pageSize,
                after: vCustomers.pageInfo.endCursor,
              })
        );

        setVCustomers(
          type === "status"
            ? () => {
                const { customersByStatus }: any = newCustomers.payload;

                return customersByStatus;
              }
            : type === "filter"
            ? () => {
                const { customersFiltered }: any = newCustomers.payload;

                return customersFiltered;
              }
            : () => {
                const { customers }: any = newCustomers.payload;

                return customers;
              }
        );
      }

      if (vCustomers.pageInfo.hasPreviousPage && page < paginationModel.page) {
        setPaginationModel(newPaginationModel);

        const newCustomers = await dispatch(
          type === "status"
            ? fetchCustomersByStatus({
                status,
                last: paginationModel.pageSize,
                before: vCustomers.pageInfo.startCursor,
              })
            : type === "filter"
            ? fetchFilteredCustomers({
                filter: value,
                last: paginationModel.pageSize,
                before: vCustomers.pageInfo.startCursor,
              })
            : fetchCustomers({
                last: paginationModel.pageSize,
                before: vCustomers.pageInfo.startCursor,
              })
        );

        setVCustomers(
          type === "status"
            ? () => {
                const { customersByStatus }: any = newCustomers.payload;

                return customersByStatus;
              }
            : type === "filter"
            ? () => {
                const { customersFiltered }: any = newCustomers.payload;

                return customersFiltered;
              }
            : () => {
                const { customers }: any = newCustomers.payload;

                return customers;
              }
        );
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vCustomers]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(
    vCustomers.totalCount || 0
  );
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vCustomers.totalCount !== undefined
        ? vCustomers.totalCount
        : prevRowCountState
    );
  }, [vCustomers, vCustomers.totalCount, setRowCountState]);

  const handleFilter = useCallback(
    async (val: string) => {
      setType("filter");
      setValue(val);

      const filteredCustomers = await dispatch(
        fetchFilteredCustomers({
          first: paginationModel.pageSize,
          filter: val,
        })
      );

      setPaginationModel({
        page: 0,
        pageSize: PAGE_SIZE,
      });

      const { customersFiltered }: any = filteredCustomers.payload;

      setVCustomers(customersFiltered);
    },
    [dispatch, vCustomers, value]
  );

  const handleStatusChange = useCallback(
    async (e: SelectChangeEvent) => {
      setType("status");

      const {
        target: { value },
      } = e;

      setStatus(value);

      const statusCustomers = await dispatch(
        fetchCustomersByStatus({ first: PAGE_SIZE, status: value })
      );

      setPaginationModel({
        page: 0,
        pageSize: PAGE_SIZE,
      });

      const { customersByStatus }: any = statusCustomers.payload;

      setVCustomers(customersByStatus);
    },
    [dispatch, value]
  );

  const toggleCustomerDrawer = (type: string) => {
    setDrawerType(type);
    setCustomerDrawerOpen(!customerDrawerOpen);
  };
  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleDeleteCustomer = (row: any) => {
    setId(row.node.id);
    setImage(row.node.image);
    setDeleteDialogOpen(true);
  };

  const handleSubmitDeleteCustomer = async (e: any) => {
    e.preventDefault();

    // Remove image from server
    image && (await removeFile(image));

    const resultAction = await dispatch(removeCustomer({ id }));

    if (removeCustomer.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);

      toast.success(`User  removed successfully!`);
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
          {ability?.can("update", "customers") && (
            <IconButton
              onClick={() => {
                setCustomerData(row.node);
                toggleCustomerDrawer("Update");
              }}
            >
              <Icon fontSize={20} icon="bx:edit" />
            </IconButton>
          )}
          {ability?.can("delete", "customers") && (
            <IconButton onClick={() => handleDeleteCustomer(row)}>
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
          <Card>
            <CardHeader title="Search Filters" />
            <CardContent>
              <Grid container spacing={5}>
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
              toggle={toggleCustomerDrawer}
            />
            {vCustomers &&
            vCustomers.edges &&
            vCustomers.edges.length &&
            vCustomers.edges[0]?.cursor === "" ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ mt: 6, mb: 6 }} />
              </Box>
            ) : (
              <>
                {vCustomers &&
                vCustomers.edges &&
                vCustomers.edges.length > 0 ? (
                  <DataGrid
                    autoHeight
                    rows={vCustomers.edges}
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
                      There are no customers created yet.
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Card>
        </Grid>

        <CustomerDrawer
          open={customerDrawerOpen}
          toggle={toggleCustomerDrawer}
          type={drawerType}
          data={customerData}
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
          Remove Customer
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
                  onClick={(e) => handleSubmitDeleteCustomer(e)}
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

export const getServerSideProps: any = async () => {
  const { data, loading, error } = await apolloClient.query({
    query: GET_CUSTOMERS,
    variables: {
      first: PAGE_SIZE,
    },
  });

  if (loading) {
    toast.loading("Fetching customers...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching customers: ${error}`);
    return undefined;
  }

  const { customers }: any = data;

  return {
    props: {
      customers: { ...customers },
    },
  };
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

CustomerList.acl = {
  action: "read",
  subject: "customers",
};

export default CustomerList;
