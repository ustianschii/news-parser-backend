import buildApp from "../app"; 


async function main() {
  const app = await buildApp({});

  try {
  
  } catch (error) {
    app.log.error("Prisma operation error:", error);
  }
}

main();
