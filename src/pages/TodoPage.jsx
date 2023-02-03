import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthApi } from "../helpers/apiTest";
import { Navbar } from "/src/containers/Navbar";
import { TodoList } from "/src/containers/TodoList";
import '/src/scss/todo.scss'

export function TodoPage() {
  //假設local有token,但已經過期,此時進入首頁,有token,ProtectRoute會失效，就需要以下程式碼
  //ProtectRoutea沒有通過這頁(元件)也進不來,(連api都不打)
  const navigate = useNavigate()

  function checkAuth() {
    checkAuthApi()
      .then(() => {
        // console.log(res);
      })
      .catch((err) => {
        setToken(null); //將過期token重置為null
        localStorage.removeItem('token'); //同時也刪除local內的舊token
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
