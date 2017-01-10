import {combineReducers} from 'redux';
import * as actions from './actions';
import expect from 'expect';

//Reducer for content updates
const content_reducer = (state = {}, action) => {
    switch (action.type) {
        case actions.LOAD_CONTENT:
            return {content: action.content};
        //Object.assign({}, state, { content: action.content});
        default:
            return state;
    }
};

//expect(content_reducer({}, 'DEFAULT')).toEqual({});
expect(true).toEqual(true);

expect(content_reducer({}, {type: 'LOAD_CONTENT', content: 'New'})).toEqual({content: 'New'});

export const reducers = combineReducers({
    content: content_reducer
});
