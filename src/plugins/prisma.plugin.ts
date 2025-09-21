import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";

import { PrismaClient } from "../../prisma/generated/prisma"; 

const pluginName = "prisma-plugin";

export default fp(
  async (fastify: FastifyInstance) => {
    let prisma: PrismaClient;

    try {
      prisma = new PrismaClient();
      await prisma.$connect();

      fastify.decorate("prisma", prisma);

      fastify.addHook("onClose", async (fastify) => {
        try {
          await fastify.prisma.$disconnect();
          fastify.log.info("Prisma disconnected successfully");
        } catch (err) {
          fastify.log.error("Error disconnecting Prisma:", err);
        }
      });

      fastify.log.info("Prisma connected successfully");
      fastify.pluginLoaded(pluginName);
    } catch (err) {
      fastify.log.error("Error connecting Prisma:", err);
      throw err; 
    }
  },
  {
    name: pluginName,
  },
);

