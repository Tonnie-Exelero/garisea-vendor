import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const AdminVendorMessage = builder.prismaObject("AdminVendorMessage", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user", { nullable: true }),
    vendor: t.relation("vendor", { nullable: true }),
    senderId: t.exposeString("senderId", { nullable: true }),
    type: t.exposeString("type", { nullable: true }),
    message: t.exposeString("message", { nullable: true }),
    timeSent: t.exposeString("timeSent", { nullable: true }),
    isSent: t.exposeBoolean("isSent", { nullable: true }),
    isSeen: t.exposeBoolean("isSeen", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  adminVendorMessages: t.prismaConnection({
    type: AdminVendorMessage,
    cursor: "id",
    args: {
      userId: t.arg.string({ required: true }),
      vendorId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { userId, vendorId } = args;

      return await prisma.adminVendorMessage.findMany({
        ...query,
        where: {
          userId,
          vendorId,
        },
        orderBy: {
          timeSent: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.adminVendorMessage.count({
        ...connection,
        where: {
          userId: args.userId,
          vendorId: args.vendorId,
          isSeen: false,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createAdminVendorMessage: t.prismaField({
    type: AdminVendorMessage,
    args: {
      userId: t.arg.string({ required: true }),
      vendorId: t.arg.string({ required: true }),
      senderId: t.arg.string({ required: true }),
      type: t.arg.string({ required: false }),
      message: t.arg.string({ required: true }),
      timeSent: t.arg.string({ required: true }),
      isSent: t.arg.boolean({ required: false }),
      isSeen: t.arg.boolean({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        userId,
        vendorId,
        senderId,
        type,
        message,
        timeSent,
        isSent,
        isSeen,
      } = args;

      return await prisma.adminVendorMessage.create({
        ...query,
        data: {
          user: { connect: { id: String(userId) || undefined } },
          vendor: { connect: { id: String(vendorId) || undefined } },
          senderId,
          type,
          message,
          timeSent,
          isSent,
          isSeen,
        },
      });
    },
  }),
  updateAdminVendorMessage: t.prismaField({
    type: AdminVendorMessage,
    args: {
      id: t.arg.string({ required: true }),
      message: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.adminVendorMessage.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          message: args.message ? args.message : undefined,
        },
      }),
  }),
  updateAdminVendorMessageSeen: t.prismaField({
    type: AdminVendorMessage,
    args: {
      id: t.arg.string({ required: true }),
      isSeen: t.arg.boolean(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.adminVendorMessage.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          isSeen: args.isSeen ? args.isSeen : undefined,
        },
      }),
  }),
  deleteAdminVendorMessage: t.prismaField({
    type: AdminVendorMessage,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.adminVendorMessage.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
