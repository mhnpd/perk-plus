import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProvider from './theme/theme-provider'

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider>
     <h1>Hello, world!</h1>
    </ThemeProvider>
  </React.StrictMode>
);