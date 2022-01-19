import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, GroupChannelList, GroupChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import ITCIcon from "../assets/itc.png";
import LogoutIcon from "../assets/logout.png";
const cookies = new Cookies();
const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={ITCIcon} alt="hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Chat APP</p>
  </div>
);
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};
const ChannelListContent = ({
  setCreateType,
  isCreating,
  setisCreating,
  setisEditing,
  settoggleContainer,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove(`userId`);
    cookies.remove(`userName`);
    cookies.remove(`fullName`);
    cookies.remove(`avatarURL`);
    cookies.remove(`hashedPassword`);
    cookies.remove(`phoneNumber`);
    cookies.remove(`token`);
    window.location.reload();
  };
  const filters = { members: { $in: [client.userID] } };
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={settoggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <GroupChannelList
              {...listProps}
              type="team"
              settoggleContainer={settoggleContainer}
              setCreateType={setCreateType}
              isCreating={isCreating}
              setisCreating={setisCreating}
              setisEditing={setisEditing}
            />
          )}
          Preview={(previewProps) => (
            <GroupChannelPreview
              {...previewProps}
              type="team"
              setisCreating={setisCreating}
              setisEditing={setisEditing}
              settoggleContainer={settoggleContainer}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <GroupChannelList
              {...listProps}
              type="messaging"
              settoggleContainer={settoggleContainer}
              setCreateType={setCreateType}
              isCreating={isCreating}
              setisCreating={setisCreating}
              setisEditing={setisEditing}
            />
          )}
          Preview={(previewProps) => (
            <GroupChannelPreview
              {...previewProps}
              type="messaging"
              setisCreating={setisCreating}
              setisEditing={setisEditing}
              settoggleContainer={settoggleContainer}
            />
          )}
        />
      </div>
    </>
  );
};
const ChannelListContainer = ({
  setCreateType,
  setisCreating,
  setisEditing,
}) => {
  const [toggleContainer, settoggleContainer] = useState(false);
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setCreateType={setCreateType}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => settoggleContainer((prev) => !prev)}
        ></div>
        <ChannelListContent
          setCreateType={setCreateType}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
          settoggleContainer={settoggleContainer}
        />
      </div>
    </>
  );
};
export default ChannelListContainer;
