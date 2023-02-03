import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { api, logInApi } from '../helpers/apiTest'
import { useAuth } from '../helpers/Context'
import logo from '../assets/images/logo.png';
import login from '../assets/images/login.png';
import alertify from 'alertifyjs';

export function LoginPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const onSubmit = data => {
    const { email, password } = data
    logIn(email, password);
  }

  function logIn(email, password) {
    api.defaults.headers.common['Authorization'] = null;

    logInApi(email, password)
      .then((res) => {
        // console.log(res);
        const { headers: { authorization }, data: { nickname } } = res;
        setToken(authorization); //登入拿token,App刷新,使接下來都可以使用token
        localStorage.setItem('token', authorization); //存local,使下一次不登入也有token
        localStorage.setItem('nickName', nickname)
        alertify.alert('登入成功！', '按下OK為您跳轉。', () => {
          navigate('/', {
            replace: true,
          })
        })
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          alertify.alert('登入失敗', '帳號或密碼輸入錯誤', () => {
            return;
          })
        }
      })
  }

  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <a href="#"><img className="logoImg" src={logo} alt="logoImg" /></a>
          <img className="d-m-n" src={login} alt="workImg" />
        </div>
        <div>
          <form className="formControls"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" type='email' id='email' placeholder="請輸入 email"
              // {...{ required: true, style: { color: 'red' } }} //JSX標籤內屬性如何解構
              {...register('email', {
                required: {
                  value: true,
                  message: "此欄位不可留空"
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "請輸入正確的信箱格式"
                }
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <label className="formControls_label" htmlFor="pwd">密碼</label>
            <input className="formControls_input" id='pwd' type="password" placeholder="請輸入密碼"
              required
              {...register('password')}
            />
            <input className="formControls_btnSubmit" type='submit' value="登入" />
            <NavLink className="formControls_btnLink" to="/signup">註冊帳號</NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

//todo 
// 優化input(...register)變成傳props(required,pattern...)就能夠獨立完成的元件(component)