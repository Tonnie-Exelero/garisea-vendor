import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "@src/lib/prisma";
import { APP_SECRET } from "@graphql/utils/auth";
import { builder } from "../builder";
import { decryptData, encryptData } from "@core/utils/encryption";

export const User = builder.prismaObject("User", {
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
    role: t.relation("role", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  users: t.prismaConnection({
    type: User,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.user.findMany({
        ...query,
        include: {
          role: true,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.user.count({ ...connection }),
  }),
  usersByRoleId: t.prismaConnection({
    type: User,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { roleId } = payload;

      return await prisma.user.findMany({
        ...query,
        where: {
          roleId,
        },
        include: {
          role: true,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { roleId } = payload;

      return await prisma.user.count({
        ...connection,
        where: {
          roleId,
        },
      });
    },
  }),
  usersByStatus: t.prismaConnection({
    type: User,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { status } = payload;

      return await prisma.user.findMany({
        ...query,
        where: {
          status,
        },
        include: {
          role: true,
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

      return await prisma.user.count({
        ...connection,
        where: {
          status,
        },
      });
    },
  }),
  usersFiltered: t.prismaConnection({
    type: User,
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

      return await prisma.user.findMany({
        ...query,
        ...(payload && { where }),
        include: {
          role: true,
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

      return await prisma.user.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
  userById: t.prismaField({
    type: User,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.user.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          role: true,
        },
      });
    },
  }),
  userByEmail: t.prismaField({
    type: User,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email } = payload;

      return await prisma.user.findUnique({
        ...query,
        where: {
          email,
        },
        include: {
          role: true,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  loginUser: t.prismaField({
    type: User,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email, password } = payload;
      let errMessage: string | null = null;

      const user = await prisma.user.findUnique({
        ...query,
        where: { email },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      });

      if (!user) {
        errMessage = "No such user found.";
        throw new Error("No such user found.");
      }

      const valid = user && (await bcrypt.compare(password, user.password));

      if (!valid) {
        errMessage = "Invalid password.";
        throw new Error("Invalid password.");
      }

      // Update online status in DB
      user &&
        (await prisma.user.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "online",
          },
        }));

      const authToken =
        (user && valid && jwt.sign({ user }, APP_SECRET)) || null;

      if (user && true === valid && null !== authToken) {
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
  logoutUser: t.prismaField({
    type: User,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { email } = payload;

      const user = await prisma.user.findUnique({
        ...query,
        where: { email },
      });

      if (!user) return { email };

      // Update online status in DB
      user &&
        (await prisma.user.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "offline",
          },
        }));

      // Remove the auth cookie
      await (await ctx).request.cookieStore.delete("auth");

      return { email: user.email };
    },
  }),
  createUser: t.prismaField({
    type: "User",
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
        roleId,
      } = payload;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.user.create({
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
          role: { connect: { id: String(roleId) || undefined } },
        },
      });
    },
  }),
  updateUser: t.prismaField({
    type: "User",
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
        roleId,
      } = payload;

      return await prisma.user.update({
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
          role: roleId
            ? { connect: { id: String(roleId) || undefined } }
            : undefined,
        },
        include: {
          role: true,
        },
      });
    },
  }),
  updatePassword: t.prismaField({
    type: "User",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, password } = payload;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.user.update({
        ...query,
        where: {
          id,
        },
        data: {
          password: hashedPassword ? hashedPassword : undefined,
        },
        include: {
          role: true,
        },
      });
    },
  }),
  updateUserImage: t.prismaField({
    type: "User",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, image } = payload;

      return await prisma.user.update({
        ...query,
        where: {
          id,
        },
        data: {
          image: image ? image : undefined,
        },
        include: {
          role: true,
        },
      });
    },
  }),
  updateUserStatus: t.prismaField({
    type: "User",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.user.update({
        ...query,
        where: {
          id,
        },
        data: {
          status: status ? status : undefined,
        },
        include: {
          role: true,
        },
      });
    },
  }),
  updateUserEmailVerified: t.prismaField({
    type: "User",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, emailVerified } = payload;

      return await prisma.user.update({
        ...query,
        where: {
          id,
        },
        data: {
          emailVerified: emailVerified ? emailVerified : undefined,
        },
        include: {
          role: true,
        },
      });
    },
  }),
  deleteUser: t.prismaField({
    type: "User",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.user.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
