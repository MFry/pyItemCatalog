/**
 * Created by michalfrystacky on 1/22/17.
 */
import expect from "expect";
import deepFreeze from "deep-freeze";
import {combineReducers} from "redux";
import React from "react";
import ReactDOM from "react-dom";

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL',
                          action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};
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


let nextTodoId = 0;
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    };
};

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

const setVisibilityFilter = () => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
    };
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
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

const mapStateToLinkProps = (state,
                             ownProps) => {
    return {
        active: ownProps.filter ===
        state.visibilityFilter
    };
};

const mapDispatchToLinkProps = (dispatch,
                                ownProps) => {
    return {
        onClick: () => {
            dispatch(
                setVisibilityFilter(ownProps.filter)
            );
        }
    };
};

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink
                filter="SHOW_ALL"
            >
                All
            </FilterLink>
            {', '}
            <FilterLink
                filter="SHOW_ACTIVE"
            >
                Active
            </FilterLink>
            {', '}
            <FilterLink
                filter="SHOW_COMPLETED"
            >
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
                onClick={onTodoClick(todo.id)}
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

const mapStateTodoListToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};
const mapDispatchTodoListToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};
import {connect} from 'react-redux';
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

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
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
