const User = require("../models/User");

const CheckUsernameAndEmail = async (username, email) => {
  try {
    const userData = await User.find({ $or: [{ username }, { email }] });
    return { data: userData, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
};

const CreateUser = async (name, username, email, hash_password) => {
  try {
    const user = User({
      name: name,
      username: username,
      email: email,
      password: hash_password,
      created_at: new Date(),
      updated_at: new Date(),
      followers: [],
      following: [],
    });
    const userCreate = await user.save();
    return { data: userCreate, error: null };
  } catch (err) {
    console.log(err);
    return { data: null, error: err };
  }
};

const getDataFromEmail = async (email) => {
  try {
    const userData = await User.find({ email });
    return { data: userData, error: null };
  } catch (error) {
    console.log(error, "getDataFromEmail repository error");
    return { data: userData, error: error };
  }
};

const getDataFromUsername = async (username) => {
  try {
    const userData = await User.find({ username });
    return { data: userData, error: null };
  } catch (error) {
    console.log(error, "getDataFromUsername repository error");
    return { data: userData, error: error };
  }
};

const getUserById = async (userId) => {
  try {
    const userData = await User.findById(userId).select("-password");
    return { data: userData, error: null };
  } catch (e) {
    console.log(e.message, "error in getuserById");
    return { data: null, error: e };
  }
};

const fetchUsersByQuery = async (search, LIMIT, userId) => {
  try {
    const data = await User.find({
      _id: { $nin: [userId] },
      $or: [{ username: { $regex: search } }],
    }).limit(LIMIT);
    return { data: data, error: null };
  } catch (error) {
    console.log(error.message, "error in fetchUsersByQuery");
    return { data: null, error: error };
  }
};

const followUserById = async (followUserId, userId) => {
  try {
    // add into followers
    const user = await User.findById(followUserId);
    user.followers.push(userId);
    await user.save();
    // add into following
    const user2 = await User.findById(userId);
    user2.following.push(followUserId);
    await user2.save();
    return { data: true, error: null };
  } catch (error) {
    console.log(error.message, "error in followUserById");
    return { data: null, error: error };
  }
};

const checkUserExist = async (id) => {
  try {
    const userExist = await User.exists({ _id: id });
    return { data: userExist, error: null };
  } catch (error) {
    console.log(error.message, "error in checkUserExist");
    return { data: null, error: error };
  }
};
module.exports = {
  CheckUsernameAndEmail,
  CreateUser,
  getDataFromEmail,
  getDataFromUsername,
  getUserById,
  fetchUsersByQuery,
  checkUserExist,
  followUserById,
};
