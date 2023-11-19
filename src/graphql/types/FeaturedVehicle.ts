import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

export const FeaturedVehicle = builder.prismaObject("FeaturedVehicle", {
  fields: (t) => ({
    id: t.exposeID("id"),
    vendor: t.relation("vendor", { nullable: true }),
    vehicle: t.relation("vehicle", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
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
  featuredVehicles: t.prismaConnection({
    type: FeaturedVehicle,
    cursor: "id",
    args: {
      pl: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const payload = args && args.pl && decryptData(args.pl);

      return await prisma.featuredVehicle.findMany({
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
          vehicle: true,
        },
        orderBy: {
          rank: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      return await prisma.featuredVehicle.count({
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
  featuredVehiclesFiltered: t.prismaConnection({
    type: FeaturedVehicle,
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
        ...(payload.vehicleId && {
          vehicleId: {
            equals: payload.vehicleId,
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

      return await prisma.featuredVehicle.findMany({
        ...query,
        ...(payload && { where }),
        include: {
          vendor: true,
          vehicle: true,
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
        ...(payload.vehicleId && {
          vehicleId: {
            equals: payload.vehicleId,
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

      return await prisma.featuredVehicle.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  featuredVehicleById: t.prismaField({
    type: FeaturedVehicle,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.featuredVehicle.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          vendor: true,
          vehicle: true,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createFeaturedVehicle: t.prismaField({
    type: FeaturedVehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        vehicleId,
        vendorId,
        status,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.featuredVehicle.create({
        ...query,
        data: {
          vehicle: { connect: { id: String(vehicleId) || undefined } },
          vendor: { connect: { id: String(vendorId) || undefined } },
          status,
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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        id,
        page,
        position,
        rank,
        impressions,
        clicks,
        targetImpressions,
        targetClicks,
      } = payload;

      return await prisma.featuredVehicle.update({
        ...query,
        where: {
          id,
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
        include: {
          vendor: true,
          vehicle: true,
        },
      });
    },
  }),
  updateFeaturedVehicleStatus: t.prismaField({
    type: FeaturedVehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.featuredVehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          status: status ? status : undefined,
        },
        include: {
          vendor: true,
          vehicle: true,
        },
      });
    },
  }),
  updateFeaturedVehicleImpressions: t.prismaField({
    type: FeaturedVehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, impressions } = payload;

      return await prisma.featuredVehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          impressions: impressions ? impressions : undefined,
        },
        include: {
          vendor: true,
          vehicle: true,
        },
      });
    },
  }),
  updateFeaturedVehicleClicks: t.prismaField({
    type: FeaturedVehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, clicks } = payload;

      return await prisma.featuredVehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          clicks: clicks ? clicks : undefined,
        },
        include: {
          vendor: true,
          vehicle: true,
        },
      });
    },
  }),
  deleteFeaturedVehicle: t.prismaField({
    type: FeaturedVehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.featuredVehicle.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
