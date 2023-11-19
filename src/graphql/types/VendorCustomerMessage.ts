import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const VendorCustomerMessage = builder.prismaObject(
  "VendorCustomerMessage",
  {
    fields: (t) => ({
      id: t.exposeID("id"),
      vendor: t.relation("vendor", { nullable: true }),
      customer: t.relation("customer", { nullable: true }),
      vehicle: t.relation("vehicle", { nullable: true }),
      senderId: t.exposeString("senderId", { nullable: true }),
      type: t.exposeString("type", { nullable: true }),
      message: t.exposeString("message", { nullable: true }),
      timeSent: t.exposeString("timeSent", { nullable: true }),
      isSent: t.exposeBoolean("isSent", { nullable: true }),
      isSeen: t.exposeBoolean("isSeen", { nullable: true }),
      pl: t.exposeString("pl", { nullable: true }),
      dt: t.exposeString("dt", { nullable: true }),
    }),
  }
);

builder.queryFields((t) => ({
  vendorCustomerMessages: t.prismaConnection({
    type: VendorCustomerMessage,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, customerId } = payload;

      return await prisma.vendorCustomerMessage.findMany({
        ...query,
        where: {
          vendorId,
          customerId,
          ...(payload.vehicleId && { vehicleId: payload.vehicleId }),
          ...(payload.senderId && { senderId: payload.senderId }),
        },
        include: {
          vendor: true,
          customer: true,
          vehicle: true,
        },
        orderBy: {
          timeSent: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, customerId } = payload;

      return await prisma.vendorCustomerMessage.count({
        ...connection,
        where: {
          vendorId,
          customerId,
          ...(payload.vehicleId && { vehicleId: payload.vehicleId }),
          ...(payload.senderId && { senderId: payload.senderId }),
          isSeen: false,
        },
      });
    },
  }),
  customerMessages: t.prismaConnection({
    type: VendorCustomerMessage,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { customerId } = payload;

      return await prisma.vendorCustomerMessage.findMany({
        ...query,
        where: {
          customerId,
        },
        include: {
          vendor: true,
          customer: true,
          vehicle: true,
        },
        orderBy: {
          timeSent: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { customerId } = payload;

      return await prisma.vendorCustomerMessage.count({
        ...connection,
        where: {
          customerId,
          isSeen: false,
        },
      });
    },
  }),
  newMessagesCount: t.prismaField({
    type: VendorCustomerMessage,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { customerId } = payload;

      const newMessages = await prisma.vendorCustomerMessage.count({
        where: {
          customerId,
          senderId: { not: customerId },
          isSeen: false,
        },
      });

      return {
        message: newMessages.toString(),
      };
    },
  }),
}));

builder.mutationFields((t) => ({
  createVendorCustomerMessage: t.prismaField({
    type: VendorCustomerMessage,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        vendorId,
        customerId,
        vehicleId,
        senderId,
        type,
        message,
        timeSent,
        isSent,
        isSeen,
      } = payload;

      return await prisma.vendorCustomerMessage.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          customer: { connect: { id: String(customerId) || undefined } },
          ...(vehicleId && {
            vehicle: { connect: { id: String(vehicleId) || undefined } },
          }),
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
  updateVendorCustomerMessage: t.prismaField({
    type: VendorCustomerMessage,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, message } = payload;

      return await prisma.vendorCustomerMessage.update({
        ...query,
        where: {
          id,
        },
        data: {
          message: message ? message : undefined,
        },
        include: {
          vendor: true,
          customer: true,
          vehicle: true,
        },
      });
    },
  }),
  updateVendorCustomerMessageSeen: t.prismaField({
    type: VendorCustomerMessage,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, isSeen } = payload;

      return await prisma.vendorCustomerMessage.update({
        ...query,
        where: {
          id,
        },
        data: {
          isSeen: isSeen ? isSeen : undefined,
        },
        include: {
          vendor: true,
          customer: true,
          vehicle: true,
        },
      });
    },
  }),
  deleteVendorCustomerMessage: t.prismaField({
    type: VendorCustomerMessage,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vendorCustomerMessage.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
