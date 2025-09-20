import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

async function main() {

   const newPost = await prisma.post.create({
        data: {
            title: "My first post",
            body: "Hello, Prisma + MongoDB!"
        }
    })
    console.log("Created:", newPost)
    
  const allPosts = await prisma.post.findMany()
  console.log(allPosts)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })