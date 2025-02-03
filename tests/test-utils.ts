import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@/app/provider';

export const renderApp = async (ui: React.ReactElement<any>) =>
  render(ui, { wrapper: AppProvider } as RenderOptions);

export * from '@testing-library/react';
export { userEvent, render };