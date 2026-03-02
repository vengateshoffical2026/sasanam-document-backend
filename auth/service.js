const jwt = require('jsonwebtoken');
const connect = require('../db');
const mongoose = require('mongoose');
const makeUserModel = require('./schema');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '10d';

async function login(username, password) {
  if (!username || !password) throw new Error('username and password required');

  await connect();
  const User = makeUserModel(mongoose);

  const user = await User.findOne({ username }).exec();
  if (!user) return { error: 'invalid credentials', status: 401 };

  const valid = await user.comparePassword(password);
  if (!valid) return { error: 'invalid credentials', status: 401 };

  const payload = { sub: user._id.toString(), username: user.username };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

  return { token, expiresIn: TOKEN_EXPIRES_IN, user: user.toJSON(), status: 200 };
}

module.exports = { login };
