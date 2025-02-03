import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { ThemeProvider } from "next-themes";
import '@/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        // Default values
        { name: 'Dark', value: '#333' },
        { name: 'Light', value: '#F7F9F2' },
      ],
      // Specify which background is shown by default
      default: 'Light',
    },
  },

  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    })
  ],

  tags: ['autodocs']
};

export default preview;
