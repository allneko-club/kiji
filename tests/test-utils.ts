import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@/app/provider';
import { createUser as generateUser } from './data-generators';
import { db } from './mocks/db';
import { hash } from './mocks/utils';

export const createUser = async (userProperties?: any) => {
  const user = generateUser(userProperties) as any;
  await db.user.create({ ...user, password: hash(user.password) });
  return user;
};

export const renderApp = async (ui: React.ReactElement<any>) =>
  render(ui, { wrapper: AppProvider } as RenderOptions);

export * from '@testing-library/react';
export { userEvent, render };