import { User } from "../../admin/user/types";
import { Vendor } from "../../vendor/vendor/types";

export interface AdminVendorContact {
  id: string;
  user: Partial<User>;
  vendor: Partial<Vendor>;
  latestMessageTime: string;
}
