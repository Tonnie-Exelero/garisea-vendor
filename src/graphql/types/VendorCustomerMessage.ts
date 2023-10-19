import prisma from "@src/lib/prisma";
import { builder } from "../builder";

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
    }),
  }
);

builder.queryFields((t) => ({
  vendorCustomerMessages: t.prismaConnection({
    type: VendorCustomerMessage,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
      customerId: t.arg.string({ required: true }),
      vehicleId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { vendorId, customerId, vehicleId } = args;

      return await prisma.vendorCustomerMessage.findMany({
        ...query,
        where: {
          vendorId,
          customerId,
          vehicleId,
        },
        orderBy: {
          timeSent: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.vendorCustomerMessage.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
          customerId: args.customerId,
          vehicleId: args.vehicleId,
          isSeen: false,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createVendorCustomerMessage: t.prismaField({
    type: VendorCustomerMessage,
    args: {
      vendorId: t.arg.string({ required: true }),
      customerId: t.arg.string({ required: true }),
      vehicleId: t.arg.string({ required: true }),
      senderId: t.arg.string({ required: true }),
      type: t.arg.string({ required: false }),
      message: t.arg.string({ required: true }),
      timeSent: t.arg.string({ required: true }),
      isSent: t.arg.boolean({ required: false }),
      isSeen: t.arg.boolean({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) => {
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
      } = args;

      return await prisma.vendorCustomerMessage.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          customer: { connect: { id: String(customerId) || undefined } },
          vehicle: { connect: { id: String(vehicleId) || undefined } },
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
      id: t.arg.string({ required: true }),
      message: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorCustomerMessage.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          message: args.message ? args.message : undefined,
        },
      }),
  }),
  updateVendorCustomerMessageSeen: t.prismaField({
    type: VendorCustomerMessage,
    args: {
      id: t.arg.string({ required: true }),
      isSeen: t.arg.boolean(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorCustomerMessage.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          isSeen: args.isSeen ? args.isSeen : undefined,
        },
      }),
  }),
  deleteVendorCustomerMessage: t.prismaField({
    type: VendorCustomerMessage,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorCustomerMessage.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));