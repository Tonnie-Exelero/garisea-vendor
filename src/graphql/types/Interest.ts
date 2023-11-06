import prisma from "@lib/prisma";
import { builder } from "../builder";

export const Interest = builder.prismaObject("Interest", {
  fields: (t) => ({
    id: t.exposeID("id"),
    customer: t.relation("customer", { nullable: true }),
    vehicle: t.relation("vehicle", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  interests: t.prismaConnection({
    type: Interest,
    cursor: "id",
    args: {
      customerId: t.arg.string({ required: true }),
      vehicleId: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { customerId, vehicleId } = args;

      return await prisma.interest.findMany({
        ...query,
        where: {
          customerId,
          ...(vehicleId && { vehicleId }),
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.interest.count({
        ...connection,
        where: {
          customerId: args.customerId,
          ...(args.vehicleId && { vehicleId: args.vehicleId }),
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createInterest: t.prismaField({
    type: Interest,
    args: {
      customerId: t.arg.string({ required: true }),
      vehicleId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { customerId, vehicleId } = args;

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
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.interest.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
