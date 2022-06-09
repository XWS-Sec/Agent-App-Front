import React from 'react';
import { Role } from '../model/enums/role.enum';

export interface User {
  //accessToken: string;
  loggedIn: boolean;
  id: string;
  userName: string;
  role: Role;
  companyId: string;
}

export const unsignedUser: User = {
  //accessToken: '',
  loggedIn: false,
  id: '',
  userName: '',
  role: Role.UNDEFINED,
  companyId: '',
};

const AuthContext = React.createContext({
  user: unsignedUser,
  updateAuthContext: (user: User) => {},
});

export default AuthContext;