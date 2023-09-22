// ** MUI Components
import Grid from "@mui/material/Grid";

// ** Components
import AboutOverview from "./AboutOverview";
import OrganizationInfo from "./OrganizationInfo";

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
      <Grid item lg={8} md={7} xs={12}>
        <OrganizationInfo vendor={user} />
      </Grid>
    </Grid>
  ) : null;
};

export default ProfileTab;
