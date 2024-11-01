import React, { useState } from "react";

function App() {
  const [count, setCount] = React.useState(0);

  const increase = () => setCount(count + 1);

  const decrease = () => setCount(count - 1);

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
