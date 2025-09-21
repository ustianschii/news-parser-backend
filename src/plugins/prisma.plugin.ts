import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const pluginName = "prisma-plugin";

export default fp(
  async (fastify: FastifyInstance) => {
    const prisma = new PrismaClient();

    await prisma.$connect();

    fastify.decorate("prisma", prisma);

    fastify.addHook("onClose", async (app) => {
      await app.prisma.$disconnect();
    });

    fastify.pluginLoaded(pluginName);
  },
  {
    name: pluginName,
  },
);

