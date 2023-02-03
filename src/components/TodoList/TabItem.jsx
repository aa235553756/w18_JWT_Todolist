import React from "react";
export default function TabItem({
  index,
  changeTab,
  item
}) {
  return <li key={index}>
    <a className={item.className} onClick={changeTab(index, item)}>
      {item.content}
    </a>
  </li>;
}
