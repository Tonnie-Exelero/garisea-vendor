import prisma from "@src/lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const AdminVendorContact = builder.prismaObject("AdminVendorContact", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user", { nullable: true }),
    vendor: t.relation("vendor", { nullable: true }),
    latestMessageTime: t.exposeString("latestMessageTime", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  adminVendorContacts: t.prismaConnection({
    type: AdminVendorContact,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId } = payload;

      return await prisma.adminVendorContact.findMany({
        ...query,
        where: {
          vendorId,
        },
        include: {
          user: true,
          vendor: true,
        },
        orderBy: {
          latestMessageTime: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId } = payload;

      return await prisma.adminVendorContact.count({
        ...connection,
        where: {
          vendorId,
        },
      });
    },
  }),
  contactsByAdminVendorIds: t.prismaConnection({
    type: AdminVendorContact,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { userId, vendorId }: any = payload;

      return await prisma.adminVendorContact.findMany({
        ...query,
        where: {
          vendorId,
          userId,
        },
        include: {
          user: true,
          vendor: true,
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { userId, vendorId }: any = payload;

      return await prisma.adminVendorContact.count({
        ...connection,
        where: {
          vendorId,
          userId,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createAdminVendorContact: t.prismaField({
    type: AdminVendorContact,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { userId, vendorId, latestMessageTime } = payload;

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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, latestMessageTime } = payload;

      return await prisma.adminVendorContact.update({
        ...query,
        where: {
          id,
        },
        data: {
          latestMessageTime: latestMessageTime ? latestMessageTime : undefined,
        },
        include: {
          user: true,
          vendor: true,
        },
      });
    },
  }),
  deleteAdminVendorContact: t.prismaField({
    type: AdminVendorContact,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.adminVendorContact.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
