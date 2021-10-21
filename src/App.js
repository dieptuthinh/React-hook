
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import './App.scss';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';
import ClockHook from './components/ClockHook/clockhook';
// import TodoForm from './components/TodoForm';
// import ColorBox from './components/ColorBox';
// import TodoList from './components/TodoList';

function App() {

  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend! 😍 " },
    { id: 2, title: "We love Easy Frontend! 🥰 " },
    { id: 3, title: "They love Easy Frontend! 🚀 " },
  ]);

  const [postList, setPostList] = useState([]);



  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    // title_like: ''
  });
  useEffect(() => {
    
    async function fetchPostList() {

      try {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl)
        const responseJSON = await response.json();
        const { data,pagination} = responseJSON;
        setPostList(data)
        setPagination(pagination)

      } catch (error) {
        console.log('FAILED', error.message);
      }

    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id)
    if (index <0 ) {
      return 0;
    }
    else {
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList)
    }
      
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValues
    };
    const newTodoList = [...todoList]
    newTodoList.push(newTodo);
    setTodoList(newTodoList)
  }

  function handleFilterChange(formValues) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: formValues.searchTerm,
    })
  }
  return (
    <div className="app">
      <h1>Hello ReacJS</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* Truyen cho thang con cai todoList voi ten la todos va truyen cho handleTodoClick voi ten la onTodoList */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      {/* <ColorBox/> */}

      {/*------------------------- useState ------------------- */}

      <PostFiltersForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />

      {/* ------------------------ useEffect-------------------- */}

      <Clock />
      <ClockHook/>
    </div>
  );
}

export default App;
