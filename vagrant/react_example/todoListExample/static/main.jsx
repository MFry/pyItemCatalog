/**
 * Created by michalfrystacky on 1/22/17.
 */
import expect from 'expect';
import freeze from 'deep-freeze-node';

const todos = (state = [], action) => {
    return state;
};

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    freeze(stateBefore);
    freeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

testAddTodo();
console.log('All tests passed.');