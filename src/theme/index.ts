'use client';
import { createTheme } from '@mui/material/styles';
import { colorSchemes, shadows, shape, typography } from './theme-primitives';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/data-display';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes,
  typography,
  shadows,
  shape,
  components: {
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
  },
});

export default theme;
