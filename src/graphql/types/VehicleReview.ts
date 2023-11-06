import prisma from "@lib/prisma";
import { builder } from "../builder";

export const VehicleReview = builder.prismaObject("VehicleReview", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vehicle: t.relation("vehicle", { nullable: true }),
    customer: t.relation("customer", { nullable: true }),
    stars: t.exposeInt("stars", { nullable: true }),
    comment: t.exposeString("comment", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
    count: t.exposeString("count", { nullable: true }),
    rating: t.exposeString("rating", { nullable: true }),
    publishedAt: t.exposeString("publishedAt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  vehicleReviews: t.prismaConnection({
    type: VehicleReview,
    cursor: "id",
    args: {
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      return await prisma.vehicleReview.findMany({
        ...query,
        where: {
          ...(args.status && { status: args.status }),
        },
        orderBy: {
          publishedAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.vehicleReview.count({
        ...connection,
        where: {
          ...(args.status && { status: args.status }),
        },
      }),
  }),
  vehicleByIdReviews: t.prismaConnection({
    type: VehicleReview,
    cursor: "id",
    args: {
      vehicleId: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      return await prisma.vehicleReview.findMany({
        ...query,
        where: {
          vehicleId: args.vehicleId,
          ...(args.status && { status: args.status }),
        },
        orderBy: {
          publishedAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.vehicleReview.count({
        ...connection,
        where: {
          vehicleId: args.vehicleId,
          ...(args.status && { status: args.status }),
        },
      }),
  }),
  vehicleReviewsCount: t.prismaField({
    type: VehicleReview,
    nullable: true,
    resolve: async (
      _query,
      _parent,
      _args,
      _info
    ): Promise<any | undefined> => {
      const active = await prisma.vehicleReview.count({
        where: {
          status: "active",
        },
      });

      const pending = await prisma.vehicleReview.count({
        where: {
          status: "pending",
        },
      });

      const declined = await prisma.vehicleReview.count({
        where: {
          status: "declined",
        },
      });

      const stats = { active, pending, declined };

      return {
        count: JSON.stringify(stats),
      };
    },
  }),
  vehicleReviewStarsAvg: t.prismaField({
    type: VehicleReview,
    nullable: true,
    args: {
      vehicleId: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const aggregation = await prisma.vehicleReview.aggregate({
        _avg: { stars: true },
        where: {
          vehicleId: args.vehicleId,
          status: args.status,
        },
      });

      return {
        rating: aggregation._avg.stars
          ? aggregation._avg.stars.toString()
          : null,
      };
    },
  }),
  vehiclesReviewsTopRated: t.prismaField({
    type: VehicleReview,
    nullable: true,
    args: {
      status: t.arg.string({ required: true }),
      limit: t.arg.int(),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const group = await prisma.vehicleReview.groupBy({
        by: ["vehicleId"],
        ...(args.limit && { take: args.limit }),
        where: {
          status: args.status,
        },
        _avg: { stars: true },
        _count: { vehicleId: true },
        orderBy: [
          { _avg: { stars: "desc" } },
          { _count: { vehicleId: "desc" } },
        ],
      });

      const groupedData = group.map((item) => {
        return {
          vehicleId: item.vehicleId,
          stars: item._avg.stars,
          count: item._count.vehicleId,
        };
      });

      return {
        rating: JSON.stringify(groupedData),
      };
    },
  }),
  vehicleReviewById: t.prismaField({
    type: VehicleReview,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vehicleReview.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createVehicleReview: t.prismaField({
    type: VehicleReview,
    args: {
      vehicleId: t.arg.string({ required: true }),
      customerId: t.arg.string({ required: true }),
      stars: t.arg.int({ required: false }),
      comment: t.arg.string({ required: false }),
      status: t.arg.string({ required: false }),
      publishedAt: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { vehicleId, customerId, stars, comment, status, publishedAt } =
        args;

      return await prisma.vehicleReview.create({
        ...query,
        data: {
          vehicle: { connect: { id: String(vehicleId) || undefined } },
          customer: { connect: { id: String(customerId) || undefined } },
          stars,
          comment,
          status,
          publishedAt,
        },
      });
    },
  }),
  updateVehicleReview: t.prismaField({
    type: VehicleReview,
    args: {
      id: t.arg.string({ required: true }),
      stars: t.arg.int({ required: false }),
      comment: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vehicleReview.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          stars: args.stars ? args.stars : undefined,
          comment: args.comment ? args.comment : undefined,
        },
      }),
  }),
  updateVehicleReviewStatus: t.prismaField({
    type: VehicleReview,
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vehicleReview.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          status: args.status ? args.status : undefined,
        },
      }),
  }),
  deleteVehicleReview: t.prismaField({
    type: VehicleReview,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vehicleReview.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
