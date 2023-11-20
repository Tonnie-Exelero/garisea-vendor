import { Vendor } from "@redux/apps/vendor/vendor/types";

export interface FeaturedVendor {
  id: string;
  vendor: Partial<Vendor>;
  status: string;
  image: string;
  text: string;
  page: string;
  position: string;
  rank: number;
  impressions: number;
  clicks: number;
  targetImpressions: number;
  targetClicks: number;
}
