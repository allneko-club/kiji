import { prisma } from '@/express/prisma';
import { OrderBy } from '@/types/utils';

type GetUsersProps = {
  id?: string;
  name?: string;
  email?: string;
  registeredFrom?: Date;
  registeredTo?: Date;
  page: number;
  perPage: number;
  order: string;
  orderBy: OrderBy;
}

export const getUsers = async (params: GetUsersProps) => {
  const where = {
    id: {
      contains: params.id
    },
    name: {
      contains: params.name
    },
    email: {
      contains: params.email
    },
    createdAt: {
      gte: params.registeredFrom,
      lte: params.registeredTo
    },
  }
  const orderBy:{[key: string]: string} = {}

  if(params.order === 'name'){
    orderBy['name'] = params.orderBy
  }else if(params.order === 'registered'){
    orderBy['createdAt'] = params.orderBy
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
      orderBy: orderBy,
    }),
    prisma.user.count({where}),
  ])
  return {users, total}
}

export const getUser = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    }
  });
}
