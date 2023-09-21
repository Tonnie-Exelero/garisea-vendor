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
  fetchOrganizations,
  fetchFilteredOrganizations,
  removeOrganization,
} from "@src/store/apps/vendor/organization";
import apolloClient from "@lib/apollo";
import {
  GET_FILTERED_ORGANIZATIONS,
  GET_ORGANIZATIONS,
} from "@src/api/vendor/organization";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { CardStatsType } from "src/@fake-db/types";
import { ThemeColor } from "src/@core/layouts/types";
import { OrganizationRowType } from "src/types/apps/organizationTypes";
import { CardStatsHorizontalProps } from "src/@core/components/card-statistics/types";

// ** Custom Table Components Imports
import TableHeader from "@src/views/apps/organization/list/TableHeader";
import OrganizationDrawer from "@src/views/apps/organization/list/OrganizationDrawer";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";
import { AbilityContext } from "src/layouts/components/acl/Can";
import { removeFile } from "@core/utils/file-manager";

const PAGE_SIZE = 20;

interface OrganizationStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: OrganizationRowType;
}

const userStatusObj: OrganizationStatusType = {
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
const renderClient = (row: OrganizationRowType) => {
  if (row.node.logo) {
    return (
      <CustomAvatar src={row.node.logo} sx={{ mr: 3, width: 32, height: 32 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={"primary"}
        sx={{ mr: 3, width: 32, height: 32, fontSize: ".875rem" }}
      >
        {getInitials(row.node.name)}
      </CustomAvatar>
    );
  }
};

const defaultColumns: GridColDef[] = [
  {
    flex: 0.4,
    minWidth: 270,
    field: "fullName",
    headerName: "Organization",
    renderCell: ({ row }: CellType) => {
      const { id, name, email, phone } = row.node;

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
            <LinkStyled href={`/apps/organizations/${id}/view/account`}>
              {name}
            </LinkStyled>
            <Typography
              noWrap
              variant="caption"
              sx={{ color: "text.disabled" }}
            >
              {email} {phone && " | " + phone}
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
            {row.node.address} {row.node.address2 && `, ${row.node.address2}`}
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
];

interface Props {
  organizations: any;
}

const OrganizationList = (props: Partial<Props>) => {
  // ** Watch for idle time or reload
  idleTimer();

  const { organizations } = props;

  // ** State
  const [vOrganizations, setVOrganizations] = useState<any>(organizations);
  const [id, setId] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [certificate, setCertificate] = useState<string>("");
  const [organizationData, setOrganizationData] = useState<any>();
  const [drawerType, setDrawerType] = useState<string>("Add");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [organizationDrawerOpen, setOrganizationDrawerOpen] =
    useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  useEffect(() => {}, [vOrganizations]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apolloClient.query({
      query: type === "filter" ? GET_FILTERED_ORGANIZATIONS : GET_ORGANIZATIONS,
      variables: {
        ...(type === "filter" ? { filter: value } : {}),
        first: PAGE_SIZE,
      },
      fetchPolicy: "no-cache",
    });

    setPaginationModel({
      page: 0,
      pageSize: PAGE_SIZE,
    });

    setVOrganizations(
      type === "filter"
        ? () => {
            const { organizationsFiltered }: any = data;

            return organizationsFiltered;
          }
        : () => {
            const { organizations }: any = data;

            return organizations;
          }
    );
    setIsLoading(false);
  }, [paginationModel, vOrganizations, isLoading]);

  const handlePaginationModelChange = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setIsLoading(true);

      const { page } = newPaginationModel;

      if (vOrganizations.pageInfo.hasNextPage && page > paginationModel.page) {
        setPaginationModel(newPaginationModel);
        const newOrganizations = await dispatch(
          type === "filter"
            ? fetchFilteredOrganizations({
                filter: value,
                first: paginationModel.pageSize,
                after: vOrganizations.pageInfo.endCursor,
              })
            : fetchOrganizations({
                first: paginationModel.pageSize,
                after: vOrganizations.pageInfo.endCursor,
              })
        );

        setVOrganizations(
          type === "filter"
            ? () => {
                const { organizationsFiltered }: any = newOrganizations.payload;

                return organizationsFiltered;
              }
            : () => {
                const { organizations }: any = newOrganizations.payload;

                return organizations;
              }
        );
      }

      if (
        vOrganizations.pageInfo.hasPreviousPage &&
        page < paginationModel.page
      ) {
        setPaginationModel(newPaginationModel);

        const newOrganizations = await dispatch(
          type === "filter"
            ? fetchFilteredOrganizations({
                filter: value,
                last: paginationModel.pageSize,
                before: vOrganizations.pageInfo.startCursor,
              })
            : fetchOrganizations({
                last: paginationModel.pageSize,
                before: vOrganizations.pageInfo.startCursor,
              })
        );

        setVOrganizations(
          type === "filter"
            ? () => {
                const { organizationsFiltered }: any = newOrganizations.payload;

                return organizationsFiltered;
              }
            : () => {
                const { organizations }: any = newOrganizations.payload;

                return organizations;
              }
        );
      }

      setIsLoading(false);
    },
    [dispatch, paginationModel, vOrganizations]
  );

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(
    vOrganizations.totalCount || 0
  );
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      vOrganizations.totalCount !== undefined
        ? vOrganizations.totalCount
        : prevRowCountState
    );
  }, [vOrganizations, vOrganizations.totalCount, setRowCountState]);

  const handleFilter = useCallback(
    async (val: string) => {
      setType("filter");
      setValue(val);

      const filteredOrganizations = await dispatch(
        fetchFilteredOrganizations({
          first: paginationModel.pageSize,
          filter: val,
        })
      );

      setPaginationModel({
        page: 0,
        pageSize: PAGE_SIZE,
      });

      const { organizationsFiltered }: any = filteredOrganizations.payload;

      setVOrganizations(organizationsFiltered);
    },
    [dispatch, vOrganizations, value]
  );

  const toggleOrganizationDrawer = (type: string) => {
    setDrawerType(type);
    setOrganizationDrawerOpen(!organizationDrawerOpen);
  };
  const handleDeleteDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen);

  const handleDeleteOrganization = (row: any) => {
    setId(row.node.id);
    setLogo(row.node.logo);
    setCertificate(row.node.certificate);
    setDeleteDialogOpen(true);
  };

  const handleSubmitDeleteOrganization = async (e: any) => {
    e.preventDefault();

    // Remove files from server
    logo && (await removeFile(logo));
    certificate && (await removeFile(certificate));

    const resultAction = await dispatch(removeOrganization({ id }));

    if (removeOrganization.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);

      toast.success(`Organization removed successfully!`);
    } else {
      toast.error(`Error removing organization: ${resultAction.error}`);
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
          {ability?.can("update", "organizations") && (
            <IconButton
              onClick={() => {
                setOrganizationData(row.node);
                toggleOrganizationDrawer("Update");
              }}
            >
              <Icon fontSize={20} icon="bx:edit" />
            </IconButton>
          )}
          {ability?.can("delete", "organizations") && (
            <IconButton onClick={() => handleDeleteOrganization(row)}>
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
            <TableHeader
              value={value}
              handleFilter={handleFilter}
              handleRefresh={handleRefresh}
              toggle={toggleOrganizationDrawer}
            />
            {vOrganizations &&
            vOrganizations.edges &&
            vOrganizations.edges.length &&
            vOrganizations.edges[0]?.cursor === "" ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ mt: 6, mb: 6 }} />
              </Box>
            ) : (
              <>
                {vOrganizations &&
                vOrganizations.edges &&
                vOrganizations.edges.length > 0 ? (
                  <DataGrid
                    autoHeight
                    rows={vOrganizations.edges}
                    columns={columns}
                    getRowId={(organization) => organization.cursor}
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
                      There are no organizations created yet.
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Card>
        </Grid>

        <OrganizationDrawer
          open={organizationDrawerOpen}
          toggle={toggleOrganizationDrawer}
          type={drawerType}
          data={organizationData}
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
          Remove Organization
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
                  onClick={(e) => handleSubmitDeleteOrganization(e)}
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
    query: GET_ORGANIZATIONS,
    variables: {
      first: PAGE_SIZE,
    },
  });

  if (loading) {
    toast.loading("Fetching organizations...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching organizations: ${error}`);
    return undefined;
  }

  const { organizations }: any = data;

  return {
    props: {
      organizations: { ...organizations },
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

OrganizationList.acl = {
  action: "read",
  subject: "organizations",
};

export default OrganizationList;
