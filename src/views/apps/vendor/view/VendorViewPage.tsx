// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";

// ** Demo Components Imports
import VendorViewLeft from "src/views/apps/vendor/view/VendorViewLeft";
import VendorViewRight from "src/views/apps/vendor/view/VendorViewRight";

type Props = {
  tab: string;
  invoiceData: InvoiceType[];
  vendor: any;
};

const VendorView = ({ tab, invoiceData, vendor }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <VendorViewLeft vendor={vendor} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <VendorViewRight tab={tab} invoiceData={invoiceData} vendor={vendor} />
      </Grid>
    </Grid>
  );
};

export default VendorView;
