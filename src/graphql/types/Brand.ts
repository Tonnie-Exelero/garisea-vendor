import prisma from "@lib/prisma";
import { builder } from "../builder";

export const Brand = builder.prismaObject("Brand", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  brands: t.prismaConnection({
    type: Brand,
    cursor: "id",
    args: {
      hasVehicles: t.arg.string(),
      orderBy: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      return await prisma.brand.findMany({
        ...query,
        where: {
          ...(args.hasVehicles === "yes" && {
            Vehicle: {
              some: {},
            },
          }),
        },
        orderBy: {
          ...(args.orderBy === "random" ? { id: "desc" } : { name: "asc" }),
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.brand.count({
        ...connection,
        where: {
          ...(args.hasVehicles === "yes" && {
            Vehicle: {
              some: {},
            },
          }),
        },
      }),
  }),
  brandsFiltered: t.prismaConnection({
    type: Brand,
    cursor: "id",
    args: {
      filter: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { name: { contains: args.filter } },
          { slug: { contains: args.filter } },
        ],
      };

      return await prisma.brand.findMany({
        ...query,
        where,
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { name: { contains: args.filter } },
          { slug: { contains: args.filter } },
        ],
      };

      return await prisma.brand.count({ ...connection, where });
    },
  }),
  brandById: t.prismaField({
    type: Brand,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.brand.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
  brandBySlug: t.prismaField({
    type: Brand,
    nullable: true,
    args: {
      slug: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.brand.findUnique({
        ...query,
        where: {
          slug: args.slug,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createBrand: t.prismaField({
    type: Brand,
    args: {
      name: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      description: t.arg.string({ required: false }),
      image: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { name, slug, description, image } = args;

      return await prisma.brand.create({
        ...query,
        data: {
          name,
          slug,
          description,
          image,
        },
      });
    },
  }),
  updateBrand: t.prismaField({
    type: Brand,
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      slug: t.arg.string(),
      description: t.arg.string(),
      image: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.brand.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          name: args.name ? args.name : undefined,
          slug: args.slug ? args.slug : undefined,
          description: args.description ? args.description : undefined,
          image: args.image ? args.image : undefined,
        },
      }),
  }),
  deleteBrand: t.prismaField({
    type: Brand,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.brand.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
