import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const Organization = builder.prismaObject("Organization", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    nicename: t.exposeString("nicename", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    phone: t.exposeString("phone", { nullable: true }),
    logo: t.exposeString("logo", { nullable: true }),
    certificate: t.exposeString("certificate", { nullable: true }),
    kraPin: t.exposeString("kraPin", { nullable: true }),
    address: t.exposeString("address", { nullable: true }),
    address2: t.exposeString("address2", { nullable: true }),
    city: t.exposeString("city", { nullable: true }),
    country: t.exposeString("country", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  organizations: t.prismaConnection({
    type: Organization,
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.organization.findMany({
        ...query,
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: (connection, _args, _ctx, _info) =>
      prisma.organization.count({ ...connection }),
  }),
  organizationsFiltered: t.prismaConnection({
    type: Organization,
    cursor: "id",
    args: {
      filter: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { name: { contains: args.filter } },
          { nicename: { contains: args.filter } },
          { email: { contains: args.filter } },
          { phone: { contains: args.filter } },
          { city: { contains: args.filter } },
          { country: { contains: args.filter } },
        ],
      };

      return await prisma.organization.findMany({
        ...query,
        where,
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: (connection, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { name: { contains: args.filter } },
          { nicename: { contains: args.filter } },
          { email: { contains: args.filter } },
          { phone: { contains: args.filter } },
          { city: { contains: args.filter } },
          { country: { contains: args.filter } },
        ],
      };

      return prisma.organization.count({ ...connection, where });
    },
  }),
  organizationById: t.prismaField({
    type: Organization,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.organization.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
  organizationByName: t.prismaField({
    type: Organization,
    nullable: true,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.organization.findUniqueOrThrow({
        ...query,
        where: {
          name: args.name,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createOrganization: t.prismaField({
    type: "Organization",
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string(),
      phone: t.arg.string(),
      address: t.arg.string(),
      address2: t.arg.string(),
      city: t.arg.string(),
      country: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { name, email, phone, address, address2, city, country } = args;

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
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      nicename: t.arg.string(),
      email: t.arg.string(),
      phone: t.arg.string(),
      address: t.arg.string(),
      address2: t.arg.string(),
      city: t.arg.string(),
      country: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { name, nicename, email, phone, address, address2, city, country } =
        args;

      return await prisma.organization.update({
        ...query,
        where: {
          id: args.id,
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
  updateOrganizationLogo: t.prismaField({
    type: "Organization",
    args: {
      id: t.arg.string({ required: true }),
      logo: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { logo } = args;

      return await prisma.organization.update({
        ...query,
        where: {
          id: args.id,
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
      id: t.arg.string({ required: true }),
      certificate: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { certificate } = args;

      return await prisma.organization.update({
        ...query,
        where: {
          id: args.id,
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
      id: t.arg.string({ required: true }),
      kraPin: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { kraPin } = args;

      return await prisma.organization.update({
        ...query,
        where: {
          id: args.id,
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
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.organization.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
