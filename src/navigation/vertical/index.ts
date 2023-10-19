// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const navigation = (): VerticalNavItemsType => {
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  return [
    {
      title: "Vehicles",
      icon: "bx:car",
      path: `/${authedVendor.id}/apps/vehicles/list`,
      action: "read",
      subject: "vehicles",
    },
    {
      title: "Chat",
      icon: "bx:message",
      action: "read",
      subject: "messages",
      children: [
        {
          title: "Admin",
          path: `/${authedVendor.id}/apps/chat/admin`,
        },
      ],
    },
    {
      title: "Profile",
      icon: "bx:bxs-user-account",
      action: "read",
      subject: "profile",
      path: `/account/user/profile`,
    },
    {
      title: "Settings",
      icon: "bx:cog",
      action: "read",
      subject: "profile",
      path: `/account/settings/account`,
    },
    // {
    //   title: "Pages",
    //   icon: "bx:dock-top",
    //   action: "read",
    //   subject: "pages",
    //   children: [
    //     {
    //       title: "FAQ",
    //       path: "/pages/faq",
    //     },
    //     {
    //       title: "Help Center",
    //       path: "/pages/help-center",
    //     },
    //   ],
    // },
  ];
};

export default navigation;
