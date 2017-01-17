import {combineReducers} from 'redux';
import * as actions from './actions';
import expect from 'expect';

//Reducer for content updates

const contentReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.LOAD_CONTENT:
            return {content: action.content};
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

const content_view = (state = {}, action) => {
    return {
        content: contentReducer(
            state,
            action.content
        ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    }
};


expect(contentReducer({}, 'DEFAULT')).toEqual({});

const contentBefore = {type: 'LOAD_CONTENT', content: 'Body information'};
const contentAfter = {content: 'Body information'};

expect(contentReducer({}, contentBefore)).toEqual(contentAfter);

deepfreeze(contentBefore);

export const reducers = combineReducers({
    content: contentReducer
});
