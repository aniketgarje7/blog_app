import { AuthHeader } from "../headers/authHeader";

export const userService = {
  followUser,
  unFollowUser,
};


async function followUser(data) {
  const requestOptions = {
    method: "PUT",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${process.env.REACT_APP_API}user/follow-user`, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.log(e, "error in follow user");
    });
};

async function unFollowUser(data) {
    const requestOptions = {
      method: "PUT",
      headers: AuthHeader(),
      body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}user/unfollow-user`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        return response;
      })
      .catch((e) => {
        console.log(e, "error in unfollow user");
      });
  }