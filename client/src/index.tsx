import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import ThemeProvider from './contexts/Theme';
import store from 'tool/redux/initializeStore';

import './styles.scss';
import SocketProvider from './contexts/Socket';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <ThemeProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ThemeProvider>
  </Provider>,
  rootElement
);
