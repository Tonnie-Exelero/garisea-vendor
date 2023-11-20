import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "@lib/prisma";
import { APP_SECRET } from "@graphql/utils/auth";
import { builder } from "../builder";
import { decryptData, encryptData } from "@utils/encryption";

export const Vendor = builder.prismaObject("Vendor", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName", { nullable: true }),
    lastName: t.exposeString("lastName", { nullable: true }),
    username: t.exposeString("username", { nullable: true }),
    email: t.exposeString("email", { nullable: false }),
    password: t.exposeString("password", { nullable: true }),
    phone: t.exposeString("phone", { nullable: true }),
    token: t.exposeString("token", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    storeLink: t.exposeString("storeLink", { nullable: true }),
    language: t.exposeString("language", { nullable: true }),
    address: t.exposeString("address", { nullable: true }),
    city: t.exposeString("city", { nullable: true }),
    country: t.exposeString("country", { nullable: true }),
    emailVerified: t.exposeString("emailVerified", { nullable: true }),
    vendorVerified: t.exposeString("vendorVerified", { nullable: true }),
    addedOrganization: t.exposeString("addedOrganization", { nullable: true }),
    identification: t.exposeString("identification", { nullable: true }),
    onlineStatus: t.exposeString("onlineStatus", { nullable: true }),
    organization: t.relation("organization", { nullable: true }),
    impressions: t.exposeInt("impressions", { nullable: true }),
    pageOpened: t.exposeInt("pageOpened", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  vendors: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.vendor.findMany({
        ...query,
        include: {
          organization: true,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.vendor.count({ ...connection }),
  }),
  vendorsByStatus: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { status } = payload;

      return await prisma.vendor.findMany({
        ...query,
        where: {
          status,
          ...(payload.hasVehicles === "yes" && {
            Vehicle: {
              some: {},
            },
          }),
        },
        include: {
          organization: true,
        },
        orderBy: {
          ...(payload.orderBy === "random"
            ? { id: "desc" }
            : { firstName: "asc" }),
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { status } = payload;

      return await prisma.vendor.count({
        ...connection,
        where: {
          status,
          ...(payload.hasVehicles === "yes" && {
            Vehicle: {
              some: {},
            },
          }),
        },
      });
    },
  }),
  vendorsFiltered: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { filter } = payload;

      const where = {
        OR: [
          { id: { contains: filter } },
          { firstName: { contains: filter } },
          { lastName: { contains: filter } },
          { username: { contains: filter } },
          { email: { contains: filter } },
          { phone: { contains: filter } },
          { city: { contains: filter } },
          { country: { contains: filter } },
        ],
      };

      return await prisma.vendor.findMany({
        ...query,
        ...(payload && { where }),
        include: {
          organization: true,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { filter } = payload;

      const where = {
        OR: [
          { id: { contains: filter } },
          { firstName: { contains: filter } },
          { lastName: { contains: filter } },
          { username: { contains: filter } },
          { email: { contains: filter } },
          { phone: { contains: filter } },
          { city: { contains: filter } },
          { country: { contains: filter } },
        ],
      };

      return await prisma.vendor.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  vendorById: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vendor.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  vendorByEmail: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email } = payload;

      return await prisma.vendor.findUnique({
        ...query,
        where: {
          email,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  vendorByStoreLink: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { storeLink } = payload;

      return await prisma.vendor.findUnique({
        ...query,
        where: {
          storeLink,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  vendorCheckEmail: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email } = payload;

      const vendor = await prisma.vendor.findUnique({
        ...query,
        where: {
          email,
        },
      });

      if (!vendor) {
        return {
          email: "no-email",
        };
      }

      if (vendor) {
        return {
          email: vendor.email,
        };
      }
    },
  }),
  vendorStoreLink: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { storeLink } = payload;

      const vendor = await prisma.vendor.findUnique({
        ...query,
        where: {
          storeLink,
        },
      });

      if (!vendor) {
        return {
          storeLink: null,
        };
      }

      if (vendor) {
        return {
          storeLink: vendor.storeLink,
        };
      }
    },
  }),
}));

builder.mutationFields((t) => ({
  loginVendor: t.prismaField({
    type: Vendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email, password } = payload;
      let errMessage: string | null = null;

      const vendor = await prisma.vendor.findUnique({
        ...query,
        where: { email },
        include: {
          organization: true,
        },
      });

      if (!vendor) {
        errMessage = "No such vendor found.";
        throw new Error("No such vendor found.");
      }

      const valid = vendor && (await bcrypt.compare(password, vendor.password));

      if (!valid) {
        errMessage = "Invalid password.";
        throw new Error("Invalid password.");
      }

      // Update online status
      vendor &&
        (await prisma.vendor.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "online",
          },
        }));

      const authToken =
        (vendor && valid && jwt.sign({ vendor }, APP_SECRET)) || null;

      if (vendor && true === valid && null !== authToken) {
        const domain =
          process.env.NEXT_PUBLIC_BASE_URL &&
          new URL(process.env.NEXT_PUBLIC_BASE_URL);

        // Set the auth cookie on the response
        await ctx.request.cookieStore.set({
          name: "auth",
          sameSite: "strict",
          // @ts-ignore
          secure: domain?.hostname.includes("localhost") ? false : true,
          // @ts-ignore
          domain: domain?.hostname,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          value: await encryptData(authToken),
          httpOnly: true,
        });

        return {
          token: encryptData(authToken),
        };
      }

      return {
        hasError: true,
        error: {
          type: "credentials",
          message: errMessage,
        },
      };
    },
  }),
  logoutVendor: t.prismaField({
    type: Vendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email } = payload;

      const vendor = await prisma.vendor.findUnique({
        ...query,
        where: { email },
      });

      if (!vendor) return { email };

      // Update online status
      vendor &&
        (await prisma.vendor.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "offline",
          },
        }));

      // Remove the auth cookie
      await (await ctx).request.cookieStore.delete("auth");

      return { email: vendor.email };
    },
  }),
  createVendor: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        phone,
        status,
        image,
        storeLink,
        language,
        address,
        city,
        country,
        emailVerified,
        vendorVerified,
        addedOrganization,
        organizationId,
      } = payload;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.vendor.create({
        ...query,
        data: {
          firstName,
          lastName,
          username,
          email,
          password: <any>hashedPassword,
          phone,
          status,
          image,
          storeLink,
          language,
          address,
          city,
          country,
          emailVerified,
          vendorVerified,
          addedOrganization,
          organization: {
            connect: { id: String(organizationId) || undefined },
          },
        },
      });
    },
  }),
  updateVendor: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        id,
        firstName,
        lastName,
        username,
        phone,
        status,
        image,
        language,
        address,
        city,
        country,
        organizationId,
      } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          firstName: firstName ? firstName : undefined,
          lastName: lastName ? lastName : undefined,
          username: username ? username : undefined,
          phone: phone ? phone : undefined,
          status: status ? status : undefined,
          image: image ? image : undefined,
          language: language ? language : undefined,
          address: address ? address : undefined,
          city: city ? city : undefined,
          country: country ? country : undefined,
          organization: organizationId
            ? { connect: { id: String(organizationId) || undefined } }
            : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorPassword: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, password } = payload;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          password: hashedPassword ? hashedPassword : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorImage: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, image } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          image: image ? image : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorStatus: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          status: status ? status : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorIdentification: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, identification } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          identification: identification ? identification : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorEmailVerified: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, emailVerified } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          emailVerified: emailVerified ? emailVerified : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorVerified: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, vendorVerified } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          vendorVerified: vendorVerified ? vendorVerified : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorAddedOrganization: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, addedOrganization } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          addedOrganization: addedOrganization ? addedOrganization : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorImpressions: t.prismaField({
    type: Vendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, impressions } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          impressions: impressions ? impressions : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  updateVendorPageOpened: t.prismaField({
    type: Vendor,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, pageOpened } = payload;

      return await prisma.vendor.update({
        ...query,
        where: {
          id,
        },
        data: {
          pageOpened: pageOpened ? pageOpened : undefined,
        },
        include: {
          organization: true,
        },
      });
    },
  }),
  deleteVendor: t.prismaField({
    type: "Vendor",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vendor.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
