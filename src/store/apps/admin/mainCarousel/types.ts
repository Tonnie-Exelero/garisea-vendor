import { Vendor } from "../../vendor/vendor/types";

export interface MainCarousel {
  id: string;
  vendor: Partial<Vendor>;
  status: string;
  type: string;
  title: string;
  image: string;
  buttonLink: string;
  buttonText: string;
  description: string;
  rank: number;
  impressions: number;
  clicks: number;
  targetImpressions: number;
  targetClicks: number;
}
