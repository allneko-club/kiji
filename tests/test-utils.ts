import { AppProvider } from '@/app/provider';
import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const renderApp = async (ui: React.ReactElement<any>) =>
  render(ui, { wrapper: AppProvider } as RenderOptions);

export * from '@testing-library/react';
export { userEvent, render };
