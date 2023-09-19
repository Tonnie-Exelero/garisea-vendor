// ** React Imports
import { useEffect } from "react";

// ** Next Import
import { InferGetServerSidePropsType } from "next/types";
import Link from "next/link";

// ** MUI Imports
import { Button } from "@mui/material";

// ** Demo Components Imports
import UserViewPage from "src/views/apps/user/view/UserViewPage";

// ** API
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { fetchUserById } from "@src/store/apps/admin/user/single";

// ** Others
import Icon from "@components/icon";
import { idleTimer } from "@src/configs/idleOrReload";

const UserView = ({
  id,
  tab,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Watch for idle time or reload
  idleTimer();

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.singleUser);

  useEffect(() => {
    dispatch(fetchUserById({ id }));
  }, [dispatch]);

  return (
    <>
      <Button
        component={Link}
        variant="contained"
        href={`/apps/users/list`}
        startIcon={<Icon icon="bx:arrow-back" />}
        sx={{ mb: 4 }}
      >
        Users List
      </Button>
      <UserViewPage tab={tab} user={user} />
    </>
  );
};

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;

  return {
    props: {
      id,
      tab: params?.tab,
    },
  };
};

UserView.acl = {
  action: "read",
  subject: "users",
};

export default UserView;
