import ReactDOM from 'react-dom/client';

//Para utilizar Redux dentro de los diferentes componetes de la App
import { Provider } from 'react-redux';
import store from './store/redux';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
