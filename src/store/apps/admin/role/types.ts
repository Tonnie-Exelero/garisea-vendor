import { Permission } from "../permission/types";

export interface Role {
  id: string;
  name: string;
  slug: string;
  description: string;
  ability: string;
  permissions: Permission[] | any[];
  users: any[];
}
