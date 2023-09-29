// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { IconButton, Tooltip } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

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
  const { username, email, phone, language, status } = user;

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
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
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
                  sx={{ fontWeight: 500, mr: 2 }}
                  color={statusColors[status]}
                />
                {status === "pending" && (
                  <Tooltip
                    title={
                      "Your information is being verified by Garisea. Once completed successfully, your account will be activated."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {status === "suspended" && (
                  <Tooltip
                    title={
                      "Your account has been suspended. Please contact support to resolve."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {status === "inactive" && (
                  <Tooltip
                    title={
                      "Your account has been deactivated. Please contact support to resolve."
                    }
                    placement="top"
                    sx={{ cursor: "pointer" }}
                  >
                    <IconButton>
                      <Icon icon="material-symbols:error" fontSize={20} />
                    </IconButton>
                  </Tooltip>
                )}
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
                <Typography
                  sx={{ color: "text.secondary", textTransform: "capitalize" }}
                >
                  {language}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={Link}
              href={"/account/settings/account"}
              variant="contained"
              color="info"
              size="small"
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AboutOverview;
