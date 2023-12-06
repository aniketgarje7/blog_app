import { AuthHeader } from "../headers/authHeader";

export const userService = {
  followUser,
  unFollowUser,
  getBlogsByUsername,
  getUserByUsername,
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

  async function getBlogsByUsername(data) {
    const requestOptions = {
      method: "GET",
      headers: AuthHeader(),
    };
    const {page,username} = data;
    return fetch(`${process.env.REACT_APP_API}user/get-blogs/${username}?${page}`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        return response;
      })
      .catch((e) => {
        console.log(e, "error in getblogsbyuser service");
      });
  };

  async function getUserByUsername(data) {
    const requestOptions = {
      method: "GET",
      headers: AuthHeader(),
    };
    const {username} = data;
    return fetch(`${process.env.REACT_APP_API}user/get-user/${username}`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        return response;
      })
      .catch((e) => {
        console.log(e, "error in getUserByUsername service");
      });
  };