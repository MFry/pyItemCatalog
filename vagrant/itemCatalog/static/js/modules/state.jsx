import {createStrore, combineReducers} from 'redux';

//Reducer for content updates
const content_reducer = function (state = {}, action) => {
    return state
};

const reducers = combineReducers({
    content: content_reducer
});

const store = createStrore(content_reducer());