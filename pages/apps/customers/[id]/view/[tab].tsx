// ** Next Import
import { InferGetServerSidePropsType } from "next/types";

// ** Third Party Imports
import axios from "axios";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";

// ** Demo Components Imports
import CustomerViewPage from "src/views/apps/customer/view/CustomerViewPage";

// ** API
import apolloClient from "@lib/apollo";
import { GET_CUSTOMER_BY_ID } from "@api/frontend/customer";

// ** Others
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";

const CustomerView = ({
  customer,
  tab,
  invoiceData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Watch for idle time or reload
  idleTimer();

  return (
    <CustomerViewPage tab={tab} invoiceData={invoiceData} customer={customer} />
  );
};

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;
  const res = await axios.get("/apps/invoice/invoices");
  const invoiceData: InvoiceType[] = res.data.allData;

  const { data, loading, error } = await apolloClient.query({
    query: GET_CUSTOMER_BY_ID,
    variables: {
      id,
    },
  });

  if (loading) {
    toast.loading("Fetching customer...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching customer: ${error}`);
    return undefined;
  }

  return {
    props: {
      customer: data.customerById,
      invoiceData,
      tab: params?.tab,
    },
  };
};

CustomerView.acl = {
  action: "read",
  subject: "customers",
};

export default CustomerView;
