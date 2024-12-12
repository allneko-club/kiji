import { render, RenderOptions, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';

import { AppProvider } from '@/app/provider';
import { createUser as generateUser } from './data-generators';
import { db } from './mocks/db';
import { AUTH_COOKIE, authenticate, hash } from './mocks/utils';

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

export const createUser = async (userProperties?: any) => {
  const user = generateUser(userProperties) as any;
  await db.user.create({ ...user, password: hash(user.password) });
  return user;
};

// todo auth.js を使ったログイン方法に変更する
export const loginAsUser = async (user: any) => {
  const authUser = await authenticate(user);
  Cookies.set(AUTH_COOKIE, authUser.jwt);
  return authUser;
};

const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    const newUser = await createUser();
    return loginAsUser(newUser);
  } else if (user) {
    return loginAsUser(user);
  } else {
    return null;
  }
};

export const renderApp = async (ui: React.ReactElement<any>) =>
  render(ui, { wrapper: AppProvider } as RenderOptions);

export * from '@testing-library/react';
export { userEvent, render };