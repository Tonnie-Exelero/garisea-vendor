import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const Permission = builder.prismaObject("Permission", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    subjects: t.exposeString("subjects", { nullable: true }),
    roles: t.relation("roles", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  permissions: t.prismaConnection({
    type: Permission,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.permission.findMany({
        ...query,
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.permission.count({ ...connection }),
  }),
  permissionsFiltered: t.prismaConnection({
    type: Permission,
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

      return await prisma.permission.findMany({
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

      return await prisma.permission.count({ ...connection, where });
    },
  }),
  permissionById: t.prismaField({
    type: Permission,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.permission.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createPermission: t.prismaField({
    type: Permission,
    args: {
      name: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      subjects: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { name, slug, description, subjects } = args;

      return await prisma.permission.create({
        ...query,
        data: {
          name,
          slug,
          description,
          subjects,
        },
      });
    },
  }),
  updatePermission: t.prismaField({
    type: Permission,
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      slug: t.arg.string(),
      description: t.arg.string(),
      subjects: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.permission.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          name: args.name ? args.name : undefined,
          slug: args.slug ? args.slug : undefined,
          description: args.description ? args.description : undefined,
          subjects: args.subjects ? args.subjects : undefined,
        },
      }),
  }),
  deletePermission: t.prismaField({
    type: Permission,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.permission.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
