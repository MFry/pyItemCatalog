import React from 'react';
import {render} from 'react-dom';
import {configureStore} from './store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);