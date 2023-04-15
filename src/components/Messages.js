import React, { useEffect } from "react";

function Messages({ messages, currentMember }) {
  useEffect(() => {}, []);

  // function that renders one message
  function renderMessage(message) {
    // extracting message and member
    const { member, text } = message;

    // check if i sent the message
    const myMessage = member.id === currentMember.id;

    // setting the class depenging on who sent the message
    const className = myMessage
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li className={className} key={Math.random}>
        <span className='avatar' />
        <div className='Message-content'>
          <div className='username'>{member.clientData.username}</div>
          <div className='text'>{text}</div>
        </div>
      </li>
    );
  }

  // list render of messages
  return (
    <ul className='Messages-list'>{messages.map((m) => renderMessage(m))}</ul>
  );
}

export default Messages;
