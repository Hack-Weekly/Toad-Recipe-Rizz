import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

export const client = new PrismaClient()

export const auth = lucia({
	adapter: prisma(client),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
  transformDatabaseUser: (userData) => {
    return {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        picture: userData.picture,
    }
  }
});

export type Auth = typeof auth;
