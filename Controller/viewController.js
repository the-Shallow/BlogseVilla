const Blog = require('./../models/blogModel');

exports.getOverview = async (req, res, next) => {
  const blogs = await Blog.find({});

  res.status(200).render('overview', {
    title: 'Overview',
    blogs,
  });
};

exports.getBlog = async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  res.status(200).render('blog', {
    title: 'Blogs',
    blog,
  });
};

exports.codeForm = (req, res, next) => {
  res.status(200).render('codeForm', {
    title: 'Add your Blog',
  });
};

exports.getsignupForm = (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up',
  });
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.getAllBlogs = async (req, res, next) => {

  const blogs = await Blog.find();

  res.status(200).render('allBlogs', {
    title: 'All Blogs',
    blogs
  });
};
