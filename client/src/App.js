import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import "stream-chat-react/dist/css/index.css";
import "./App.css";
import { useState } from "react";
const cookies = new Cookies();
const API_KEY = "98tg7pf9au4g";
const authToken = cookies.get("token");
const client = StreamChat.getInstance(API_KEY);
if (authToken) {
  client.connectUser(
    {
      id: cookies.get(`userId`),
      name: cookies.get(`userName`),
      fullName: cookies.get(`fullName`),
      image: cookies.get(`avatarURL`),
      hashedPassword: cookies.get(`hashedPassword`),
      phoneNumber: cookies.get(`phoneNumber`),
    },
    authToken
  );
}

function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setisCreating] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          setCreateType={setCreateType}
          isCreating={isCreating}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
        />
        <ChannelContainer
          isEditing={isEditing}
          isCreating={isCreating}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
