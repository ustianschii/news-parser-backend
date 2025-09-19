import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import sensible from "@fastify/sensible";

const pluginName = "sensible-plugin";

export default fp(
  async (fastify: FastifyInstance) => {
    fastify.register(sensible);
    fastify.pluginLoaded(pluginName);
  },
  {
    name: pluginName,
  }
);
