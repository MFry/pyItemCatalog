/**
 * Created by michalfrystacky on 12/28/16.
 */

import {RestaurantListContainer} from './restaurantList';

//TODO: Link store and render initial content
RestaurantListContainer();

const content = () => {
    return (
        <div>

        </div>
    );
};

export default content;

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