import { useRef } from "react";
import { addTodoApi, getTodoApi } from "../../helpers/apiTest";

export function TodoInput({ setData }) {
  const inputValue = useRef();

  function addTodo() {
    const { current: { value } } = inputValue;
    if (value === '') {
      return;
    }
    inputValue.current.value = '';
    addTodoApi(value)
      .then(() => {
        return getTodoApi();
      })
      .then((res) => {
        setData(res.data.todos);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function EnterAddTodo(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  return (<div className="inputBox">
    <input type="text" placeholder="請輸入待辦事項"
      ref={inputValue}
      onKeyPress={EnterAddTodo}
    />
    <a href="#"
      onClick={addTodo}
    >
      <i className="fa fa-plus"></i>
    </a>
  </div >);
}
