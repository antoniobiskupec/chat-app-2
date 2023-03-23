import { useState, useEffect } from "react";
import "./App.css";
import { randomColor, randomName } from "./components/Utils";
import Messages from "./components/Messages";
import Input from "./components/Input";

function App() {
  const roomName = "observable-room";
  const channelId = "tP5cIFvcA41bjHEh";

  const [member, setMember] = useState({
    id: null,
    name: randomName(),
    color: randomColor(),
  });
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState({ text: "" });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    console.log("Who am I?", member);

    const drone = new window.Scaledrone(channelId, {
      data: member,
    });

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      console.log("What's my id?", drone.clientId);

      member.id = drone.clientId;

      setMember(member);
    });

    const room = drone.subscribe(roomName);

    room.on("data", (data, sender) => {
      data.sender = sender.clientData;

      setMessages((messages) => [...messages, data]);
    });

    setDrone(drone);
  }, [member]);

  const handleSendMessage = (message) => {
    drone.publish({
      room: roomName,
      message,
    });
  };

  const handleChange = (e) => {
    setLastMessage({ text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLastMessage({ text: "" });
    handleSendMessage(lastMessage);
  };

  return (
    <div className='App'>
      <div className='App-header' style={{ minHeight: "200px" }}>
        <h1>My Chat App</h1>
      </div>

      <ul className='Messages-list'>
        {messages.map((message, index) => {
          return (
            <li
              key={index}
              className={
                member.id === message.sender.id ? "sender" : "receiver"
              }
            >
              <span
                className='avatar'
                style={{ backgroundColor: message.sender.color }}
              />
              <div className='Message-content'>
                <div className='username'>{message.sender.name}</div>
                <div className='text'>{message.text}</div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className='Input'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => handleChange(e)}
            value={lastMessage.text}
            type='text'
            placeholder='Press ENTER to send'
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
