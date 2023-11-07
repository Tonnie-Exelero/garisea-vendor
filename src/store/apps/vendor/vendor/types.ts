import { Organization } from "../organization/types";

export interface Vendor {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  storeLink: string;
  language: string;
  status: string;
  address: string;
  city: string;
  country: string;
  emailVerified: string;
  vendorVerified: string;
  addedOrganization: string;
  identification: string;
  onlineStatus: string;
  impressions: number;
  pageOpened: number;
  organization: Partial<Organization>;
}
