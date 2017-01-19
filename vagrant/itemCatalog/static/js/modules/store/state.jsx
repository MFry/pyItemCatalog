import {combineReducers} from 'redux';
import * as actions from './actions';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

//Reducer for content updates

const content = (state = {}, action) => {
    switch (action.type) {
        case actions.LOAD_CONTENT:
            return action.content;
        //Object.assign({}, state, { content: action.content});
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_RESTAURANTS',
                          action) => {
    switch (action.type) {
        case 'SHOW_MENU':
            return state;
        default:
            return state;
    }
};

expect(contentReducer({}, 'DEFAULT')).toEqual({});

const contentBefore = {type: 'LOAD_CONTENT', content: 'Body information'};
const contentAfter = {content: 'Body information'};

expect(contentReducer({}, contentBefore)).toEqual(contentAfter);

deepFreeze(contentBefore);
deepFreeze(contentAfter);

export const reducers = combineReducers({
    content: content,
    visibility: visibilityFilter
});

// Keys correspond to the fields it will manage
// Values correspond to the function being passed