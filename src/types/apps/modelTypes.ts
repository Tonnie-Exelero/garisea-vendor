import { BrandNode } from "./brandTypes";

export type ModelNode = {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: Partial<BrandNode>;
};

export type ModelRowType = {
  cursor: string;
  node: ModelNode;
};
