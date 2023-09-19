// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";

// ** Demo Components Imports
import CustomerViewLeft from "src/views/apps/customer/view/CustomerViewLeft";
import CustomerViewRight from "src/views/apps/customer/view/CustomerViewRight";

type Props = {
  tab: string;
  invoiceData: InvoiceType[];
  customer: any;
};

const CustomerView = ({ tab, invoiceData, customer }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <CustomerViewLeft customer={customer} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <CustomerViewRight tab={tab} invoiceData={invoiceData} customer={customer} />
      </Grid>
    </Grid>
  );
};

export default CustomerView;
