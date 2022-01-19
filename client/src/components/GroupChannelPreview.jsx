import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";
const GroupChannelPreview = ({
  setisEditing,
  setisCreating,
  settoggleContainer,
  channel,
  type,
  setActiveChannel,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      #{channel?.data?.name || channel?.data?.id}
    </p>
  );
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };
  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper__selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        setisEditing(false);
        setisCreating(false);
        setActiveChannel(channel);
        if (settoggleContainer) {
          settoggleContainer((prev) => !prev);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};
export default GroupChannelPreview;