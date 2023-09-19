// ** Next Import
import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";

// ** Third Party Imports
import axios from "axios";

// ** Types
import { PricingDataType } from "src/@core/components/plan-details/types";

// ** Demo Components Imports
import AccountSettings from "src/views/pages/account-settings/AccountSettings";

// ** Others
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

const AccountSettingsTab = ({
  tab,
  apiPricingPlanData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** Hooks
  const { user } = useSelector((state: RootState) => state.singleUser);

  return (
    <AccountSettings
      tab={tab}
      apiPricingPlanData={apiPricingPlanData}
      user={user}
    />
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: "account" } },
      { params: { tab: "security" } },
      { params: { tab: "billing-plan" } },
      { params: { tab: "notifications" } },
      { params: { tab: "connections" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await axios.get("/pages/pricing");
  const data: PricingDataType = res.data;

  return {
    props: {
      tab: params?.tab,
      apiPricingPlanData: data.pricingPlans,
    },
  };
};

AccountSettingsTab.acl = {
  action: "read",
  subject: "profile",
};

export default AccountSettingsTab;
