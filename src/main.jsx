import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'normalize.css'
import './assets/sass/style.scss';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ======================BOOTSTRAP======================================================================
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { Provider } from 'react-redux';
import store from '../src/tools/store/shopStore.js'
import { shopData, userData } from './tools/function/calldata.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ModeProvider } from './context/Mode.jsx';
import { FontsProvider } from './context/Fonts.jsx';


shopData();
userData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModeProvider>
      <FontsProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </FontsProvider>
    </ModeProvider>
  </React.StrictMode>,
)
