import React from 'react';
import {render} from 'react-dom';
import {provider} from 'react-redux';
import {content} from './content';
import configureStore from './store/store';
import {RestaurantListContainer} from './restaurantList';

const store = configureStore();
//Todo: http://redux.js.org/docs/basics/UsageWithReact.html#passing-the-store
render(
    <provider store={store}>
        <content />
    </provider>,
    document.getElementById('reactTest')
);
