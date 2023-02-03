import React from "react";
export default function LogOut({
  logOut
}) {
  return <li><a onClick={logOut} style={{
    cursor: 'pointer'
  }}>登出</a></li>;
}
