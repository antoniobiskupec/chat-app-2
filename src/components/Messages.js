import React from "react";
import { useRef, useEffect } from "react";

function Messages({ messages, currentMember }) {
  const bottomRef = useRef(null);

  //Called useEffect so when messages update, scroll behavior can trigger
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //Main function and logic for displaying messages while mapping through messages array
  function renderMessage(message) {
    const { data, member } = message;
    const myMessages = member.id === currentMember.id;
    const className = myMessages
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className} key={Math.random()}>
        <span
          className='avatar'
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className='Message-content'>
          <div className='username'>{member.clientData.username}</div>
          <div className='text' ref={bottomRef}>
            {data}
          </div>
        </div>
      </li>
    );
  }

  return (
    <ul className='Messages-list'>{messages.map((m) => renderMessage(m))}</ul>
  );
}

export default Messages;
