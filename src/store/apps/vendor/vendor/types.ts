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
  language: string;
  status: string;
  address: string;
  city: string;
  country: string;
  emailVerified: string;
  addedOrganization: string;
  organization: Partial<Organization>;
}
