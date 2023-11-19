import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const Banner = builder.prismaObject("Banner", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vendor: t.relation("vendor", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
    type: t.exposeString("type", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),
    link: t.exposeString("link", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
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
  banners: t.prismaConnection({
    type: Banner,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.banner.findMany({
        ...query,
        ...(payload && {
          where: {
            ...(payload.vendorId && {
              vendorId: payload.vendorId,
            }),
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

      return await prisma.banner.count({
        ...connection,
        ...(payload && {
          where: {
            ...(payload.vendorId && {
              vendorId: payload.vendorId,
            }),
            ...(payload.status && {
              status: payload.status,
            }),
          },
        }),
      });
    },
  }),
  bannersFiltered: t.prismaConnection({
    type: Banner,
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
        ...(payload.type && {
          type: {
            equals: payload.type,
          },
        }),
        ...(payload.title && {
          title: <any>{
            search: payload.title,
            mode: "insensitive",
          },
        }),
        ...(payload.link && {
          link: <any>{
            search: payload.link,
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

      return await prisma.banner.findMany({
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
        ...(payload.type && {
          type: {
            equals: payload.type,
          },
        }),
        ...(payload.title && {
          title: <any>{
            search: payload.title,
            mode: "insensitive",
          },
        }),
        ...(payload.link && {
          link: <any>{
            search: payload.link,
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

      return await prisma.banner.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  bannerById: t.prismaField({
    type: Banner,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.banner.findUnique({
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
  createBanner: t.prismaField({
    type: Banner,
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const payload = args && args.pl && decryptData(args.pl);
      const {
        vendorId,
        status,
        type,
        title,
        link,
        image,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.banner.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          status,
          type,
          title,
          link,
          image,
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
  updateBanner: t.prismaField({
    type: Banner,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        id,
        type,
        title,
        link,
        image,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.banner.update({
        ...query,
        where: {
          id,
        },
        data: {
          type: type ? type : undefined,
          title: title ? title : undefined,
          link: link ? link : undefined,
          image: image ? image : undefined,
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
  updateBannerStatus: t.prismaField({
    type: Banner,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.banner.update({
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
  updateBannerImpressions: t.prismaField({
    type: Banner,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, impressions } = payload;

      return await prisma.banner.update({
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
  updateBannerClicks: t.prismaField({
    type: Banner,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, clicks } = payload;

      return await prisma.banner.update({
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
  deleteBanner: t.prismaField({
    type: Banner,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.banner.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
