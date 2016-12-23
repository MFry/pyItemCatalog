import {createStrore} from 'redux';
import {reducers} from './state';

export const store = createStrore(reducers);