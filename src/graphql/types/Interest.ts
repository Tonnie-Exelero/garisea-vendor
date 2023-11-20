import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const Interest = builder.prismaObject("Interest", {
  fields: (t) => ({
    id: t.exposeID("id"),
    customer: t.relation("customer", { nullable: true }),
    vehicle: t.relation("vehicle", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  interests: t.prismaConnection({
    type: Interest,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { customerId } = payload;

      return await prisma.interest.findMany({
        ...query,
        where: {
          customerId,
          ...(payload.vehicleId && { vehicleId: payload.vehicleId }),
        },
        include: {
          customer: true,
          vehicle: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { customerId } = payload;

      return await prisma.interest.count({
        ...connection,
        where: {
          customerId,
          ...(payload.vehicleId && { vehicleId: payload.vehicleId }),
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createInterest: t.prismaField({
    type: Interest,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { customerId, vehicleId } = payload;

      return await prisma.interest.create({
        ...query,
        data: {
          customer: { connect: { id: String(customerId) || undefined } },
          vehicle: { connect: { id: String(vehicleId) || undefined } },
        },
      });
    },
  }),
  deleteInterest: t.prismaField({
    type: Interest,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.interest.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
