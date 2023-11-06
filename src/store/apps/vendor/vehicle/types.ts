import { Vendor } from "../vendor/types";
import { Brand } from "../../admin/brand/types";
import { Model } from "../../admin/model/types";

export interface Vehicle {
  id: string;
  entryNo: string;
  vendor: Partial<Vendor>;
  brand: Partial<Brand>;
  model: Partial<Model>;
  trim: string;
  slug: string;
  yearOfManufacture: string;
  yearOfFirstRegistration: string;
  registered: string;
  registrationNo: string;
  condition: string;
  mileage: number;
  mileageMetric: string;
  transmissionType: string;
  fuelType: string;
  engineCapacity: number;
  exteriorColor: string;
  upholstery: string;
  images: string;
  status: string;
  viewingLocation: string;
  vehicleOriginCountry: string;
  engineType: string;
  driveType: string;
  vinNo: string;
  bodyType: string;
  interiorColor: string;
  steering: string;
  seats: number;
  doors: number;
  listingPrice: number;
  discountedPrice: number;
  discountAmount: number;
  allowedPaymentModes: string;
  offerType: string;
  features: string;
  views: number;
  extraInfo: string;
  reserved: string;
  sold: string;
  publishedAt: string;
  impressions: number;
  detailExpands: number;
  interested: number;
  vehicleVerified: string;
}
