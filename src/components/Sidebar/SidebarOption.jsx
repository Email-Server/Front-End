import React from "react";
import "./SidebarOption.css";

function SidebarOption({ Icon, title, number, selected, onClick }) {
  return (
    <div
      className={`sidebarOption ${selected && "sidebarOption--active"}`}
      onClick={onClick}
    >
      <Icon />
      <h3>{title}</h3>
      {/* <p>{number}</p>x   */}
    </div>
  );
}

export default SidebarOption;
