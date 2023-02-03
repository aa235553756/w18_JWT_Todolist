import TabItem from '../components/TodoList/TabItem';
import TodoItem from '../components/TodoList/TodoItem';
import { useEffect, useReducer, useState } from "react";
import { TodoInput } from "../components/TodoList/TodoInput";
import { delTodoApi, getTodoApi, toggleTodoApi } from "../helpers/apiTest";

export function TodoList() {
  const [tabData, setTabData] = useState([
    {
      content: '全部',
      className: 'active'
    },
    {
      content: '待完成',
      className: null
    },
    {
      content: '已完成',
      className: null
    }
  ]);
  const [tabState, setTabState] = useState('全部');
  const [data, setData] = useState([]); // !api回來的data
  const [todo, dispatchFn] = useReducer(reducerFn, []); // !拿來渲染的todo,跑map

  // reducerFn 這樣寫的好處在於需要特定的State更明確
  function reducerFn(state, action) {
    switch (action.type) {
      case 'getData': //函式
        return data
      case 'unCompleted':
        return data.filter(item => item.completed_at === null)
      case 'isCompleted':
        return data.filter(item => item.completed_at)
      default:
        return state
    }
  }

  // dispatchFn()
  function getData() {
    dispatchFn({ type: 'getData' })
  }
  function unCompleted() {
    dispatchFn({ type: 'unCompleted' })
  }
  function isCompleted() {
    dispatchFn({ type: 'isCompleted' })
  }

  // 綁定DOM事件
  function changeTab(index, item) {
    return () => {
      const newTabData = [...tabData];
      newTabData.map((item) => {
        item.className = null; //全部設為null
        newTabData[index].className = 'active'; //指定index設為active
        return item;
      });
      setTabData(newTabData);
      setTabState(item.content);
    };
  }
  function toggleTodo(item) {
    return () => {
      toggleTodoApi(item.id)
        .then((res) => {
          return getTodoApi();
        })
        .then((res) => {
          setData(res.data.todos);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  }
  function delTodo(id) {
    return () => {
      delTodoApi(id)
        .then((res) => {
          return getTodoApi()
        })
        .then((res) => {
          setData(res.data.todos);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  function delAllTodo() {
    const idAry = data.filter(item => item.completed_at)
      .map(item => item.id);
    Promise.all(
      idAry.map(item => delTodoApi(item)))
      .then(() => {
        // console.log(res);
        return getTodoApi();
      })
      .then((res) => {
        setData(res.data.todos);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getTodoApi()
      .then((res) => {
        setData(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  useEffect(() => {
    switch (tabState) {
      case '全部':
        getData() //! 渲染 改變todo State
        break;
      case '待完成':
        unCompleted()
        break;
      case '已完成':
        isCompleted()
        break;
      default:
        break;
    }
  }, [tabState, data])

  return (<div className="conatiner todoListPage vhContainer">
    <div className="todoList_Content">
      <TodoInput setData={setData}></TodoInput>
      <div className="todoList_list">
        <ul className="todoList_tab">
          {tabData.map((item, index) => {
            return (
              <TabItem key={index} index={index} changeTab={changeTab} item={item} />
            )
          })}
        </ul>
        <div className="todoList_items">
          <ul className="todoList_item">
            {todo.map((item) => {
              return (
                <TodoItem key={item.id} toggleTodo={toggleTodo} item={item} delTodo={delTodo} />
              )
            })}
          </ul>
          <div className="todoList_statistics">
            <p>
              {data.filter(item => item.completed_at).length} 個已完成項目
            </p>
            <a href="#"
              onClick={delAllTodo}
            >清除已完成項目</a>
          </div>
        </div>
      </div>
    </div>
  </div >);
}

//todo 
// *清除全部已完成
// *換img圖檔案
// *alert樣式
// *api整理
// *劃分Todo資料夾
// Loading元件未上