// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Others
import { subjects } from "@src/configs/subjects";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { idleTimer } from "@src/configs/idleOrReload";

const HomePage = () => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** Hooks
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  return (
    <>
      <Typography variant="h4" sx={{ marginBlock: 4 }}>
        Welcome back {authedVendor.firstName}!
      </Typography>
      <Typography variant="h6" sx={{ marginBlock: 3 }}>
        You can go to any of the links in the cards below to explore your
        dashboard.
      </Typography>
      <Grid container spacing={6} className="match-height">
        {subjects.map((subject, index) => (
          <>
            {subject.name !== "home" && (
              <Grid item md={4} sm={6} xs={12} key={index}>
                <Card>
                  <CardContent sx={{ textAlign: "center", "& svg": { mb: 2 } }}>
                    <Icon icon="bx:credit-card" fontSize="2rem" />
                    <Typography
                      variant="h6"
                      sx={{ mb: 4, textTransform: "capitalize" }}
                    >
                      {subject.name}
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                      {subject.description}
                    </Typography>
                    <Button
                      component={Link}
                      href={subject.path}
                      variant="contained"
                    >
                      Go To {subject.name}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </>
  );
};

HomePage.acl = {
  action: "read",
  subject: "home",
};

export default HomePage;
