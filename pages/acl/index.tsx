// ** React Imports
import { useContext } from "react";

// ** Context Imports
import { AbilityContext } from "src/layouts/components/acl/Can";

// ** MUI Imports
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

const ACLPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext);

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title="Common" />
          <CardContent>
            <Typography sx={{ mb: 4 }}>
              No ability is required to view this card
            </Typography>
            <Typography sx={{ color: "primary.main" }}>
              This card is visible to 'user' and 'admin' both
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {ability?.can("read", "analytics") ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title="Analytics" />
            <CardContent>
              <Typography sx={{ mb: 4 }}>
                User with 'Analytics' subject's 'Read' ability can view this
                card
              </Typography>
              <Typography sx={{ color: "error.main" }}>
                This card is visible to 'admin' only
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
};

ACLPage.acl = {
  action: "read",
  subject: "acl-page",
};

export default ACLPage;
