import LogOut from '../components/LogOut';
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import { logOutApi } from "../helpers/apiTest";
import { useAuth } from "../helpers/Context";


export function Navbar() {
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const nickname = localStorage.getItem('nickName')

  function logOut() {
    logOutApi()
      .then(() => {
        // console.log(res);
        setTimeout(() => {
          setToken(null); //將App刷新,token設為無(同時local也設無),使下一位無法繼續使用同組token
          localStorage.setItem('token', null); //local記得一起設定為無,下一次重整才不會有token
          alertify.closeAll()
        }, 1000)
        alertify.alert('登出成功', '自動為您跳轉畫面。', () => {
          navigate('/login', { replace: true })
        })
      })
      .catch(err => console.log(err))
  }

  return (<nav style={{ display: 'flex' }}>
    <h1><a>ONLINE TODO LIST</a></h1>
    <ul>
      <li className="todo_sm"><a style={{ cursor: 'pointer' }}><span>{nickname}的代辦</span></a></li>
      <LogOut logOut={logOut} />
    </ul>
  </nav>);
}
