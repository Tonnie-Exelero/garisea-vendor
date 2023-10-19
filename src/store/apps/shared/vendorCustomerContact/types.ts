import { Vendor } from "../../vendor/vendor/types";
import { Customer } from "../../frontend/customer/types";
import { Vehicle } from "../../vendor/vehicle/types";

export interface VendorCustomerContact {
  id: string;
  vendor: Partial<Vendor>;
  customer: Partial<Customer>;
  vehicle: Partial<Vehicle>;
  latestMessageTime: string;
}
