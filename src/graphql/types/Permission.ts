import prisma from "@src/lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const Permission = builder.prismaObject("Permission", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    subjects: t.exposeString("subjects", { nullable: true }),
    roles: t.relation("roles", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  permissions: t.prismaConnection({
    type: Permission,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.permission.findMany({
        ...query,
        include: {
          roles: true,
        },
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

      return await prisma.permission.findMany({
        ...query,
        ...(payload && { where }),
        include: {
          roles: true,
        },
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

      return await prisma.permission.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  permissionById: t.prismaField({
    type: Permission,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.permission.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          roles: true,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createPermission: t.prismaField({
    type: Permission,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { name, slug, description, subjects } = payload;

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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, name, slug, description, subjects } = payload;

      return await prisma.permission.update({
        ...query,
        where: {
          id,
        },
        data: {
          name: name ? name : undefined,
          slug: slug ? slug : undefined,
          description: description ? description : undefined,
          subjects: subjects ? subjects : undefined,
        },
        include: {
          roles: true,
        },
      });
    },
  }),
  deletePermission: t.prismaField({
    type: Permission,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.permission.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
