import { VendorNode } from "./vendorTypes";
import { BrandNode } from "./brandTypes";
import { ModelNode } from "./modelTypes";

export type VehicleNode = {
  id: string;
  entryNo: string;
  vendor: Partial<VendorNode>;
  brand: Partial<BrandNode>;
  model: Partial<ModelNode>;
  trim: string;
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
  allowedPaymentModes: string;
  offerType: string;
  features: string;
  views: number;
  extraInfo: string;
  reserved: string;
  sold: string;
};

export type VehicleRowType = {
  cursor: string;
  node: VehicleNode;
};
