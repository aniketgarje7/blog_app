import { AuthHeader } from "../headers/authHeader";

export const authService = {
  logIn,
  signUp,
  getUser,
  getUsersByQuery
};
const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
async function logIn(data) {
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
  };
  return fetch(`${process.env.REACT_APP_API}user/login`, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.log(e, "error in fetch login");
    });
}

async function signUp(data) {
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
  };
  return fetch(`${process.env.REACT_APP_API}user/register`, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.log(e, "error in fetch register");
    });
}

async function getUser(data) {
  const requestOptions = {
    method: "GET",
    headers: AuthHeader(),
  };
  return fetch(`${process.env.REACT_APP_API}user/get-data`, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.log(e, "error in fetch userData");
    });
}

async function getUsersByQuery(data) {
  const requestOptions = {
    method: "GET",
    headers: AuthHeader(),
  };
  return fetch(`${process.env.REACT_APP_API}user/search-user?search=${data}`, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.log(e, "error in getUsersByQuery ");
    });
};
