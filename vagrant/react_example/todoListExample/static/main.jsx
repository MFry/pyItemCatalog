/**
 * Created by michalfrystacky on 1/22/17.
 */
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {createStore, combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

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
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);

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

const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>;
    }

    return (
        <a href="#"
           onClick={e => {
               e.preventDefault();
               store.dispatch({
                   type: 'SET_VISIBILITY_FILTER',
                   filter
               });
           }}
        >
            {children}
        </a>

    );
};

const FilterLinks = ({
    filters,
    currentFilter
}) => {
    return (
        <p>
            {(filters.map(f => {
                return (
                    <FilterLink
                        filter={f[0]}
                        currentFilter={currentFilter}
                    >
                        {f[1]}

                    </FilterLink>
                );
            })).map(FilterLink => {
                return (
                    <span>
                      {' '}
                        {FilterLink}
                  </span>
                );
            })}
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

const AddTodo = ({
    onAddClick
}) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                onAddClick(input.value);
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};

let nextToDoId = 0;
class TodoApp extends React.Component {
    render() {
        const {
            todos,
            visibilityFilter
        } = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
        const filters = [["SHOW_ALL", 'All'], ["SHOW_ACTIVE", 'Active'], ["SHOW_COMPLETED", 'Completed']];
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        store.dispatch({
                            type: 'ADD_TODO',
                            text: input.value,
                            id: nextToDoId++
                        })
                    }
                />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={id =>
                        store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
                    }
                />
                    Show:
                <FilterLinks filters={filters} currentFilter={visibilityFilter}/>

            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp
            {...store.getState()}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

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