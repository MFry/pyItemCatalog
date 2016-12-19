/**
 * Created by michalfrystacky on 12/16/16.
 */

export const LOAD_CONTENT = 'LOAD_CONTENT';

//Action Creator
export function loadContent(content) {
    return {type: LOAD_CONTENT, content}
}