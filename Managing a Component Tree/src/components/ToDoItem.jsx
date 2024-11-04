import React, { useState } from "react";

function ToDoItem(props) {
  return (
    <li
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      {props.toDoItem}
    </li>
  );
}

export default ToDoItem;
