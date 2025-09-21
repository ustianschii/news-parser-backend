import Parser from "rss-parser";

const parser = new Parser();

export async function parseFeed(url: string) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items;
  } catch (error) {
    console.error("Error parsing feed:", error);
    return [];
  }
}
