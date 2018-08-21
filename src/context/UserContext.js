import React from 'react';

const UserContext = React.createContext({
  user: null,
  updateUser: () => {},
  clearSession: () => {},
  createSession: () => {},
});

export default UserContext;
