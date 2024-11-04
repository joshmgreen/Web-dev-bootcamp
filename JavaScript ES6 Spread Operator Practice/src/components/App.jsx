import React, { useState } from "react";

function App() {
  const [listItems, setListItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleClick() {
    setListItems((prevItems) => [...prevItems, inputValue]);
    setInputValue("");
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" value={inputValue} onChange={handleChange} />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {listItems.map((listItem) => (
            <li key={listItem}>{listItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
