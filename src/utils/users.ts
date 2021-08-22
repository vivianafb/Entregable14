let users:any = [];

//Join User to CHat

export const addUser = (id:any, username:any, room:any) => {
  const user = {
    id,
    username,
    room,
  };

  users.push(user);
};

export const removeUser = (id:any) => {
  users = users.filter((aUser:any) => aUser.id !== id);
};

export const getCurrentUser = (id:any) => {
  return users.find((aUser:any) => aUser.id === id);
};

export const getRoomUsers = (room:any) => {
  return users.filter((aUser:any) => aUser.room === room);
};
