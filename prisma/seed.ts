import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { hash } from '@/lib/utils';
import { Role } from '@/config/consts';

const prisma = new PrismaClient()

async function main() {

  dotenv.config() // Load the environment variables

  const name = process.env.ADMIN_USERNAME
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if(!name  || !email || !password) {
    console.error('Invalid administrator data in .env')
    return;
  }

  // Create Admin
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hash(password),
      role: Role.ADMIN,
    },
  })

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