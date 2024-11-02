import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "white",
  });

  function handleClick() {
    setHeadingText("Submitted");
  }

  function handleMouseOut() {
    setButtonStyle({ backgroundColor: "white" });
  }

  function handleMouseOver() {
    setButtonStyle({ backgroundColor: "black" });
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={buttonStyle}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
