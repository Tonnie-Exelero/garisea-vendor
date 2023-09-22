import { ThemeColor } from "src/@core/layouts/types";
import { OrganizationNode } from "../types/apps/organizationTypes";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type VendorDataType = {
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
  role: any;
  avatarColor?: ThemeColor;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  vendor: VendorDataType | null;
  setLoading: (value: boolean) => void;
  setVendor: (value: VendorDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
};
