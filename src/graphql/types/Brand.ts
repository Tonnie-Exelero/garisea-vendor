import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const Brand = builder.prismaObject("Brand", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  brands: t.prismaConnection({
    type: Brand,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.brand.findMany({
        ...query,
        ...(payload && {
          where: {
            ...(payload.hasVehicles === "yes" && {
              Vehicle: {
                some: {},
              },
            }),
          },
        }),
        orderBy: {
          ...(payload && payload.orderBy === "random"
            ? { id: "desc" }
            : { name: "asc" }),
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      return await prisma.brand.count({
        ...connection,
        ...(payload && {
          where: {
            ...(payload.hasVehicles === "yes" && {
              Vehicle: {
                some: {},
              },
            }),
          },
        }),
      });
    },
  }),
  brandsFiltered: t.prismaConnection({
    type: Brand,
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
          { slug: { contains: filter } },
        ],
      };

      return await prisma.brand.findMany({
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
          { slug: { contains: filter } },
        ],
      };

      return await prisma.brand.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  brandById: t.prismaField({
    type: Brand,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.brand.findUnique({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
  brandBySlug: t.prismaField({
    type: Brand,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { slug } = payload;

      return await prisma.brand.findUnique({
        ...query,
        where: {
          slug,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createBrand: t.prismaField({
    type: Brand,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { name, slug, description, image } = payload;

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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, name, slug, description, image } = payload;

      return await prisma.brand.update({
        ...query,
        where: {
          id,
        },
        data: {
          name: name ? name : undefined,
          slug: slug ? slug : undefined,
          description: description ? description : undefined,
          image: image ? image : undefined,
        },
      });
    },
  }),
  deleteBrand: t.prismaField({
    type: Brand,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.brand.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
