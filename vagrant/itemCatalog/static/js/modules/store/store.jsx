import {createStore} from 'redux';
import {reducers} from './state';

const store = createStore(reducers);

//Ref: http://redux.js.org/docs/advanced/ExampleRedditAPI.html
const configureStore = () => store;


export default configureStore;