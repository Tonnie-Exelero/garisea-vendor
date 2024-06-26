// ** MUI Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Others
import CustomChip from "src/@core/components/mui/chip";
import { ThemeColor } from "@core/layouts/types";

interface ColorsType {
  [key: string]: ThemeColor;
}

const statusColors: ColorsType = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

interface AboutOverviewProps {
  user: any;
}
const AboutOverview: React.FC<AboutOverviewProps> = ({ user }) => {
  const { username, email, phone, language, status, role } = user;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Box sx={{ display: "flex", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Username:
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  @{username}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Email:
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {email}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Status:
                </Typography>
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={status}
                  sx={{ fontWeight: 500 }}
                  color={statusColors[status]}
                />
              </Box>
              <Box sx={{ display: "flex", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Role:
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    textTransform: "capitalize",
                  }}
                >
                  {role ? role.name : "King"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Contact:
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {phone}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 4 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 700, color: "text.secondary" }}
                >
                  Language:
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {language}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AboutOverview;
