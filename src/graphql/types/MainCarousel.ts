import prisma from "@lib/prisma";
import { builder } from "../builder";

export const MainCarousel = builder.prismaObject("MainCarousel", {
  fields: (t) => ({
    id: t.exposeID("id"),
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
  }),
});

builder.queryFields((t) => ({
  mainCarousels: t.prismaConnection({
    type: MainCarousel,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.mainCarousel.findMany({
        ...query,
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.mainCarousel.count({ ...connection }),
  }),
  mainCarouselsFiltered: t.prismaConnection({
    type: MainCarousel,
    cursor: "id",
    args: {
      type: t.arg.string(),
      title: t.arg.string(),
      buttonLink: t.arg.string(),
      buttonText: t.arg.string(),
      description: t.arg.string(),
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
        ...(args.buttonLink && {
          buttonLink: <any>{
            search: args.buttonLink,
            mode: "insensitive",
          },
        }),
        ...(args.buttonText && {
          buttonText: <any>{
            search: args.buttonText,
            mode: "insensitive",
          },
        }),
        ...(args.description && {
          description: <any>{
            search: args.description,
            mode: "insensitive",
          },
        }),
      };

      return await prisma.mainCarousel.findMany({
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
          title: <any>{
            search: args.title,
            mode: "insensitive",
          },
        }),
        ...(args.buttonLink && {
          buttonLink: <any>{
            search: args.buttonLink,
            mode: "insensitive",
          },
        }),
        ...(args.buttonText && {
          buttonText: <any>{
            search: args.buttonText,
            mode: "insensitive",
          },
        }),
        ...(args.description && {
          description: <any>{
            search: args.description,
            mode: "insensitive",
          },
        }),
      };

      return await prisma.mainCarousel.count({ ...connection, where });
    },
  }),
  mainCarouselById: t.prismaField({
    type: MainCarousel,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.mainCarousel.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createMainCarousel: t.prismaField({
    type: MainCarousel,
    args: {
      type: t.arg.string(),
      title: t.arg.string(),
      image: t.arg.string(),
      buttonLink: t.arg.string(),
      buttonText: t.arg.string(),
      description: t.arg.string(),
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
        image,
        buttonLink,
        buttonText,
        description,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = args;

      return await prisma.mainCarousel.create({
        ...query,
        data: {
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
      id: t.arg.string({ required: true }),
      type: t.arg.string(),
      title: t.arg.string(),
      image: t.arg.string(),
      buttonLink: t.arg.string(),
      buttonText: t.arg.string(),
      description: t.arg.string(),
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
        image,
        buttonLink,
        buttonText,
        description,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = args;

      return await prisma.mainCarousel.update({
        ...query,
        where: {
          id: args.id,
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
      });
    },
  }),
  updateMainCarouselImpressions: t.prismaField({
    type: MainCarousel,
    args: {
      id: t.arg.string({ required: true }),
      impressions: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { impressions } = args;

      return await prisma.mainCarousel.update({
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
  updateMainCarouselClicks: t.prismaField({
    type: MainCarousel,
    args: {
      id: t.arg.string({ required: true }),
      clicks: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { clicks } = args;

      return await prisma.mainCarousel.update({
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
  deleteMainCarousel: t.prismaField({
    type: MainCarousel,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.mainCarousel.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
