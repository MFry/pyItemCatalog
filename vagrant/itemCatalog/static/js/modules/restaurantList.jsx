/*** @jsx React.DOM */
import React from 'react';
import ReactDOM from 'react-dom';

function RestaurantItem(props) {
    return (
        <li key={props.id}>
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

class RestaurantListContainer extends React.Component {

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

    render() {
        return (
            <RestaurantListView restaurants={this.state.restaurantItems}/>
        );
    }
}

class RestaurantListView extends React.Component {

    renderRestaurantItem(restaurant) {
        return <RestaurantItem name={restaurant.name} id={restaurant.id}/>
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

ReactDOM.render(
    <RestaurantListContainer/>,
    document.getElementById('reactTest')
);