import { Vehicle } from "../../vendor/vehicle/types";
import { Customer } from "../../frontend/customer/types";

export interface VehicleReview {
  id: string;
  vehicle: Partial<Vehicle>;
  customer: Partial<Customer>;
  stars: number;
  comment: string;
  status: string;
  rating: string;
  publishedAt: string;
}

export interface VehicleReviewCount {
  count: string;
}

export interface VehicleReviewStarsAvg {
  rating: any;
}
