const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const util = require('util');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('No Entry'));
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.correctPassword(user.password, password))) {
      return next(new Error('No Entry'));
    }
    
    createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
  }
};

exports.logout = (req, res, next) => {
  res.cookie('jwt', process.env.JWT_EXPIRES_IN, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'sucess',
  });
};

exports.protect = async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new Error('No Entry'));
  }

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new Error('No Entry'));
  }

  if (user.changedpasswordAfter(user.passwordChangedAt, decoded.iat)) {
    return next(new Error("No Entry"));
  }

  req.user = user;
  res.locals.user = user;

  next();
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next();
  }

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decoded.id);

  if (!user) {
    return next();
  }

  if (user.changedpasswordAfter(user.passwordChangedAt, decoded.iat)) {
    return next();
  }

  req.user = user;
  res.locals.user = user;

  next();
  } catch (err) {
    next();
  }
}

exports.restrictTo = (role) => {
  return (req, res, next) => {
    console.log(req.user.role);
    console.log(role != req.user.role);
    if (role != req.user.role) {
      return next(new Error("No Entry"));
    }
    next();
  };
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  console.log(user);
  if (!(await user.correctPassword(user.password,req.body.passwordCurrent))) {
    return next(new Error('No Entry'));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
};
