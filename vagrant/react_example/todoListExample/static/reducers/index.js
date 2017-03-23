/**
 * Created by michalfrystacky on 3/22/17.
 */
import todos from './reducers/todos';
import visibilityFilter from './reducers/visibilityFilter';
import { combineReducers } from "redux";

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

export default todoApp;