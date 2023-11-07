import prisma from "@lib/prisma";
import { builder } from "../builder";

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
  }),
});

builder.queryFields((t) => ({
  vendorReviews: t.prismaConnection({
    type: VendorReview,
    cursor: "id",
    args: {
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      return await prisma.vendorReview.findMany({
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
      await prisma.vendorReview.count({
        ...connection,
        where: {
          ...(args.status && { status: args.status }),
        },
      }),
  }),
  vendorByIdReviews: t.prismaConnection({
    type: VendorReview,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      return await prisma.vendorReview.findMany({
        ...query,
        where: {
          vendorId: args.vendorId,
          ...(args.status && { status: args.status }),
        },
        orderBy: {
          publishedAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.vendorReview.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
          ...(args.status && { status: args.status }),
        },
      }),
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
      vendorId: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const aggregation = await prisma.vendorReview.aggregate({
        _avg: { stars: true },
        where: {
          vendorId: args.vendorId,
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
  vendorsReviewsTopRated: t.prismaField({
    type: VendorReview,
    nullable: true,
    args: {
      status: t.arg.string({ required: true }),
      limit: t.arg.int(),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const group = await prisma.vendorReview.groupBy({
        by: ["vendorId"],
        ...(args.limit && { take: args.limit }),
        where: {
          status: args.status,
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
          stars: item._avg.stars,
          count: item._count.vendorId,
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
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vendorReview.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createVendorReview: t.prismaField({
    type: VendorReview,
    args: {
      vendorId: t.arg.string({ required: true }),
      customerId: t.arg.string({ required: true }),
      stars: t.arg.int({ required: false }),
      comment: t.arg.string({ required: false }),
      status: t.arg.string({ required: false }),
      publishedAt: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { vendorId, customerId, stars, comment, status, publishedAt } =
        args;

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
      id: t.arg.string({ required: true }),
      stars: t.arg.int({ required: false }),
      comment: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorReview.update({
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
  updateVendorReviewStatus: t.prismaField({
    type: VendorReview,
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorReview.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          status: args.status ? args.status : undefined,
        },
      }),
  }),
  deleteVendorReview: t.prismaField({
    type: VendorReview,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendorReview.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
