import { Vendor } from "../../vendor/vendor/types";
import { Customer } from "../../frontend/customer/types";

export interface VendorReview {
  id: string;
  vendor: Partial<Vendor>;
  customer: Partial<Customer>;
  stars: number;
  comment: string;
  status: string;
  rating: string;
  publishedAt: string;
}

export interface VendorReviewCount {
  count: string;
}

export interface VendorReviewStarsAvg {
  rating: any;
}
