import prisma from "@lib/prisma";
import { builder } from "../builder";

export const FeaturedVehicle = builder.prismaObject("FeaturedVehicle", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vehicle: t.relation("vehicle", { nullable: true }),
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
  featuredVehicles: t.prismaConnection({
    type: FeaturedVehicle,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.featuredVehicle.findMany({
        ...query,
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.featuredVehicle.count({ ...connection }),
  }),
  featuredVehiclesFiltered: t.prismaConnection({
    type: FeaturedVehicle,
    cursor: "id",
    args: {
      vehicleId: t.arg.string(),
      page: t.arg.string(),
      position: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        ...(args.vehicleId && {
          vehicleId: {
            equals: args.vehicleId,
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

      return await prisma.featuredVehicle.findMany({
        ...query,
        where,
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const where = {
        ...(args.vehicleId && {
          vehicleId: {
            equals: args.vehicleId,
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

      return await prisma.featuredVehicle.count({ ...connection, where });
    },
  }),
  featuredVehicleById: t.prismaField({
    type: FeaturedVehicle,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.featuredVehicle.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  createFeaturedVehicle: t.prismaField({
    type: FeaturedVehicle,
    args: {
      vehicleId: t.arg.string({ required: true }),
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
        vehicleId,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = args;

      return await prisma.featuredVehicle.create({
        ...query,
        data: {
          vehicle: { connect: { id: String(vehicleId) || undefined } },
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
  updateFeaturedVehicle: t.prismaField({
    type: FeaturedVehicle,
    args: {
      id: t.arg.string({ required: true }),
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
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = args;

      return await prisma.featuredVehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
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
  updateFeaturedVehicleImpressions: t.prismaField({
    type: FeaturedVehicle,
    args: {
      id: t.arg.string({ required: true }),
      impressions: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { impressions } = args;

      return await prisma.featuredVehicle.update({
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
  updateFeaturedVehicleClicks: t.prismaField({
    type: FeaturedVehicle,
    args: {
      id: t.arg.string({ required: true }),
      clicks: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { clicks } = args;

      return await prisma.featuredVehicle.update({
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
  deleteFeaturedVehicle: t.prismaField({
    type: FeaturedVehicle,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.featuredVehicle.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
