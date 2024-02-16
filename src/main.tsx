import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import store from './store.ts';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    overflow: hidden;
	margin: 0;
  	padding: 0;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
