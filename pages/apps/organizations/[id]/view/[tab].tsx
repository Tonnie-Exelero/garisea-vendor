// ** Next Import
import { InferGetServerSidePropsType } from "next/types";
import Link from "next/link";

// ** MUI Imports
import { Button } from "@mui/material";

// ** Third Party Imports
import axios from "axios";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";

// ** Demo Components Imports
import OrganizationViewPage from "src/views/apps/organization/view/OrganizationViewPage";

// ** API
import apolloClient from "@lib/apollo";
import { GET_ORGANIZATION_BY_ID } from "@api/vendor/organization";

// ** Others
import Icon from "@components/icon";
import toast from "react-hot-toast";
import { idleTimer } from "@src/configs/idleOrReload";

const OrganizationView = ({
  organization,
  tab,
  invoiceData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Watch for idle time or reload
  idleTimer();

  return (
    <>
      <Button
        component={Link}
        variant="contained"
        href={`/apps/organizations/list`}
        startIcon={<Icon icon="bx:arrow-back" />}
        sx={{ mb: 4 }}
      >
        Organizations List
      </Button>
      <OrganizationViewPage
        tab={tab}
        invoiceData={invoiceData}
        organization={organization}
      />
    </>
  );
};

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;
  const res = await axios.get("/apps/invoice/invoices");
  const invoiceData: InvoiceType[] = res.data.allData;

  const { data, loading, error } = await apolloClient.query({
    query: GET_ORGANIZATION_BY_ID,
    variables: {
      id,
    },
  });

  if (loading) {
    toast.loading("Fetching organization...");
  }

  if (error) {
    console.error(error);
    toast.error(`An error occurred while fetching organization: ${error}`);
    return undefined;
  }

  return {
    props: {
      organization: data.organizationById,
      invoiceData,
      tab: params?.tab,
    },
  };
};

OrganizationView.acl = {
  action: "read",
  subject: "organizations",
};

export default OrganizationView;
