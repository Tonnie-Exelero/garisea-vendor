// ** MUI Components
import Grid from "@mui/material/Grid";

// ** Demo Components
import AboutOverview from "./AboutOverview";
import ProjectsTable from "./ProjectsTable";
import ActivityTimeline from "./ActivityTimeline";
import ConnectionsTeams from "./ConnectionsTeams";

// ** Types
import { ProfileTabType } from "src/@fake-db/types";

interface ProfileTabProps {
  data: ProfileTabType;
  user: any;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ data, user }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverview user={user} />
      </Grid>
      {/* <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
          <ConnectionsTeams connections={data.connections} teams={data.teamsTech} />
          <Grid item xs={12}>
            <ProjectsTable />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  ) : null;
};

export default ProfileTab;
