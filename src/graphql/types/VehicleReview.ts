import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

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
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  vehicleReviews: t.prismaConnection({
    type: VehicleReview,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.vehicleReview.findMany({
        ...query,
        ...(payload && {
          where: {
            ...(payload.status && {
              status: payload.status,
            }),
          },
        }),
        include: {
          vehicle: true,
          customer: true,
        },
        orderBy: {
          publishedAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      return await prisma.vehicleReview.count({
        ...connection,
        ...(payload && {
          where: {
            ...(payload.status && {
              status: payload.status,
            }),
          },
        }),
      });
    },
  }),
  vehicleByIdReviews: t.prismaConnection({
    type: VehicleReview,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vehicleId } = payload;

      return await prisma.vehicleReview.findMany({
        ...query,
        where: {
          vehicleId,
          ...(payload.status && { status: payload.status }),
        },
        include: {
          vehicle: true,
          customer: true,
        },
        orderBy: {
          publishedAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vehicleId } = payload;

      return await prisma.vehicleReview.count({
        ...connection,
        where: {
          vehicleId,
          ...(payload.status && { status: payload.status }),
        },
      });
    },
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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vehicleId, status } = payload;

      const aggregation = await prisma.vehicleReview.aggregate({
        _avg: { stars: true },
        where: {
          vehicleId,
          status,
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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { status } = payload;

      const group = await prisma.vehicleReview.groupBy({
        by: ["vehicleId"],
        ...(payload.limit && { take: payload.limit }),
        where: {
          status,
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
          stars: item._avg?.stars,
          // @ts-ignore
          count: item._count?.vehicleId,
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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { id } = payload;

      return await prisma.vehicleReview.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          vehicle: true,
          customer: true,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createVehicleReview: t.prismaField({
    type: VehicleReview,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vehicleId, customerId, stars, comment, status, publishedAt } =
        payload;

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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, stars, comment } = payload;

      return await prisma.vehicleReview.update({
        ...query,
        where: {
          id,
        },
        data: {
          stars: stars ? stars : undefined,
          comment: comment ? comment : undefined,
        },
        include: {
          vehicle: true,
          customer: true,
        },
      });
    },
  }),
  updateVehicleReviewStatus: t.prismaField({
    type: VehicleReview,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.vehicleReview.update({
        ...query,
        where: {
          id,
        },
        data: {
          status: status ? status : undefined,
        },
        include: {
          vehicle: true,
          customer: true,
        },
      });
    },
  }),
  deleteVehicleReview: t.prismaField({
    type: VehicleReview,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vehicleReview.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
