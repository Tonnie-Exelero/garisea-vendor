export type PermissionNode = {
  id: string;
  name: string;
  slug: string;
  description: string;
  subjects: string;
};

export type PermissionRowType = {
  cursor: string;
  node: PermissionNode;
};
