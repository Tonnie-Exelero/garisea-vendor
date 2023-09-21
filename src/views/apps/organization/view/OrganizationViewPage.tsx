// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";

// ** Demo Components Imports
import OrganizationViewLeft from "src/views/apps/organization/view/OrganizationViewLeft";
import OrganizationViewRight from "src/views/apps/organization/view/OrganizationViewRight";

type Props = {
  tab: string;
  invoiceData: InvoiceType[];
  organization: any;
};

const OrganizationView = ({ tab, invoiceData, organization }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <OrganizationViewLeft organization={organization} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <OrganizationViewRight tab={tab} invoiceData={invoiceData} organization={organization} />
      </Grid>
    </Grid>
  );
};

export default OrganizationView;
