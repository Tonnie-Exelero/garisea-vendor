import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const MainCarousel = builder.prismaObject("MainCarousel", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vendor: t.relation("vendor", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
    type: t.exposeString("type", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    buttonLink: t.exposeString("buttonLink", { nullable: true }),
    buttonText: t.exposeString("buttonText", { nullable: true }),
    description: t.exposeString("description", { nullable: true }),
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
  mainCarousels: t.prismaConnection({
    type: MainCarousel,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.mainCarousel.findMany({
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

      return await prisma.mainCarousel.count({
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
  mainCarouselsFiltered: t.prismaConnection({
    type: MainCarousel,
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
        ...(payload.buttonLink && {
          buttonLink: <any>{
            search: payload.buttonLink,
            mode: "insensitive",
          },
        }),
        ...(payload.buttonText && {
          buttonText: <any>{
            search: payload.buttonText,
            mode: "insensitive",
          },
        }),
        ...(payload.description && {
          description: <any>{
            search: payload.description,
            mode: "insensitive",
          },
        }),
      };

      return await prisma.mainCarousel.findMany({
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
        ...(payload.buttonLink && {
          buttonLink: <any>{
            search: payload.buttonLink,
            mode: "insensitive",
          },
        }),
        ...(payload.buttonText && {
          buttonText: <any>{
            search: payload.buttonText,
            mode: "insensitive",
          },
        }),
        ...(payload.description && {
          description: <any>{
            search: payload.description,
            mode: "insensitive",
          },
        }),
      };

      return await prisma.mainCarousel.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  mainCarouselById: t.prismaField({
    type: MainCarousel,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { id } = payload;

      return await prisma.mainCarousel.findUnique({
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
  createMainCarousel: t.prismaField({
    type: MainCarousel,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        vendorId,
        status,
        type,
        title,
        image,
        buttonLink,
        buttonText,
        description,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.mainCarousel.create({
        ...query,
        data: {
          vendor: { connect: { id: String(vendorId) || undefined } },
          status,
          type,
          title,
          image,
          buttonLink,
          buttonText,
          description,
          rank,
          impressions,
          clicks,
          targetImpressions,
          targetClicks,
        },
      });
    },
  }),
  updateMainCarousel: t.prismaField({
    type: MainCarousel,
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
        image,
        buttonLink,
        buttonText,
        description,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.mainCarousel.update({
        ...query,
        where: {
          id,
        },
        data: {
          type: type ? type : undefined,
          title: title ? title : undefined,
          image: image ? image : undefined,
          buttonLink: buttonLink ? buttonLink : undefined,
          buttonText: buttonText ? buttonText : undefined,
          description: description ? description : undefined,
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
  updateMainCarouselStatus: t.prismaField({
    type: MainCarousel,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.mainCarousel.update({
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
  updateMainCarouselImpressions: t.prismaField({
    type: MainCarousel,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, impressions } = payload;

      return await prisma.mainCarousel.update({
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
  updateMainCarouselClicks: t.prismaField({
    type: MainCarousel,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { id, clicks } = payload;

      return await prisma.mainCarousel.update({
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
  deleteMainCarousel: t.prismaField({
    type: MainCarousel,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const { id } = payload;

      return await prisma.mainCarousel.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
