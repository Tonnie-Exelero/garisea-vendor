// ** Next Import
import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";

// ** Demo Components Imports
import AccountSettings from "src/views/pages/authed-user/account/AccountSettings";

// ** Others
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { idleTimer } from "@src/configs/idleOrReload";

const AccountSettingsTab = ({
  tab,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** Hooks
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  return <AccountSettings tab={tab} user={authedVendor} />;
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
  return {
    props: {
      tab: params?.tab,
    },
  };
};

AccountSettingsTab.acl = {
  action: "read",
  subject: "profile",
};

export default AccountSettingsTab;
