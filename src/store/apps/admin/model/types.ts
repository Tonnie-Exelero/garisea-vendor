import { Brand } from "../brand/types";

export interface Model {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: Partial<Brand>;
}
