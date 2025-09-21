import { parseFeed } from "./rss.service";
import { getFeedFromDB, saveFeedToDB } from "../../../services/feedService";
import { DEFAULT_FEED_URL } from "../../../constants";


export async function fetchFeed(url?: string, force?: boolean) {
  const feedUrl = url || DEFAULT_FEED_URL;

  if (!force) {
    const cachedFeed = await getFeedFromDB(feedUrl);
    if (cachedFeed) {
      return { source: "db", items: JSON.parse(cachedFeed.items) };
    }
  }

  const items = await parseFeed(feedUrl);
  await saveFeedToDB(feedUrl, items);

  return { source: "parsed", items };
}
