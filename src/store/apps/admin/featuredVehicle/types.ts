import { Vehicle } from "@redux/apps/vendor/vehicle/types";

export interface FeaturedVehicle {
  id: string;
  vehicle: Partial<Vehicle>;
  page: string;
  position: string;
  rank: number;
  impressions: number;
  clicks: number;
  targetImpressions: number;
  targetClicks: number;
}
