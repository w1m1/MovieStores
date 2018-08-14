import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import router from './router';
import registerServiceWorker from './registerServiceWorker';
import store from "./store"

import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
