import { FastifyInstance } from "fastify";
import { parseFeed } from "../../../modules/feedParser/services";
import { getFeedFromDB, saveFeedToDB } from "../../../services/feedService";

const DEFAULT_FEED_URL = "https://feeds.feedburner.com/itcua";

export async function getFeedDataRoutes(fastify: FastifyInstance) {
  fastify.get("/feed", async (request, reply) => {
	const url = (request.query as any).url || DEFAULT_FEED_URL;
	const force = (request.query as any).force === "1";

	if (!force) {
	  const cachedFeed = await getFeedFromDB(url);
	  if (cachedFeed) {
		return reply.send({ source: "db", items: JSON.parse(cachedFeed.items) });
	  }
	}

	const items = await parseFeed(url);

	await saveFeedToDB(url, items);

	return reply.send({ source: "parsed", items });
  });
}

