import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss'

TodoList.propTypes = {
    todos: PropTypes.array,
    onTodoClick: PropTypes.func,
};
//gia tri mac dinh neu th cha khong truyen du lieu xuong
TodoList.defaultProps = {
    todos: [],
    onTodoClick: null
};

function TodoList(props) {
    //khai bao cac props
    const { todos, onTodoClick } = props;

    //neu co su kien click vao thi no kiem tra đc click chua va truyen vao du lieu cua todo
    function handleClick(todo) {
        //neu onTodoClick: null co gia tri thi no se truyen todo vao
        if (onTodoClick) {
            onTodoClick(todo)
        }
    }
    return (
        <ul className="todo-list">

            {todos.map(todo => (
                <li
                    key={todo.id}
                    onClick={()=>handleClick(todo)}
                >
                    {todo.title}
                </li>
            ))}
            
        </ul>
    );
}

export default TodoList;