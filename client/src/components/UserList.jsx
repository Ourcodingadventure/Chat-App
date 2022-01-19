import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets";
const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};
const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setselected] = useState(false);
  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prev) =>
        prev.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prev) => [...prev, user.id]);
    }
    setselected((prev) => !prev);
  };
  return (
    <div className="user-item__wrapper" onClick={handleSelect}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>

      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [listEmpty, setlistEmpty] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setloading(true);
      try {
        const response = await client.queryUsers(
          {
            id: { $ne: client.userID },
          },
          { id: 1 },
          { limit: 10 }
        );
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setlistEmpty(true);
        }
      } catch (error) {
        seterror(true);
      }
      setloading(false);
    };
    if (client) getUsers();
  }, []);
  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error Loading, please Refresh and try again
        </div>
      </ListContainer>
    );
  }
  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No Users Found</div>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users...</div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
