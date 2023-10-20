import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const AdminVendorContact = builder.prismaObject("AdminVendorContact", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user", { nullable: true }),
    vendor: t.relation("vendor", { nullable: true }),
    latestMessageTime: t.exposeString("latestMessageTime", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  adminVendorContacts: t.prismaConnection({
    type: AdminVendorContact,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { vendorId } = args;

      return await prisma.adminVendorContact.findMany({
        ...query,
        where: {
          vendorId,
        },
        orderBy: {
          latestMessageTime: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.adminVendorContact.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
        },
      }),
  }),
  contactsByAdminVendorIds: t.prismaConnection({
    type: AdminVendorContact,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.adminVendorContact.findMany({
        ...query,
        where: {
          vendorId: args.vendorId,
          userId: args.userId,
        },
      }),
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.adminVendorContact.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
          userId: args.userId,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createAdminVendorContact: t.prismaField({
    type: AdminVendorContact,
    args: {
      vendorId: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
      latestMessageTime: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { userId, vendorId, latestMessageTime } = args;

      return await prisma.adminVendorContact.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          user: { connect: { id: String(userId) || undefined } },
          latestMessageTime,
        },
      });
    },
  }),
  updateAdminVendorContact: t.prismaField({
    type: AdminVendorContact,
    args: {
      id: t.arg.string({ required: true }),
      latestMessageTime: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.adminVendorContact.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          latestMessageTime: args.latestMessageTime
            ? args.latestMessageTime
            : undefined,
        },
      }),
  }),
  deleteAdminVendorContact: t.prismaField({
    type: AdminVendorContact,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.adminVendorContact.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
