import prisma from "@src/lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const Role = builder.prismaObject("Role", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    ability: t.exposeString("ability", { nullable: true }),
    permissions: t.relation("permissions", { nullable: true }),
    users: t.relation("users", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  roles: t.prismaConnection({
    type: Role,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.role.findMany({
        ...query,
        include: {
          permissions: true,
          users: true,
        },
        orderBy: {
          name: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.role.count({ ...connection }),
  }),
  rolesFiltered: t.prismaConnection({
    type: Role,
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

      return await prisma.role.findMany({
        ...query,
        ...(payload && { where }),
        include: {
          permissions: true,
          users: true,
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

      return await prisma.role.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  roleById: t.prismaField({
    type: Role,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.role.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          permissions: true,
          users: true,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createSuperAdminRole: t.prismaField({
    type: "Role",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { name, slug, description, ability } = payload;

      return await prisma.role.create({
        ...query,
        data: {
          name,
          slug,
          description,
          ability,
        },
      });
    },
  }),
  createRole: t.prismaField({
    type: Role,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { name, slug, description, ability, permissions } = payload;
      const permList: { id: string }[] = [];

      permissions.map((permission: any) => permList.push({ id: permission }));

      return await prisma.role.create({
        ...query,
        data: {
          name,
          slug,
          description,
          ability,
          permissions: { connect: [...permList] },
        },
      });
    },
  }),
  updateRole: t.prismaField({
    type: Role,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, name, slug, description, ability, permissions } = payload;
      const permList: any[] = [];

      permissions?.map((permission: any) => permList.push({ id: permission }));

      return await prisma.role.update({
        ...query,
        where: {
          id,
        },
        data: {
          name: name ? name : undefined,
          slug: slug ? slug : undefined,
          description: description ? description : undefined,
          ability: ability ? ability : undefined,
          permissions:
            permList.length > 0 ? { set: [], connect: permList } : undefined,
        },
        include: {
          permissions: true,
          users: true,
        },
      });
    },
  }),
  deleteRole: t.prismaField({
    type: Role,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.role.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
