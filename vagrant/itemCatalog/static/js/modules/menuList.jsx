//TODO: Implement Browserify
import React from 'react';
import axios from 'axios';

/**
 * Created by michalfrystacky on 12/3/16.
 */
function MenuItem(props) {
    return (
        <div className="row">
            <div className="col-md-6">
                {props.name}
                <button className="edit-button fa fa-pencil-square-o btn btn-default" data-menu-id={props.id}
                        data-restaurant-id={props.id}></button>
                <button data-restaurant-id={props.id}
                        className="delete-restaurant glyphicon glyphicon-trash"></button>
            </div>
        </div>
    );
}

export default class MenuListContainer extends React.Component {
    constructor(restaurant_id) {
        super();
        this.state = {
            //listItems: [{name: 'test', id: 5}]
            listItems: [],
            id: restaurant_id
        }
    }

    componentDidMount() {
        axios.get('/restaurants/' + this.state.id + '/menu/json').then((response) => {
            response.map(data => this.state.listItems.add(data));
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleDelete(restaurant_id) {
        $.confirm({
            title: 'Delete Confirmation',
            content: 'Are you sure you wish to delete?',
            theme: 'material',
            confirm: function () {
                axios.post('/restaurants/' + restaurant_id + '/delete/', {}).then(
                    //find ID and set the state to remove the item
                ).catch(function (error) {
                    console.log(error);
                });
                /*
                $.ajax({
                    url: '/restaurants/' + restaurant + '/delete/',
                    type: 'POST',
                    success: function () {
                        localStorage.setItem('result', 'success');
                        localStorage.setItem('message', 'Restaurant Deleted');
                        location.reload();
                    }

                });
                 */
            },
            cancel: function () {
                toastr.info('Delete Cancelled');
            }
        })
    }

    render() {
        return <MenuListView listItems={this.state.listItems}/>
    }
}

class MenuListView extends React.Component {

    renderMenuItem() {
        return (
            <MenuItem name={this.state.listItems[0].name} id={this.state.listItems[0].id}/>
        );
    }

    render() {
        return (
            <div>
                {this.props.listItems.map(function (item) {
                    return (
                        <MenuItem name={item.name} id={item.id}/>
                    );
                })}
            </div>
        );
    }
}