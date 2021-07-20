const User = require('./../models/userModel');

exports.getAllUser = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: users,
  });
};

exports.createUser = async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

exports.deleteUser = async (req, res, next) => {
  await User.deleteOne(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
