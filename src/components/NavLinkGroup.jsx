import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function NavLinkGroup({ }) {
  return <>
    <Outlet />
    <div className='NavLink'>
      <NavLink to='/'>TodoList</NavLink>
      <br />
      <NavLink to='/login'>Login</NavLink>
      <br />
      <NavLink to='/SignUp'>SignUp</NavLink>
    </div>
  </>;
}
