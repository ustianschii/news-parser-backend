import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function getFeedFromDB(url: string) {
  return prisma.feed.findFirst({
    where: { url },
    orderBy: { createdAt: "desc" },
  });
}

export async function saveFeedToDB(url: string, items: any[]) {
  return prisma.feed.create({
    data: {
      url,
      items: JSON.stringify(items),
    },
  });
}
