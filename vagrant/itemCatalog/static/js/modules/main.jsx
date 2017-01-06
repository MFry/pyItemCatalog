import React from 'react';
import {render} from 'react-dom';
import {content} from './content';
import configureStore from './store/store';
import {RestaurantListContainer} from './restaurantList';

const store = configureStore();
//Todo: http://redux.js.org/docs/basics/UsageWithReact.html#passing-the-store
render(<content value={store.getState()}/>, document.getElementById('reactTest'));

//import {configureStore} from './store/configureStore';

/*const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
 */