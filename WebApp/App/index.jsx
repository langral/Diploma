import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app.jsx'
import configureStore from './store/configureStore.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const store = configureStore()

render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('content')
)