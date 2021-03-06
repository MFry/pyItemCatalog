/**
 * Created by michalfrystacky on 1/22/17.
 */
import expect from "expect";
import deepFreeze from "deep-freeze";
import {combineReducers} from "redux";
import React from "react";
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import { v4 } from 'node-uuid';
import todoApp from 'reducers/index';

/*
 const combineReducers = (reducers) => {
 return (state = {}, action) => {
 return Object.keys(reducers).reduce(
 (nextState, key) => {
 nextState[key] = reducers[key](
 state[key],
 action
 );
 return nextState
 },
 {}
 );
 };
 };
 */
/*
const todoApp = (state = {}, action) => {
    return {
 todos: todos(
            state.todo,
            action
        ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    };
};
 */


const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

const getVisibleTodos = (
    todos,
    filter
) => {
  switch(filter) {
      case 'SHOW_ALL':
          return todos;
      case 'SHOW_COMPLETED':
          return todos.filter(
              t => t.completed
          );
      case 'SHOW_ACTIVE':
          return todos.filter(
              t => !t.completed
          );
      default:
          return todos;
  }
};

const Link = ({
    active,
    children,
    onClick
}) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href="#"
           onClick={e => {
               e.preventDefault();
               onClick();
           }}
        >
            {children}
        </a>

    );
};

const mapStateToLinkProps = (state, ownProps) => ({
    active: ownProps.filter ===
    state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick()  {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
});

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter="SHOW_ALL">
                All
            </FilterLink>
            {', '}
            <FilterLink filter="SHOW_ACTIVE">
                Active
            </FilterLink>
            {', '}
            <FilterLink filter="SHOW_COMPLETED">
                Completed
            </FilterLink>
        </p>
    );
};

const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>
        {text}
    </li>

);

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};
AddTodo = connect()(AddTodo);

const mapStateTodoListToProps = (state) => ({
    todos: getVisibleTodos(
        state.todos,
        state.visibilityFilter
    )
});
const mapDispatchTodoListToProps = (dispatch) => ({
    onTodoClick: (id) => {
        dispatch(toggleTodo(id));
    }
});

const VisibleTodoList = connect(
    mapStateTodoListToProps,
    mapDispatchTodoListToProps
)(TodoList);

const TodoApp = () => {
        return (
            <div>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        );
};

import {Provider} from 'react-redux';
import {createStore} from "redux";
import { loadState, saveState } from './localStorage';

const persistentState = loadState();

const store = createStore(todoApp, persistentState);

store.subscribe(() => {
   saveState({
       todos: store.getState().todos
    });
});

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);


/* testing
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

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Go shopping'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching SET_VISIBILITY_FILTER.');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

testAddTodo();
testToggleTodo();
console.log('All tests passed.');
 */
