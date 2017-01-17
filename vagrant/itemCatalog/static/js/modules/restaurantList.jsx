import React from 'react';
import axios from 'axios'; //jQuery-less ajax
import {connect} from 'react-redux';
import MenuListContainer from './menuList';

function RestaurantItem(props) {
    return (
        <li >
            {props.name}{" "}
            {" "}
            <button data-restaurant-id={props.id}
                    className="edit-restaurant fa fa-pencil-square-o"></button>
            {" "}
            <button data-restaurant-id={props.id}
                    className="delete-restaurant glyphicon glyphicon-trash"></button>
        </li>

    );
}

export class RestaurantListContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurantItems: [],
        }
    }

    componentDidMount() {
        axios.get('/restaurants/json/').then((response) => {
            this.setState({
                restaurantItems: response.data.results,
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleClick(restaurant_id) {

    }

    render() {
        return (
            <RestaurantListView restaurants={this.state.restaurantItems}/>
        );
    }
}

class RestaurantListView extends React.Component {

    renderRestaurantItem(restaurant) {
        return <RestaurantItem name={restaurant.name} key={restaurant.id} id={restaurant.id}/>
    }

    render() {
        return (
            <ul>
                <h3>React Test</h3>
                {this.props.restaurants.map(
                    (restaurant, index) => {
                        return (
                            this.renderRestaurantItem(restaurant)
                        );
                    })}
            </ul>
        );
    }

}

const mapStateToProps = function (store) {
    return {
        content: store.contentState.content
    }
};

export default connect(mapStateToProps)(RestaurantListContainer);