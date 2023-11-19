import prisma from "@src/lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

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
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  adminVendorMessages: t.prismaConnection({
    type: AdminVendorMessage,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { userId, vendorId } = payload;

      return await prisma.adminVendorMessage.findMany({
        ...query,
        where: {
          userId,
          vendorId,
        },
        include: {
          user: true,
          vendor: true,
        },
        orderBy: {
          timeSent: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { userId, vendorId } = payload;

      return await prisma.adminVendorMessage.count({
        ...connection,
        where: {
          userId,
          vendorId,
          isSeen: false,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createAdminVendorMessage: t.prismaField({
    type: AdminVendorMessage,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        userId,
        vendorId,
        senderId,
        type,
        message,
        timeSent,
        isSent,
        isSeen,
      } = payload;

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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, message } = payload;

      return await prisma.adminVendorMessage.update({
        ...query,
        where: {
          id,
        },
        data: {
          message: message ? message : undefined,
        },
        include: {
          user: true,
          vendor: true,
        },
      });
    },
  }),
  updateAdminVendorMessageSeen: t.prismaField({
    type: AdminVendorMessage,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, isSeen } = payload;

      return await prisma.adminVendorMessage.update({
        ...query,
        where: {
          id,
        },
        data: {
          isSeen: isSeen ? isSeen : undefined,
        },
      });
    },
  }),
  deleteAdminVendorMessage: t.prismaField({
    type: AdminVendorMessage,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.adminVendorMessage.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
