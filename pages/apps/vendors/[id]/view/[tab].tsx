// ** Next Import
import { InferGetServerSidePropsType } from "next/types";

// ** Third Party Imports
import axios from "axios";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";

// ** Demo Components Imports
import VendorViewPage from "src/views/apps/vendor/view/VendorViewPage";

// ** API
import apolloClient from "@lib/apollo";
import { GET_VENDOR_BY_ID } from "@api/vendor/vendor";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";

const VendorView = ({
  vendor,
  tab,
  invoiceData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Watch for idle time or reload
  idleTimer();

  return <VendorViewPage tab={tab} invoiceData={invoiceData} vendor={vendor} />;
};

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;
  const res = await axios.get("/apps/invoice/invoices");
  const invoiceData: InvoiceType[] = res.data.allData;

  const { data, loading, error } = await apolloClient.query({
    query: GET_VENDOR_BY_ID,
    variables: {
      id,
    },
  });

  if (loading) {
    toast.loading("Fetching vendor...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching vendor: ${error}`);
    return undefined;
  }

  return {
    props: {
      vendor: data.vendorById,
      invoiceData,
      tab: params?.tab,
    },
  };
};

VendorView.acl = {
  action: "read",
  subject: "vendors",
};

export default VendorView;
