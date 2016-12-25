import {createStrore} from 'redux';
import {reducers} from './state';


export function configureStore() {
    return createStrore(reducers);
}