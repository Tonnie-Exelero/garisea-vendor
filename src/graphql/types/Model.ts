import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const Model = builder.prismaObject("Model", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    brand: t.relation("brand", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  models: t.prismaConnection({
    type: Model,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.model.findMany({
        ...query,
        include: {
          brand: true,
        },
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.model.count({ ...connection }),
  }),
  modelsFiltered: t.prismaConnection({
    type: Model,
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

      return await prisma.model.findMany({
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

      return await prisma.model.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  modelById: t.prismaField({
    type: Model,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.model.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          brand: true,
        },
      });
    },
  }),
  modelsByBrandId: t.prismaConnection({
    type: Model,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { brandId } = payload;

      return await prisma.model.findMany({
        ...query,
        where: {
          brandId,
        },
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { brandId } = payload;

      return await prisma.model.count({
        ...connection,
        where: {
          brandId,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createModel: t.prismaField({
    type: Model,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { name, slug, description, brandId } = payload;

      return await prisma.model.create({
        ...query,
        data: {
          name,
          slug,
          description,
          brand: { connect: { id: String(brandId) || undefined } },
        },
      });
    },
  }),
  updateModel: t.prismaField({
    type: Model,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, name, slug, description, brandId } = payload;

      return await prisma.model.update({
        ...query,
        where: {
          id,
        },
        data: {
          name: name ? name : undefined,
          slug: slug ? slug : undefined,
          description: description ? description : undefined,
          brand: brandId
            ? { connect: { id: String(brandId) || undefined } }
            : undefined,
        },
        include: {
          brand: true,
        },
      });
    },
  }),
  deleteModel: t.prismaField({
    type: Model,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.model.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
