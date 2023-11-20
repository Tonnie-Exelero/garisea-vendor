import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

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
      pl: t.exposeString("pl", { nullable: true }),
      dt: t.exposeString("dt", { nullable: true }),
    }),
  }
);

builder.queryFields((t) => ({
  vendorCustomerContacts: t.prismaConnection({
    type: VendorCustomerContact,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.vendorCustomerContact.findMany({
        ...query,
        ...(payload && {
          where: {
            ...(payload.vendorId && {
              vendorId: payload.vendorId,
            }),
            ...(payload.customerId && {
              customerId: payload.customerId,
            }),
          },
        }),
        include: {
          vendor: true,
          customer: true,
          vehicle: true,
        },
        orderBy: {
          latestMessageTime: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      return await prisma.vendorCustomerContact.count({
        ...connection,
        ...(payload && {
          where: {
            ...(payload.vendorId && {
              vendorId: payload.vendorId,
            }),
            ...(payload.customerId && {
              customerId: payload.customerId,
            }),
          },
        }),
      });
    },
  }),
  contactsByVendorCustomerVehicleIds: t.prismaConnection({
    type: VendorCustomerContact,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, customerId } = payload;

      return await prisma.vendorCustomerContact.findMany({
        ...query,
        ...(payload && {
          where: {
            ...(vendorId && { vendorId }),
            ...(customerId && { customerId }),
            ...(payload.vehicleId && { vehicleId: payload.vehicleId }),
          },
        }),
        include: {
          vendor: true,
          customer: true,
          vehicle: true,
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, customerId } = payload;

      return await prisma.vendorCustomerContact.count({
        ...connection,
        ...(payload && {
          where: {
            ...(vendorId && { vendorId }),
            ...(customerId && { customerId }),
            ...(payload.vehicleId && { vehicleId: payload.vehicleId }),
          },
        }),
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createVendorCustomerContact: t.prismaField({
    type: VendorCustomerContact,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, customerId, vehicleId, latestMessageTime } = payload;

      return await prisma.vendorCustomerContact.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          customer: { connect: { id: String(customerId) || undefined } },
          ...(vehicleId && {
            vehicle: { connect: { id: String(vehicleId) || undefined } },
          }),
          latestMessageTime,
        },
      });
    },
  }),
  updateVendorCustomerContact: t.prismaField({
    type: VendorCustomerContact,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, latestMessageTime } = payload;

      return await prisma.vendorCustomerContact.update({
        ...query,
        where: {
          id,
        },
        data: {
          latestMessageTime: latestMessageTime ? latestMessageTime : undefined,
        },
        include: {
          vendor: true,
          customer: true,
          vehicle: true,
        },
      });
    },
  }),
  deleteVendorCustomerContact: t.prismaField({
    type: VendorCustomerContact,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vendorCustomerContact.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
