const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require("jsonwebtoken");
const verifyUsernameAndEmail = require("../utils/verifyUsernameAndEmail");
const {
  CreateUser,
  getDataFromUsername,
  getDataFromEmail,
  getUserById,
  fetchUsersByQuery,
  followUserById,
  checkUserExist,
} = require("../repository/user.repository");
const SALTROUND = Number(process.env.SALTROUND);
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const shema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    confirm_password: Joi.ref("password"),
  });
  const isValid = shema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      error: isValid.error.details[0],
      data: false,
    });
  }
  const { name, username, email, password } = req.body;
  const usernameAndEmailExist = await verifyUsernameAndEmail(username, email);

  if (usernameAndEmailExist === true) {
    return res.status(400).send({
      status: 400,
      message: "username or email is already register.",
      data: false,
      error: { message: "username or email is already register." },
    });
  } else if (usernameAndEmailExist?.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in fetching username and email",
      error: usernameAndEmailExist.error,
      data: false,
    });
  }

  const hash_password = await bcrypt.hash(password, SALTROUND);
  const createUser = await CreateUser(name, username, email, hash_password);
  if (createUser.error) {
    return res.status(400).send({ status: 400, message: "DB error:Failed to create user", error: createUser.error, data: false });
  }
  return res.status(200).send({
    status: 200,
    message: "User created succesfully.",
    data: { message: "User created succesfully." },
    error: false,
  });
};

const logInUser = async (req, res) => {
  const schema = Joi.object({
    loginId: Joi.string().required(),
    password: Joi.string().required(),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  const { loginId, password } = req.body;
  const isEmail = Joi.object({
    loginId: Joi.string().email(),
  }).validate({ loginId });
  let user;
  if (isEmail.error) {
    user = await getDataFromUsername(loginId);
  } else {
    user = await getDataFromEmail(loginId);
  }

  if (user.error) {
    return res.status(400).send({
      status: 400,
      message: "Database Error",
      error: user.error,
      data: false,
    });
  } else if (user?.data?.length === 0) {
    return res.status(400).send({
      status: 400,
      message: "username or email not exist.",
      error: { message: "username or email not exist." },
      data: false,
    });
  }
  const hash = user.data[0].password;
  const isPasswordCorrect = await bcrypt.compare(password, hash);
  if (!isPasswordCorrect) {
    return res.status(400).send({
      status: 400,
      message: "password is incorrect.",
      data: false,
      error: { message: "password is incorrect." },
    });
  }

  const { name, username, email, _id } = user.data[0];

  const payload = {
    name: name,
    username: username,
    email: email,
    userId: _id,
  };
  const token = jwt.sign(payload, JWT_SECRET);

  return res
    .status(200)
    .send({
      status: 200,
      message: "User logged in succesfully.",
      data: { message: "User logged in succesfully.", token: token, name: name, username: username },
    });
};

const getUser = async (req, res) => {
  const { userId } = req.locals;
  const user = await getUserById(userId);
  if (user.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB.",
      data: false,
      error: user.error,
    });
  }
  res.status(200).send({ status: 200, message: "user data fetched.", data: user.data });
};

const getUsersByQuery = async (req, res) => {
  const search = req.query.search || "";
  const LIMIT = 5;
  const { userId } = req.locals;
  const data = await fetchUsersByQuery(search, LIMIT, userId);
  if (data.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB.",
      data: false,
      error: data.error,
    });
  }
  res.status(200).send({ status: 200, message: "users are fetched.", data: data.data, error: false });
};

const followUser = async (req, res) => {
  const { followUserId } = req.body;
  const { userId } = req.locals;
  const userExist = await checkUserExist(followUserId);
  if (userExist.error) {
    return res.status(400).send({
      status: 400,
      message: "database error",
      data: false,
      error: userExist.error,
    });
  } else if (!userExist.data) {
    return res.status(400).send({
      status: 400,
      message: "User does not exist",
      data: false,
      error: { message: "User does not exist." },
    });
  }
  const response = await followUserById(followUserId, userId);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      data: false,
      error: response.error,
      message: "database error.",
    });
  }
  return res.status(200).send({
    status: 200,
    data: response.data,
    error: false,
    message: "seccessfully followed User.",
  });
};
module.exports = { registerUser, logInUser, getUser, getUsersByQuery, followUser };
