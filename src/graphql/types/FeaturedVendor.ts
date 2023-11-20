import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const FeaturedVendor = builder.prismaObject("FeaturedVendor", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vendor: t.relation("vendor", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    text: t.exposeString("text", { nullable: true }),
    page: t.exposeString("page", { nullable: true }),
    position: t.exposeString("position", { nullable: true }),
    rank: t.exposeInt("rank", { nullable: true }),
    impressions: t.exposeInt("impressions", { nullable: true }),
    clicks: t.exposeInt("clicks", { nullable: true }),
    targetImpressions: t.exposeInt("targetImpressions", { nullable: true }),
    targetClicks: t.exposeInt("targetClicks", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  featuredVendors: t.prismaConnection({
    type: FeaturedVendor,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.featuredVendor.findMany({
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
        },
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      return await prisma.featuredVendor.count({
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
  featuredVendorsFiltered: t.prismaConnection({
    type: FeaturedVendor,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const where = {
        ...(payload.vendorId && {
          vendorId: {
            equals: payload.vendorId,
          },
        }),
        ...(payload.status && {
          status: {
            equals: payload.status,
          },
        }),
        ...(payload.text && {
          text: <any>{
            search: payload.text,
            mode: "insensitive",
          },
        }),
        ...(payload.page && {
          page: {
            equals: payload.page,
          },
        }),
        ...(payload.position && {
          position: {
            equals: payload.position,
          },
        }),
      };

      return await prisma.featuredVendor.findMany({
        ...query,
        ...(payload && { where }),
        include: {
          vendor: true,
        },
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const where = {
        ...(payload.vendorId && {
          vendorId: {
            equals: payload.vendorId,
          },
        }),
        ...(payload.status && {
          status: {
            equals: payload.status,
          },
        }),
        ...(payload.text && {
          text: <any>{
            search: payload.text,
            mode: "insensitive",
          },
        }),
        ...(payload.page && {
          page: {
            equals: payload.page,
          },
        }),
        ...(payload.position && {
          position: {
            equals: payload.position,
          },
        }),
      };

      return await prisma.featuredVendor.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  featuredVendorById: t.prismaField({
    type: FeaturedVendor,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { id } = payload;

      return await prisma.featuredVendor.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          vendor: true,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createFeaturedVendor: t.prismaField({
    type: FeaturedVendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        vendorId,
        status,
        image,
        text,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.featuredVendor.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          status,
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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const {
        id,
        image,
        text,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.featuredVendor.update({
        ...query,
        where: {
          id,
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
        include: {
          vendor: true,
        },
      });
    },
  }),
  updateFeaturedVendorStatus: t.prismaField({
    type: FeaturedVendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.featuredVendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          status: status ? status : undefined,
        },
        include: {
          vendor: true,
        },
      });
    },
  }),
  updateFeaturedVendorImpressions: t.prismaField({
    type: FeaturedVendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, impressions } = payload;

      return await prisma.featuredVendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          impressions: impressions ? impressions : undefined,
        },
        include: {
          vendor: true,
        },
      });
    },
  }),
  updateFeaturedVendorClicks: t.prismaField({
    type: FeaturedVendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, clicks } = payload;

      return await prisma.featuredVendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          clicks: clicks ? clicks : undefined,
        },
        include: {
          vendor: true,
        },
      });
    },
  }),
  deleteFeaturedVendor: t.prismaField({
    type: FeaturedVendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.featuredVendor.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
