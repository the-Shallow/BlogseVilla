const Blog = require('./../models/blogModel');

exports.createBlog = async (req, res, next) => {
  const blog = await Blog.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

exports.getAllBlog = async (req, res, next) => {
  const blogs = await Blog.find({});

  res.status(200).json({
    status: 'success',
    data: {
      blogs,
    },
  });
};

exports.getBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

exports.updateBlog = async (req, res, next) => {
  const blog = await Blog.findOneAndUpdate(req.params.id, req, body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

exports.deleteBlog = async (req, res, next) => {
  await Blog.deleteOne(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
