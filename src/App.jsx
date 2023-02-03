import NavLinkGroup from './components/NavLinkGroup';
import { useState } from 'react'
import { Route, Routes, BrowserRouter, NavLink, Outlet } from 'react-router-dom'
import { LoginPage, SignUpPage, TodoPage } from './pages';
import { ProtectRoute } from '/src/components/ProtectRoute';
import { api } from './helpers/apiTest';
import { AuthContext } from './helpers/Context';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'semantic-ui-css/semantic.min.css'

alertify.defaults.transition = "zoom";
alertify.defaults.theme.ok = "ui positive button";
alertify.defaults.theme.cancel = "ui black button";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // 初始值,目的是local已經有token的用戶可以進到todo
  api.defaults.headers.common['Authorization'] = token; //每當登入setToken後,App刷新,使接下來api都附帶token

  return (
    <BrowserRouter basename='/w18_JWTtodolist_Router_Reducer/'>
      <AuthContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route element={<NavLinkGroup />}>
            <Route element={<ProtectRoute />}>
              <Route path='/' element={<TodoPage />}></Route>
            </Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signUp' element={<SignUpPage />}></Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App

//todo
// *建立簡易Route
// *建立Auth,useAuth(Context)使用檔案

//todo2
// *登入驗證保護機制 + Navigate
// *測試api.js
// *拿授權測試headers.common
// *axios設定 自帶token,url檔案模組,
// *登入註冊 HTML 頁面
// *setToken

//todo3
// *api先全部寫完
// *RHF hookForm
// (重複打api設定)
