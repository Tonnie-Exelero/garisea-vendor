import { Role } from "../role/types";

export interface User {
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
  token?: string;
  emailVerified: string;
  onlineStatus: string;
  role: Partial<Role>;
}
