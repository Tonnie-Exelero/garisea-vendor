// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Vehicles",
      icon: "bx:car",
      path: "/apps/vehicles/list",
      action: "read",
      subject: "vehicles",
    },
    {
      title: "Profile",
      icon: "bx:bxs-user-account",
      action: "read",
      subject: "profile",
      path: "/account/user/profile",
    },
    {
      title: "Settings",
      icon: "bx:cog",
      action: "read",
      subject: "profile",
      path: "/account/settings/account",
    },
    {
      title: "Pages",
      icon: "bx:dock-top",
      action: "read",
      subject: "pages",
      children: [
        {
          title: "FAQ",
          path: "/pages/faq",
        },
        {
          title: "Help Center",
          path: "/pages/help-center",
        },
      ],
    },
  ];
};

export default navigation;
