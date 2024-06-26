// ** Next Import
import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";

// ** Third Party Imports
import axios from "axios";

// ** Demo Components Imports
import UserProfile from "src/views/pages/authed-user/profile/UserProfile";

// ** Types
import { UserProfileActiveTab } from "src/@fake-db/types";

// ** Others
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { idleTimer } from "@src/configs/idleOrReload";

const UserProfileTab = ({
  tab,
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** Hooks
  const { authedVendor } = useSelector((state: RootState) => state.authedVendor);

  return <UserProfile tab={tab} data={data} user={authedVendor} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: "profile" } },
      { params: { tab: "teams" } },
      { params: { tab: "projects" } },
      { params: { tab: "connections" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await axios.get("/pages/profile", {
    params: { tab: params?.tab },
  });
  const data: UserProfileActiveTab = res.data;

  return {
    props: {
      data,
      tab: params?.tab,
    },
  };
};

UserProfileTab.acl = {
  action: "read",
  subject: "profile",
};

export default UserProfileTab;
