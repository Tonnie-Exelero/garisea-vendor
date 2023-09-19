import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const Model = builder.prismaObject("Model", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    brand: t.relation("brand", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  models: t.prismaConnection({
    type: Model,
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.model.findMany({
        ...query,
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    totalCount: (connection, _args, _ctx, _info) =>
      prisma.model.count({ ...connection }),
  }),
  modelsFiltered: t.prismaConnection({
    type: Model,
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

      return await prisma.model.findMany({
        ...query,
        where,
        orderBy: {
          createdAt: 'desc',
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

      return prisma.model.count({ ...connection, where });
    },
  }),
  modelById: t.prismaField({
    type: Model,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.model.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
  modelsByBrandId: t.prismaConnection({
    type: Model,
    cursor: "id",
    args: {
      brandId: t.arg.string({ required: true }),
      first: t.arg.int(),
      last: t.arg.int(),
      after: t.arg.string(),
      before: t.arg.string(),
    },
    resolve: (query, _parent, args, _ctx, _info) => {
      const { first, last, after, before } = args;

      return prisma.model.findMany({
        ...query,
        where: {
          brandId: args.brandId,
        },
        // Limit the number of events returned by this query.
        take: first && !last ? first : last && !first ? -last : undefined,
        // Conditionally use a cursor if it exists.
        ...((after || before) && {
          skip: 1, // Do not include the cursor itself in the query result.
          cursor: {
            id:
              after && !before ? after : before && !after ? before : undefined,
          },
        }),
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: (connection, args, _ctx, _info) =>
      prisma.model.count({
        ...connection,
        where: {
          brandId: args.brandId,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createModel: t.prismaField({
    type: Model,
    args: {
      name: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      description: t.arg.string({ required: false }),
      brandId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { name, slug, description, brandId } = args;

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
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      slug: t.arg.string(),
      description: t.arg.string(),
      brandId: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.model.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          name: args.name ? args.name : undefined,
          slug: args.slug ? args.slug : undefined,
          description: args.description ? args.description : undefined,
          brand: args.brandId
            ? { connect: { id: String(args.brandId) || undefined } }
            : undefined,
        },
      }),
  }),
  deleteModel: t.prismaField({
    type: Model,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.model.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
