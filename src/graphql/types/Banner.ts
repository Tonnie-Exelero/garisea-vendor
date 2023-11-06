import prisma from "@lib/prisma";
import { builder } from "../builder";

export const Banner = builder.prismaObject("Banner", {
  fields: (t) => ({
    id: t.exposeID("id"),
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
  }),
});

builder.queryFields((t) => ({
  banners: t.prismaConnection({
    type: Banner,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.banner.findMany({
        ...query,
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.banner.count({ ...connection }),
  }),
  bannersFiltered: t.prismaConnection({
    type: Banner,
    cursor: "id",
    args: {
      type: t.arg.string(),
      title: t.arg.string(),
      link: t.arg.string(),
      page: t.arg.string(),
      position: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        ...(args.type && {
          type: {
            equals: args.type,
          },
        }),
        ...(args.title && {
          title: <any>{
            search: args.title,
            mode: "insensitive",
          },
        }),
        ...(args.link && {
          link: <any>{
            search: args.link,
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

      return await prisma.banner.findMany({
        ...query,
        where,
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const where = {
        ...(args.type && {
          type: {
            equals: args.type,
          },
        }),
        ...(args.title && {
          title: {
            contains: args.title,
          },
        }),
        ...(args.link && {
          link: {
            contains: args.link,
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

      return await prisma.banner.count({ ...connection, where });
    },
  }),
  bannerById: t.prismaField({
    type: Banner,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.banner.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createBanner: t.prismaField({
    type: Banner,
    args: {
      type: t.arg.string(),
      title: t.arg.string(),
      link: t.arg.string(),
      image: t.arg.string(),
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
      } = args;

      return await prisma.banner.create({
        ...query,
        data: {
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
      id: t.arg.string({ required: true }),
      type: t.arg.string(),
      title: t.arg.string(),
      link: t.arg.string(),
      image: t.arg.string(),
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
      } = args;

      return await prisma.banner.update({
        ...query,
        where: {
          id: args.id,
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
      });
    },
  }),
  updateBannerImpressions: t.prismaField({
    type: Banner,
    args: {
      id: t.arg.string({ required: true }),
      impressions: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { impressions } = args;

      return await prisma.banner.update({
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
  updateBannerClicks: t.prismaField({
    type: Banner,
    args: {
      id: t.arg.string({ required: true }),
      clicks: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { clicks } = args;

      return await prisma.banner.update({
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
  deleteBanner: t.prismaField({
    type: Banner,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.banner.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
