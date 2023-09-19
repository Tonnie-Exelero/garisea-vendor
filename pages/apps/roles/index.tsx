// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Actions Imports
import apolloClient from "@lib/apollo";
import { GET_ROLES } from "@src/api/admin/role";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

// ** Demo Components Imports
import Table from "@src/views/apps/role/Table";
import RoleCards from "@src/views/apps/role/RoleCards";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";

const PAGE_SIZE = 20;

interface Props {
  roles: any;
}

const Roles = (props: Partial<Props>) => {
  // ** Watch for idle time or reload
  idleTimer();

  const { roles } = props;

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography sx={{ mb: 4, fontSize: "1.375rem", fontWeight: 700 }}>
            Roles List
          </Typography>
        }
        subtitle={
          <Typography sx={{ color: "text.secondary" }}>
            A role provides access to predefined menus and features so that
            depending on <br /> the assigned role, a user can have access to
            what they need.
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 2 }}>
        <RoleCards roles={roles} />
      </Grid>
      <Grid item xs={12}>
        <Table roles={roles} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: any = async () => {
  const { data, loading, error } = await apolloClient.query({
    query: GET_ROLES,
    variables: {
      first: PAGE_SIZE,
    },
  });

  if (loading) {
    toast.loading("Fetching roles...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching roles: ${error}`);
    return undefined;
  }

  const { roles }: any = data;

  return {
    props: {
      roles: { ...roles },
    },
  };
};

Roles.acl = {
  action: "read",
  subject: "roles",
};

export default Roles;
