import { Vendor } from "../../vendor/vendor/types";

export interface Banner {
  id: string;
  vendor: Partial<Vendor>;
  status: string;
  type: string;
  title: string;
  link: string;
  image: string;
  page: string;
  position: string;
  rank: number;
  impressions: number;
  clicks: number;
  targetImpressions: number;
  targetClicks: number;
}
