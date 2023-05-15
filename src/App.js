import { useState, useEffect } from "react";
import "./App.css";
import { randomColor, randomName } from "./components/Utils";
import Messages from "./components/Messages";
import Input from "./components/Input";

function App() {
  const roomName = "observable-room";
  const channelId = "tP5cIFvcA41bjHEh";

  const [member, setMember] = useState({
    // id: "1",
    username: randomName(),
    color: randomColor(),
  });
  const [messages, setMessages] = useState([]);
  // const [lastMessage, setLastMessage] = useState({ text: "" });
  const [drone, setDrone] = useState();

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

    room.on("message", (message) => {
      setMessages((prevState) => [...prevState, message]);
    });

    setDrone(drone);
  }, [member]);

  const handleSendMessage = (message) => {
    if (message.trim() !== "") {
      drone.publish({
        room: roomName,
        message,
      });
    }
  };

  return (
    <div className='App'>
      <div className='App-header' style={{ minHeight: "200px" }}>
        <h1>My Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
