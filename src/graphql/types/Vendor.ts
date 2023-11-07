import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "@lib/prisma";
import { APP_SECRET } from "@graphql/utils/auth";
import { builder } from "../builder";
import { encryptData } from "@utils/encryption";

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
  }),
});

builder.queryFields((t) => ({
  vendors: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.vendor.findMany({
        ...query,
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
      status: t.arg.string({ required: true }),
      hasVehicles: t.arg.string(),
      orderBy: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { status, hasVehicles, orderBy } = args;

      return await prisma.vendor.findMany({
        ...query,
        where: {
          status,
          ...(hasVehicles === "yes" && {
            Vehicle: {
              some: {},
            },
          }),
        },
        orderBy: {
          ...(orderBy === "random" ? { id: "desc" } : { firstName: "asc" }),
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.vendor.count({
        ...connection,
        where: {
          status: args.status,
          ...(args.hasVehicles === "yes" && {
            Vehicle: {
              some: {},
            },
          }),
        },
      }),
  }),
  vendorsFiltered: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    args: {
      filter: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { firstName: { contains: args.filter } },
          { lastName: { contains: args.filter } },
          { username: { contains: args.filter } },
          { email: { contains: args.filter } },
          { phone: { contains: args.filter } },
          { city: { contains: args.filter } },
          { country: { contains: args.filter } },
        ],
      };

      return await prisma.vendor.findMany({
        ...query,
        where,
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { firstName: { contains: args.filter } },
          { lastName: { contains: args.filter } },
          { username: { contains: args.filter } },
          { email: { contains: args.filter } },
          { phone: { contains: args.filter } },
          { city: { contains: args.filter } },
          { country: { contains: args.filter } },
        ],
      };

      return await prisma.vendor.count({ ...connection, where });
    },
  }),
  vendorById: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vendor.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
  vendorByEmail: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vendor.findUnique({
        ...query,
        where: {
          email: args.email,
        },
      }),
  }),
  vendorByStoreLink: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      storeLink: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vendor.findUnique({
        ...query,
        where: {
          storeLink: args.storeLink,
        },
      }),
  }),
  vendorCheckEmail: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info): Promise<any | undefined> => {
      const vendor = await prisma.vendor.findUnique({
        ...query,
        where: {
          email: args.email,
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
      storeLink: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info): Promise<any | undefined> => {
      const vendor = await prisma.vendor.findUnique({
        ...query,
        where: {
          storeLink: args.storeLink,
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
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { email, password } = args;
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
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { email } = args;

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
      firstName: t.arg.string(),
      lastName: t.arg.string(),
      username: t.arg.string(),
      email: t.arg.string({ required: true }),
      password: t.arg.string(),
      phone: t.arg.string(),
      status: t.arg.string(),
      image: t.arg.string(),
      storeLink: t.arg.string(),
      language: t.arg.string(),
      address: t.arg.string(),
      city: t.arg.string(),
      country: t.arg.string(),
      emailVerified: t.arg.string(),
      vendorVerified: t.arg.string(),
      addedOrganization: t.arg.string(),
      organizationId: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
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
      } = args;

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
      id: t.arg.string({ required: true }),
      firstName: t.arg.string(),
      lastName: t.arg.string(),
      username: t.arg.string(),
      phone: t.arg.string(),
      status: t.arg.string(),
      image: t.arg.string(),
      language: t.arg.string(),
      address: t.arg.string(),
      city: t.arg.string(),
      country: t.arg.string(),
      organizationId: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
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
      } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
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
      });
    },
  }),
  updateVendorPassword: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      password: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { password } = args;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          password: hashedPassword ? hashedPassword : undefined,
        },
      });
    },
  }),
  updateVendorImage: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      image: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { image } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          image: image ? image : undefined,
        },
      });
    },
  }),
  updateVendorStatus: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { status } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          status: status ? status : undefined,
        },
      });
    },
  }),
  updateVendorIdentification: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      identification: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { identification } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          identification: identification ? identification : undefined,
        },
      });
    },
  }),
  updateVendorEmailVerified: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      emailVerified: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { emailVerified } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          emailVerified: emailVerified ? emailVerified : undefined,
        },
      });
    },
  }),
  updateVendorVerified: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      vendorVerified: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { vendorVerified } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          vendorVerified: vendorVerified ? vendorVerified : undefined,
        },
      });
    },
  }),
  updateVendorAddedOrganization: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      addedOrganization: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { addedOrganization } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          addedOrganization: addedOrganization ? addedOrganization : undefined,
        },
      });
    },
  }),
  updateVendorImpressions: t.prismaField({
    type: Vendor,
    args: {
      id: t.arg.string({ required: true }),
      impressions: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { impressions } = args;

      return await prisma.vendor.update({
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
  updateVendorPageOpened: t.prismaField({
    type: Vendor,
    args: {
      id: t.arg.string({ required: true }),
      pageOpened: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pageOpened } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          pageOpened: pageOpened ? pageOpened : undefined,
        },
      });
    },
  }),
  deleteVendor: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.vendor.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
