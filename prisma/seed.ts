import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Category
  await prisma.category.create({
    data: {
      slug: 'uncategorized',
      name: '未分類',
    },
  })

  console.log("finished seeding.")
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