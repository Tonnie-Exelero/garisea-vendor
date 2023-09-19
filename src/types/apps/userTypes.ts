// ** Types
import { ThemeColor } from "src/@core/layouts/types";
import { RoleNode } from "./roleTypes";

export type UserNode = {
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
  role: {
    id: string;
    name: string;
    slug: string;
  };
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

export type UserRowType = {
  cursor: string;
  node: UserNode;
};
