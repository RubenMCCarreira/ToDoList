import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Application from './Application';
import ThemeProvider from './contexts/Theme';
import store from './store';

import './styles.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Application />
    </ThemeProvider>
  </Provider>,
  rootElement
);
