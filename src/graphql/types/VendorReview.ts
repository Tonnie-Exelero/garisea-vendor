import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const VendorReview = builder.prismaObject("VendorReview", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vendor: t.relation("vendor", { nullable: true }),
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
  vendorReviews: t.prismaConnection({
    type: VendorReview,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.vendorReview.findMany({
        ...query,
        ...(payload && {
          where: {
            ...(payload.status && {
              status: payload.status,
            }),
          },
        }),
        include: {
          vendor: true,
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

      return await prisma.vendorReview.count({
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
  vendorByIdReviews: t.prismaConnection({
    type: VendorReview,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId } = payload;

      return await prisma.vendorReview.findMany({
        ...query,
        where: {
          vendorId,
          ...(payload.status && { status: payload.status }),
        },
        include: {
          vendor: true,
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
      const { vendorId } = payload;

      return await prisma.vendorReview.count({
        ...connection,
        where: {
          vendorId,
          ...(payload.status && { status: payload.status }),
        },
      });
    },
  }),
  vendorReviewsCount: t.prismaField({
    type: VendorReview,
    nullable: true,
    resolve: async (
      _query,
      _parent,
      _args,
      _info
    ): Promise<any | undefined> => {
      const active = await prisma.vendorReview.count({
        where: {
          status: "active",
        },
      });

      const pending = await prisma.vendorReview.count({
        where: {
          status: "pending",
        },
      });

      const declined = await prisma.vendorReview.count({
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
  vendorReviewStarsAvg: t.prismaField({
    type: VendorReview,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, status } = payload;

      const aggregation = await prisma.vendorReview.aggregate({
        _avg: { stars: true },
        where: {
          vendorId,
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
  vendorsReviewsTopRated: t.prismaField({
    type: VendorReview,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { status } = payload;

      const group = await prisma.vendorReview.groupBy({
        by: ["vendorId"],
        ...(payload.limit && { take: payload.limit }),
        where: {
          status,
        },
        _avg: { stars: true },
        _count: { vendorId: true },
        orderBy: [
          { _avg: { stars: "desc" } },
          { _count: { vendorId: "desc" } },
        ],
      });

      const groupedData = group.map((item) => {
        return {
          vendorId: item.vendorId,
          stars: item._avg?.stars,
          // @ts-ignore
          count: item._count?.vendorId,
        };
      });

      return {
        rating: JSON.stringify(groupedData),
      };
    },
  }),
  vendorReviewById: t.prismaField({
    type: VendorReview,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vendorReview.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          vendor: true,
          customer: true,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createVendorReview: t.prismaField({
    type: VendorReview,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, customerId, stars, comment, status, publishedAt } =
        payload;

      return await prisma.vendorReview.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          customer: { connect: { id: String(customerId) || undefined } },
          stars,
          comment,
          status,
          publishedAt,
        },
      });
    },
  }),
  updateVendorReview: t.prismaField({
    type: VendorReview,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, stars, comment } = payload;

      return await prisma.vendorReview.update({
        ...query,
        where: {
          id,
        },
        data: {
          stars: stars ? stars : undefined,
          comment: comment ? comment : undefined,
        },
        include: {
          vendor: true,
          customer: true,
        },
      });
    },
  }),
  updateVendorReviewStatus: t.prismaField({
    type: VendorReview,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.vendorReview.update({
        ...query,
        where: {
          id,
        },
        data: {
          status: status ? status : undefined,
        },
        include: {
          vendor: true,
          customer: true,
        },
      });
    },
  }),
  deleteVendorReview: t.prismaField({
    type: VendorReview,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vendorReview.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
