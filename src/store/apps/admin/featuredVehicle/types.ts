import { Vehicle } from "@redux/apps/vendor/vehicle/types";
import { Vendor } from "../../vendor/vendor/types";

export interface FeaturedVehicle {
  id: string;
  vendor: Partial<Vendor>;
  vehicle: Partial<Vehicle>;
  status: string;
  page: string;
  position: string;
  rank: number;
  impressions: number;
  clicks: number;
  targetImpressions: number;
  targetClicks: number;
}
