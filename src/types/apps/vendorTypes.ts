// ** Types
import { ThemeColor } from "src/@core/layouts/types";
import { OrganizationNode } from "./organizationTypes";

export type VendorNode = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  language: string;
  status: string;
  address: string;
  city: string;
  country: string;
  emailVerified: string;
  addedOrganization: string;
  organization: Partial<OrganizationNode>;
  avatarColor?: ThemeColor;
};

export type ProjectListDataType = {
  id: number;
  img: string;
  hours: string;
  totalTask: string;
  projectType: string;
  projectTitle: string;
  progressValue: number;
  progressColor: ThemeColor;
};

export type VendorRowType = {
  cursor: string;
  node: VendorNode;
};
