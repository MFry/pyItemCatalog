/**
 * Created by michalfrystacky on 12/16/16.
 */
import * as types from './types';

//Action Creator
export function loadContent(content) {
    return {type: types.LOAD_CONTENT, content}
}

//Dispatch Creator
export function requestRestaurants() {
    return {
        [types.API_REQUEST_RESTAURANTS]: {
            method: 'get',
            path: '/restaurants/json/',
            sendingType: types.API_REQUEST_RESTAURANTS,
            successType: types.API_REQUEST_SUCCESS,
            failureType: types.API_REQUEST_FAILURE
        }
    }
}