import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "@lib/prisma";
import { APP_SECRET } from "@graphql/utils/auth";
import { builder } from "../builder";
import { decryptData, encryptData } from "@utils/encryption";

export const Customer = builder.prismaObject("Customer", {
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
    language: t.exposeString("language", { nullable: true }),
    address: t.exposeString("address", { nullable: true }),
    city: t.exposeString("city", { nullable: true }),
    country: t.exposeString("country", { nullable: true }),
    emailVerified: t.exposeString("emailVerified", { nullable: true }),
    onlineStatus: t.exposeString("onlineStatus", { nullable: true }),
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  customers: t.prismaConnection({
    type: Customer,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.customer.findMany({
        ...query,
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.customer.count({ ...connection }),
  }),
  customersByStatus: t.prismaConnection({
    type: Customer,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { status } = payload;

      return await prisma.customer.findMany({
        ...query,
        where: {
          status,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { status } = payload;

      return await prisma.customer.count({
        ...connection,
        where: {
          status,
        },
      });
    },
  }),
  customersFiltered: t.prismaConnection({
    type: Customer,
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

      return await prisma.customer.findMany({
        ...query,
        ...(payload && { where }),
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

      return await prisma.customer.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  customerById: t.prismaField({
    type: Customer,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.customer.findUnique({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
  customerByEmail: t.prismaField({
    type: Customer,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email } = payload;

      return await prisma.customer.findUnique({
        ...query,
        where: {
          email,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  loginCustomer: t.prismaField({
    type: Customer,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email, password } = payload;

      let errMessage: string | null = null;

      const customer = await prisma.customer.findUnique({
        ...query,
        where: { email },
      });

      if (!customer) {
        errMessage = "No such customer found.";
        throw new Error("No such customer found.");
      }

      const valid =
        customer && (await bcrypt.compare(password, customer.password));

      if (!valid) {
        errMessage = "Invalid password.";
        throw new Error("Invalid password.");
      }

      // Update online status
      customer &&
        (await prisma.customer.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "online",
          },
        }));

      const authToken =
        (customer && valid && jwt.sign({ customer }, APP_SECRET)) || null;

      if (customer && true === valid && null !== authToken) {
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
  logoutCustomer: t.prismaField({
    type: Customer,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email } = payload;

      const customer = await prisma.customer.findUnique({
        ...query,
        where: { email },
      });

      if (!customer) return { email };

      // Update online status
      customer &&
        (await prisma.customer.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "offline",
          },
        }));

      // Remove the auth cookie
      await (await ctx).request.cookieStore.delete("auth");

      return { email: customer.email };
    },
  }),
  createCustomer: t.prismaField({
    type: "Customer",
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
        language,
        address,
        city,
        country,
        emailVerified,
      } = payload;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.customer.create({
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
          language,
          address,
          city,
          country,
          emailVerified,
        },
      });
    },
  }),
  updateCustomer: t.prismaField({
    type: "Customer",
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
      } = payload;

      return await prisma.customer.update({
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
        },
      });
    },
  }),
  updateCustomerPassword: t.prismaField({
    type: "Customer",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, password } = payload;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.customer.update({
        ...query,
        where: {
          id,
        },
        data: {
          password: hashedPassword ? hashedPassword : undefined,
        },
      });
    },
  }),
  updateCustomerImage: t.prismaField({
    type: "Customer",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, image } = payload;

      return await prisma.customer.update({
        ...query,
        where: {
          id,
        },
        data: {
          image: image ? image : undefined,
        },
      });
    },
  }),
  updateCustomerEmailVerified: t.prismaField({
    type: "Customer",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, emailVerified, status } = payload;

      return await prisma.customer.update({
        ...query,
        where: {
          id,
        },
        data: {
          emailVerified: emailVerified ? emailVerified : undefined,
          status: status ? status : undefined,
        },
      });
    },
  }),
  deleteCustomer: t.prismaField({
    type: "Customer",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.customer.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
