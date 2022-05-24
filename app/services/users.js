const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const u__db = require('app/helpers/connection/users');
const Users = u__db.User;

module.exports = {
  register,
  authenticate,
  getById,
  upUser,
  upPassWord
}

async function register(user__param) {
  // validate username
  if (await Users.findOne({ "username": user__param.username })) {
    throw 'Usuário "' + user__param.username + '" já existe!';
  } else {
    try {
      const user = new Users(user__param);
      // hash password
      if (user__param.password) {
        user.password = bcrypt.hashSync(user__param.password, 10);
      }
      // save user on datatable
      await user.save().then((r) => {
        return user
      })
      return user
    } catch (e) {
      throw e.message;
    }
  }
}

async function authenticate(user__param) {
  const username = await Users.findOne({ "username": user__param.username })
  const email = await Users.findOne({ "email": user__param.email })
  // filter to username
  if (username && bcrypt.compareSync(user__param.password, username.password)) {
    const { password, ...userWithoutHash } = username.toObject();
    const token = jwt.sign({ sub: username.id }, process.env.JWT_SECRET);
    return {
      ...userWithoutHash,
      token
    }
  }
  // filter to email
  else if (email && bcrypt.compareSync(user__param.password, email.password)) {
    const { password, ...userWithoutHash } = email.toObject();
    const token = jwt.sign({ sub: email.id }, process.env.JWT_SECRET);
    return {
      ...userWithoutHash,
      token
    }
  }
}

async function getById(user__id) {
  return await Users.findById(user__id).select('-hash');
}

async function upPassWord(user_params) {
  try {
    if (user_params.password) await Users.updateOne({ $or: [{ email: user_params.email }, { username: user_params.username }]}, { $set: {"password": bcrypt.hashSync(user_params.password, 10)}} )
    else throw 'Usuário não encontrado!'
  } catch (e) {
    throw e.message
  }
}

async function upUser(user__id, user__param) {
  const user = await Users.findById(user__id).select('-hash')
  try {
    if (!user) {
      throw 'Usuário não encontrado!'
    } else {
      if (user__param.password != null) {
        user__param.password = bcrypt.hashSync(user__param.password, 10);
      }
      Object.assign(user, user__param);
      await user.save();
    }
  } catch (e) {
    throw e.message
  }
}