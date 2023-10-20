import { PermissionNode } from "./permissionTypes";

export type RoleNode = {
  id: string;
  name: string;
  slug: string;
  description: string;
  ability: string;
  permissions: PermissionNode[];
  users: any[];
};

export type RoleRowType = {
  cursor: string;
  node: RoleNode;
};
