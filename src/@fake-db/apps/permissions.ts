// ** Mock Adapter
import mock from "src/@fake-db/mock";

// ** Types
import { PermissionRowType } from "src/types/apps/permissionTypes";

const data: { permissions: PermissionRowType[] } = {
  permissions: [
    {
      cursor: "",
      node: {
        id: "dhgfhsdvfsvjhfsd",
        name: "Management",
        slug: "management",
        description: "Management permissions",
        subjects: "administrator",
      },
    },
    {
      cursor: "",
      node: {
        id: "dhgfhsdvfsvjhfssd",
        name: "Manage Billing & Roles",
        slug: "billing-roles",
        description: "Manage Billing & Roles",
        subjects: "administrator",
      },
    },
    {
      cursor: "",
      node: {
        id: "dhgfhsdvfsvjhdfsd",
        name: "Add & Remove Users",
        slug: "users",
        description: "Add & Remove Users",
        subjects: "administrator",
      },
    },
    {
      cursor: "",
      node: {
        id: "dhgfhsdvfsvjsahfsd",
        name: "Project Planning",
        slug: "prject",
        description: "Project Planning",
        subjects: "administrator",
      },
    },
    {
      cursor: "",
      node: {
        id: "dhgfhsdvfsvdjhfsd",
        name: "Manage Email Sequences",
        slug: "email",
        description: "Manage Email Sequences",
        subjects: "administrator",
      },
    },
    {
      cursor: "",
      node: {
        id: "dhgfhsdvfsvjfhfsd",
        name: "Client Communication",
        slug: "client",
        description: "Client Communication",
        subjects: "administrator",
      },
    },
  ],
};

// ------------------------------------------------
// GET: Return Permissions List
// ------------------------------------------------
mock.onGet("/apps/permissions/data").reply((config) => {
  const { q = "" } = config.params;
  const queryLowered = q.toLowerCase();
  const filteredData = data.permissions.filter(
    (permissions) =>
      permissions.node.name.toLowerCase().includes(queryLowered) ||
      permissions.node.slug.toLowerCase().includes(queryLowered) ||
      permissions.node.description.toLowerCase().includes(queryLowered)
  );

  return [
    200,
    {
      params: config.params,
      allData: data.permissions,
      permissions: filteredData,
      total: filteredData.length,
    },
  ];
});
