import moment from 'moment';

const keys = { token: 'token', tokenExp: 'tokenExp', user: 'user'};

export default {
  isSessionValidForMinutes: isTokenActive,
  
  storeToken: (token) => {
    const {exp, user} = parseToken(token);
    localStorage.setItem(keys.token, token);
    localStorage.setItem(keys.user, JSON.stringify(user));
    localStorage.setItem(keys.tokenExp, exp);
  },
  clearSession,
  currentToken,
  currentUser,
}

function parseToken(token) {
  const {exp, iat, ...user} = JSON.parse(atob(token.split('.')[1]));
  return {exp, iat, user};
}

function getTokenExpiration() {
  const unixTime = localStorage.getItem(keys.tokenExp);
  if (unixTime) {
    const exp = moment.unix(+unixTime);
    if (!exp.isValid()) {
      console.error('invalid tokenExp in local storage');
      clearSession();
      return null;
    }
    return exp;
  }
  return null;
}

function currentToken() {
  return localStorage.getItem(keys.token);
}

function currentUser() {
  const userJson = localStorage.getItem(keys.user);
  try {
    return userJson ? JSON.parse(userJson) : null;
  } catch (err) {
    console.err(err);
    clearSession();
  }
}

function isTokenActive(minutes=1) {
  const exp = getTokenExpiration();
  if (!exp) return false;
  
  return exp.isAfter(moment().add(minutes, 'minutes'));
}

function clearSession() {
  localStorage.removeItem(keys.user);
  localStorage.removeItem(keys.token);
  localStorage.removeItem(keys.tokenExp);
}

