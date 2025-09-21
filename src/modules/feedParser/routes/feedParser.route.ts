import { FastifyInstance } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { fetchFeed } from "../services/feedParser.service";

const DEFAULT_URL = "https://feeds.feedburner.com/itcua"

const feedQuerySchema = {
  type: "object",
  properties: {
    url: { type: "string" },
    force: { type: "string", enum: ["0", "1"] },
  },
  additionalProperties: false,
} as const;

export async function getFeedDataRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  app.get(
    "/feed",
    {
      schema: {
        querystring: feedQuerySchema,
      },
    },
    async (request, reply) => {
      const { url, force } = request.query; 
      const result = await fetchFeed(url ?? DEFAULT_URL, force === "1");
      return reply.send(result);
    }
  );
}
