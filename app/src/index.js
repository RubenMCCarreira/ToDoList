import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import ThemeProvider from './contexts/Theme';
import store from './store';

import './styles.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  rootElement
);
