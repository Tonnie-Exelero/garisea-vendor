import { ThemeColor } from "src/@core/layouts/types";

/**
 * These are subjects as based on the /src/navigation/vertical/index.ts
 * and used for ACL role-based views setup.
 *
 * Add all new subjects to the array.
 */
export const subjectsList = [
  "home",
  "profile",
  "brands",
  "models",
  "permissions",
  "roles",
  "customers",
  "vendors",
  "users",
  "vehicles",
];

interface Colors {
  [key: string]: ThemeColor;
}

export const colors: Colors = {
  home: "error",
  profile: "primary",
  brands: "info",
  models: "success",
  permissions: "warning",
  roles: "primary",
  customers: "error",
  vendors: "info",
  users: "success",
  vehicles: "warning",
};
