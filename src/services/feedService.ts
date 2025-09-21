import { PrismaClient } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export async function getFeedFromDB(url: string) {
  return prisma.feed.findFirst({
    where: { url },
    orderBy: { createdAt: "desc" },
  });
}

export async function saveFeedToDB(url: string, items: any[]) {
  return prisma.feed.upsert({
    where: { url }, 
    update: {
      items: JSON.stringify(items),
      createdAt: new Date(), 
    },
    create: {
      url,
      items: JSON.stringify(items),
      createdAt: new Date(),
    },
  });
}
