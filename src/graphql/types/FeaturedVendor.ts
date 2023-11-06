import prisma from "@lib/prisma";
import { builder } from "../builder";

export const FeaturedVendor = builder.prismaObject("FeaturedVendor", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vendor: t.relation("vendor", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    text: t.exposeString("text", { nullable: true }),
    page: t.exposeString("page", { nullable: true }),
    position: t.exposeString("position", { nullable: true }),
    rank: t.exposeInt("rank", { nullable: true }),
    impressions: t.exposeInt("impressions", { nullable: true }),
    clicks: t.exposeInt("clicks", { nullable: true }),
    targetImpressions: t.exposeInt("targetImpressions", { nullable: true }),
    targetClicks: t.exposeInt("targetClicks", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  featuredVendors: t.prismaConnection({
    type: FeaturedVendor,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.featuredVendor.findMany({
        ...query,
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.featuredVendor.count({ ...connection }),
  }),
  featuredVendorsFiltered: t.prismaConnection({
    type: FeaturedVendor,
    cursor: "id",
    args: {
      vendorId: t.arg.string(),
      text: t.arg.string(),
      page: t.arg.string(),
      position: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        ...(args.vendorId && {
          vendorId: {
            equals: args.vendorId,
          },
        }),
        ...(args.text && {
          text: <any>{
            search: args.text,
            mode: "insensitive",
          },
        }),
        ...(args.page && {
          page: {
            equals: args.page,
          },
        }),
        ...(args.position && {
          position: {
            equals: args.position,
          },
        }),
      };

      return await prisma.featuredVendor.findMany({
        ...query,
        where,
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const where = {
        ...(args.vendorId && {
          vendorId: {
            equals: args.vendorId,
          },
        }),
        ...(args.text && {
          text: {
            contains: args.text,
          },
        }),
        ...(args.page && {
          page: {
            equals: args.page,
          },
        }),
        ...(args.position && {
          position: {
            equals: args.position,
          },
        }),
      };

      return await prisma.featuredVendor.count({ ...connection, where });
    },
  }),
  featuredVendorById: t.prismaField({
    type: FeaturedVendor,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.featuredVendor.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createFeaturedVendor: t.prismaField({
    type: FeaturedVendor,
    args: {
      vendorId: t.arg.string({ required: true }),
      image: t.arg.string(),
      text: t.arg.string(),
      page: t.arg.string(),
      position: t.arg.string(),
      rank: t.arg.int(),
      impressions: t.arg.int(),
      clicks: t.arg.int(),
      targetImpressions: t.arg.int(),
      targetClicks: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        vendorId,
        image,
        text,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = args;

      return await prisma.featuredVendor.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          image,
          text,
          page,
          position,
          rank,
          impressions,
          clicks,
          targetImpressions,
          targetClicks,
        },
      });
    },
  }),
  updateFeaturedVendor: t.prismaField({
    type: FeaturedVendor,
    args: {
      id: t.arg.string({ required: true }),
      image: t.arg.string(),
      text: t.arg.string(),
      page: t.arg.string(),
      position: t.arg.string(),
      rank: t.arg.int(),
      impressions: t.arg.int(),
      clicks: t.arg.int(),
      targetImpressions: t.arg.int(),
      targetClicks: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        image,
        text,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = args;

      return await prisma.featuredVendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          image: image ? image : undefined,
          text: text ? text : undefined,
          page: page ? page : undefined,
          position: position ? position : undefined,
          rank: rank ? rank : undefined,
          impressions: impressions ? impressions : undefined,
          clicks: clicks ? clicks : undefined,
          targetImpressions: targetImpressions ? targetImpressions : undefined,
          targetClicks: targetClicks ? targetClicks : undefined,
        },
      });
    },
  }),
  updateFeaturedVendorImpressions: t.prismaField({
    type: FeaturedVendor,
    args: {
      id: t.arg.string({ required: true }),
      impressions: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { impressions } = args;

      return await prisma.featuredVendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          impressions: impressions ? impressions : undefined,
        },
      });
    },
  }),
  updateFeaturedVendorClicks: t.prismaField({
    type: FeaturedVendor,
    args: {
      id: t.arg.string({ required: true }),
      clicks: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { clicks } = args;

      return await prisma.featuredVendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          clicks: clicks ? clicks : undefined,
        },
      });
    },
  }),
  deleteFeaturedVendor: t.prismaField({
    type: FeaturedVendor,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.featuredVendor.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
