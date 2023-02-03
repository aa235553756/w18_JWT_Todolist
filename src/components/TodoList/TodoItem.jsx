import React from "react";
export default function TodoItem({
  toggleTodo,
  item,
  delTodo
}) {
  return <li>
    <label className="todoList_label">
      <input className="todoList_input" type="checkbox" defaultChecked={item.completed_at} onClick={toggleTodo(item)} />
      <span>{item.content}</span>
    </label>
    <a href="#" onClick={delTodo(item.id)} //handleDelTodo
    >
      <i className="fa fa-times"></i>
    </a>
  </li>;
}
