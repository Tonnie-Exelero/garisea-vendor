export type OrganizationNode = {
  id: string;
  name: string;
  nicename: string;
  email: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  country: string;
  logo: string;
  certificate: string;
  kraPin: string;
};

export type OrganizationRowType = {
  cursor: string;
  node: OrganizationNode;
};
