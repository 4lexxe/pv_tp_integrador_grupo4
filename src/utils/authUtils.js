// src/utils/authUtils.js

const USERS_KEY = "users";
const SESSION_USER_KEY = "sessionUser";

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (newUser) => {
  const users = getUsers();
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getSessionUser = () => {
  const sessionUser = localStorage.getItem(SESSION_USER_KEY);
  return sessionUser ? JSON.parse(sessionUser) : null;
};

export const setSessionUser = (user) => {
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
};

export const removeSessionUser = () => {
  localStorage.removeItem(SESSION_USER_KEY);
};