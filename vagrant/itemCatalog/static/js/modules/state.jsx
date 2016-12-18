import {createStrore, combineReducers} from 'redux';
import * as actions from './_actions';

//Reducer for content updates
const content_reducer = function (state = {}, action) => {
    switch (action.type) {
        case actions.LOAD_CONTENT:
            return {content: action.content};
        //Object.assign({}, state, { content: action.content});
    }
    return state;
};

const reducers = combineReducers({
    content: content_reducer
});

export const store = createStrore(content_reducer());