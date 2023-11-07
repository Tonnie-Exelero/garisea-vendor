export type BrandNode = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type BrandRowType = {
  cursor: string;
  node: BrandNode;
};
