import React from 'react';
import {render} from 'react-dom';
import {body_content} from './content';
import {RestaurantListContainer} from './restaurantList';

render(<RestaurantListContainer />, document.getElementById('reactTest'));

//import {configureStore} from './store/configureStore';

/*const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
 */