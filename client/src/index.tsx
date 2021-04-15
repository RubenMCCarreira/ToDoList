import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'tool/redux/initializeStore';
import App from './App';
import ThemeProvider from './contexts/Theme';
import SocketProvider from './contexts/Socket';
import './styles.scss';

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
