import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const Role = builder.prismaObject("Role", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: false }),
    slug: t.exposeString("slug", { nullable: false }),
    description: t.exposeString("description", { nullable: true }),
    ability: t.exposeString("ability", { nullable: true }),
    permissions: t.relation("permissions", { nullable: true }),
    users: t.relation("users", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  roles: t.prismaConnection({
    type: Role,
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.role.findMany({
        ...query,
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    totalCount: (connection, _args, _ctx, _info) =>
      prisma.role.count({ ...connection }),
  }),
  rolesFiltered: t.prismaConnection({
    type: Role,
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

      return await prisma.role.findMany({
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

      return prisma.role.count({ ...connection, where });
    },
  }),
  roleById: t.prismaField({
    type: Role,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.role.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createSuperAdminRole: t.prismaField({
    type: "Role",
    args: {
      name: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      ability: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { name, slug, description, ability } = args;

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
      name: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      ability: t.arg.string({ required: true }),
      permissions: t.arg.stringList({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { name, slug, description, ability, permissions } = args;
      const permList: { id: string }[] = [];

      permissions.map((permission) => permList.push({ id: permission }));

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
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      slug: t.arg.string(),
      description: t.arg.string(),
      ability: t.arg.string(),
      permissions: t.arg.stringList(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { permissions } = args;
      const permList: any[] = [];

      permissions?.map((permission) => permList.push({ id: permission }));

      return await prisma.role.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          name: args.name ? args.name : undefined,
          slug: args.slug ? args.slug : undefined,
          description: args.description ? args.description : undefined,
          ability: args.ability ? args.ability : undefined,
          permissions:
            permList.length > 0 ? { set: [], connect: permList } : undefined,
        },
      });
    },
  }),
  deleteRole: t.prismaField({
    type: Role,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.role.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
