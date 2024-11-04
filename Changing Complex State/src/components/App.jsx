import React, { useState } from 'react';

function App() {
  const [fullName, setFullName] = useState({
    firstName: '',
    lastName: '',
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setFullName((prevValue) => {
      return name === 'firstName'
        ? { firstName: value, lastName: prevValue.lastName }
        : { firstName: prevValue.firstName, lastName: value };
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {fullName.firstName} {fullName.lastName}
      </h1>
      <form>
        <input
          onChange={handleChange}
          name="firstName"
          placeholder="First Name"
          value={fullName.firstName}
        />
        <input
          onChange={handleChange}
          name="lastName"
          placeholder="Last Name"
          value={fullName.lastName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
