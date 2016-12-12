import React from 'react';
import {RestaurantListContainer} from './restaurantList';

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