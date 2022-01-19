import React from "react";
import { AddChannel } from "../assets";

const GroupChannelList = ({
  children,
  error = false,
  loading,
  type,
  setCreateType,
  isCreating,
  setisCreating,
  setisEditing,
  settoggleContainer,
}) => {
  if (error) {
    //change to group later?
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          connection error please wait a moment and try again
        </p>
      </div>
    ) : null;
  }
  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === "team" ? "Channels" : "Messages"}loading...
        </p>
      </div>
    );
  }
  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          setCreateType={setCreateType}
          isCreating={isCreating}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
          settoggleContainer={settoggleContainer}
          type={type === "team" ? "team" : "messaging"}
        />
      </div>
      {children}
    </div>
  );
};

export default GroupChannelList;
