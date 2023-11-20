import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const Organization = builder.prismaObject("Organization", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    nicename: t.exposeString("nicename", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    phone: t.exposeString("phone", { nullable: true }),
    coverImage: t.exposeString("coverImage", { nullable: true }),
    logo: t.exposeString("logo", { nullable: true }),
    certificate: t.exposeString("certificate", { nullable: true }),
    kraPin: t.exposeString("kraPin", { nullable: true }),
    address: t.exposeString("address", { nullable: true }),
    address2: t.exposeString("address2", { nullable: true }),
    city: t.exposeString("city", { nullable: true }),
    country: t.exposeString("country", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  organizations: t.prismaConnection({
    type: Organization,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.organization.findMany({
        ...query,
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.organization.count({ ...connection }),
  }),
  organizationsFiltered: t.prismaConnection({
    type: Organization,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { filter } = payload;

      const where = {
        OR: [
          { id: { contains: filter } },
          { name: { contains: filter } },
          { nicename: { contains: filter } },
          { email: { contains: filter } },
          { phone: { contains: filter } },
          { city: { contains: filter } },
          { country: { contains: filter } },
        ],
      };

      return await prisma.organization.findMany({
        ...query,
        ...(payload && { where }),
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { filter } = payload;

      const where = {
        OR: [
          { id: { contains: filter } },
          { name: { contains: filter } },
          { nicename: { contains: filter } },
          { email: { contains: filter } },
          { phone: { contains: filter } },
          { city: { contains: filter } },
          { country: { contains: filter } },
        ],
      };

      return await prisma.organization.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  organizationById: t.prismaField({
    type: Organization,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.organization.findUnique({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
  organizationByName: t.prismaField({
    type: Organization,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { name } = payload;

      return await prisma.organization.findUnique({
        ...query,
        where: {
          name,
        },
      });
    },
  }),
  organizationCheckName: t.prismaField({
    type: Organization,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { name } = payload;

      const organization = await prisma.organization.findUnique({
        ...query,
        where: {
          name,
        },
      });

      if (!organization) {
        return {
          name: "no-name",
        };
      }

      if (organization) {
        return {
          name: organization.name,
        };
      }
    },
  }),
}));

builder.mutationFields((t) => ({
  createOrganization: t.prismaField({
    type: "Organization",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { name, email, phone, address, address2, city, country } = payload;

      return await prisma.organization.create({
        ...query,
        data: {
          name,
          email,
          phone,
          address,
          address2,
          city,
          country,
        },
      });
    },
  }),
  updateOrganization: t.prismaField({
    type: "Organization",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        id,
        name,
        nicename,
        email,
        phone,
        address,
        address2,
        city,
        country,
      } = payload;

      return await prisma.organization.update({
        ...query,
        where: {
          id,
        },
        data: {
          name: name ? name : undefined,
          nicename: nicename ? nicename : undefined,
          email: email ? email : undefined,
          phone: phone ? phone : undefined,
          address: address ? address : undefined,
          address2: address2 ? address2 : undefined,
          city: city ? city : undefined,
          country: country ? country : undefined,
        },
      });
    },
  }),
  updateOrganizationCoverImage: t.prismaField({
    type: "Organization",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, coverImage } = payload;

      return await prisma.organization.update({
        ...query,
        where: {
          id,
        },
        data: {
          coverImage: coverImage ? coverImage : undefined,
        },
      });
    },
  }),
  updateOrganizationLogo: t.prismaField({
    type: "Organization",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, logo } = payload;

      return await prisma.organization.update({
        ...query,
        where: {
          id,
        },
        data: {
          logo: logo ? logo : undefined,
        },
      });
    },
  }),
  updateOrganizationCertificate: t.prismaField({
    type: "Organization",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, certificate } = payload;

      return await prisma.organization.update({
        ...query,
        where: {
          id,
        },
        data: {
          certificate: certificate ? certificate : undefined,
        },
      });
    },
  }),
  updateOrganizationKRAPin: t.prismaField({
    type: "Organization",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, kraPin } = payload;

      return await prisma.organization.update({
        ...query,
        where: {
          id,
        },
        data: {
          kraPin: kraPin ? kraPin : undefined,
        },
      });
    },
  }),
  deleteOrganization: t.prismaField({
    type: "Organization",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.organization.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
