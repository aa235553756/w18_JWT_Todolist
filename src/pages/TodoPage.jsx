import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthApi } from "../helpers/apiTest";
import { Navbar } from "/src/containers/Navbar";
import { TodoList } from "/src/containers/TodoList";
import '/src/scss/todo.scss'

export function TodoPage() {
  const navigate = useNavigate()

  function checkAuth() {
    checkAuthApi()
      .then(() => {
        // console.log(res);
      })
      .catch((err) => {
        navigate('/login', { replace: true })
        console.log(err);
      })
  }

  useEffect(() => {
    // '確認有無token'
    checkAuth()
    return () => { /*卸載元件*/ }
  }, [])

  return (
    <div id="todoListPage" className="bg-half">
      <Navbar></Navbar>
      <TodoList></TodoList>
    </div>);
}
