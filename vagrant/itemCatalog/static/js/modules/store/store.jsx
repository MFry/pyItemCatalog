import {createStore} from 'redux';
import {reducers} from './state';

const store = createStore(reducers);

const configureStore = () => store;


export default configureStore;