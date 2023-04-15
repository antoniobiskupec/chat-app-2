import React, { useState } from "react";

function Input(props) {
  //useState variable and function setText
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setText("");
    props.onSendMessage(text);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className='Input'>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={text}
          type='text'
          placeholder='Press Enter to send'
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Input;
