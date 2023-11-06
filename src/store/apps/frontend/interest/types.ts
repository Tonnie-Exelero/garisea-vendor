import { Vehicle } from "@redux/apps/vendor/vehicle/types";
import { Customer } from "../customer/types";

export interface Interest {
  id: string;
  customer: Partial<Customer>;
  vehicle: Partial<Vehicle>;
}
