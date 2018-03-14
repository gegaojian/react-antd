import React from 'react';
import ReactDom from 'react-dom';
//import Hello from 'component/Hello/Hello';
import getRouter from 'router/router2';
import {AppContainer} from 'react-hot-loader';

import {Provider} from 'react-redux';
import store from './redux/store';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// require("exports-loader?$!../node_modules/jquery/dist/jquery.js");

import 'bootstrap/dist/css/bootstrap.min.css';
require("expose-loader?$!jquery");
require("expose-loader?Popper!popper.js");
// import Popper from 'popper.js';
import 'bootstrap';
// import './app.css';




// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store)

// import Button from 'material-ui/Button';

/*初始化*/
renderWithHotReload(getRouter(history));

/*热更新*/
if (module.hot) {
  module
    .hot
    .accept('router/router2', () => {
      const getRouter = require('router/router2').default;
      renderWithHotReload(getRouter(history));
    });
}

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
    <Provider store={store}>
      {RootElement}
    </Provider>
  </AppContainer>, document.getElementById('app'))
}