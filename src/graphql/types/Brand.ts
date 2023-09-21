import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const Brand = builder.prismaObject("Brand", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  brands: t.prismaConnection({
    type: Brand,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.brand.findMany({
        ...query,
        orderBy: {
          name: 'asc',
        },
      });
    },
    totalCount: (connection, _args, _ctx, _info) =>
      prisma.brand.count({ ...connection }),
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
    totalCount: (connection, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { name: { contains: args.filter } },
          { slug: { contains: args.filter } },
        ],
      };

      return prisma.brand.count({ ...connection, where });
    },
  }),
  brandById: t.prismaField({
    type: Brand,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.brand.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
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
    },
    resolve: async (query, _parent, args, ctx) => {
      const { name, slug, description } = args;

      return await prisma.brand.create({
        ...query,
        data: {
          name,
          slug,
          description,
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
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.brand.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          name: args.name ? args.name : undefined,
          slug: args.slug ? args.slug : undefined,
          description: args.description ? args.description : undefined,
        },
      }),
  }),
  deleteBrand: t.prismaField({
    type: Brand,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.brand.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
