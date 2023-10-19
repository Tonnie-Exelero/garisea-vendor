import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const VendorCustomerContact = builder.prismaObject(
  "VendorCustomerContact",
  {
    fields: (t) => ({
      id: t.exposeID("id"),
      vendor: t.relation("vendor", { nullable: true }),
      customer: t.relation("customer", { nullable: true }),
      vehicle: t.relation("vehicle", { nullable: true }),
      latestMessageTime: t.exposeString("latestMessageTime", {
        nullable: true,
      }),
    }),
  }
);

builder.queryFields((t) => ({
  vendorCustomerContacts: t.prismaConnection({
    type: VendorCustomerContact,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { vendorId } = args;

      return await prisma.vendorCustomerContact.findMany({
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
      await prisma.vendorCustomerContact.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
        },
      }),
  }),
  contactsByVendorCustomerVehicleIds: t.prismaConnection({
    type: VendorCustomerContact,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
      customerId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vendorCustomerContact.findMany({
        ...query,
        where: {
          vendorId: args.vendorId,
          customerId: args.customerId,
        },
      }),
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.vendorCustomerContact.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
          customerId: args.customerId,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createVendorCustomerContact: t.prismaField({
    type: VendorCustomerContact,
    args: {
      vendorId: t.arg.string({ required: true }),
      customerId: t.arg.string({ required: true }),
      latestMessageTime: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { vendorId, customerId, latestMessageTime } = args;

      return await prisma.vendorCustomerContact.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          customer: { connect: { id: String(customerId) || undefined } },
          latestMessageTime,
        },
      });
    },
  }),
  updateVendorCustomerContact: t.prismaField({
    type: VendorCustomerContact,
    args: {
      id: t.arg.string({ required: true }),
      latestMessageTime: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorCustomerContact.update({
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
  deleteVendorCustomerContact: t.prismaField({
    type: VendorCustomerContact,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorCustomerContact.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
