import jwtDecode from 'jwt-decode';

export default {
  isLoggedIn: () => {
    return !!localStorage.getItem('user');
  },
  
  storeToken: (token) => {
    localStorage.setItem('token', token);
    const user = jwtDecode(token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  getUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}