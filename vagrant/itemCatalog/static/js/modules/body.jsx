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


import {RestaurantListContainer} from './restaurantList';

/*
export default class BodyView extends React.Component {

    constructor() {
        super();
        this.state = {
            renderClass: RestaurantListContainer,
        }
    }

    renderBody(newContainer) {
        this.setState({
            renderClass: newcontainer,
        });
    }

    render() {
        return (
            <div className="container">
                <this.state.renderClass />
            </div>
        );
    }
}
 */