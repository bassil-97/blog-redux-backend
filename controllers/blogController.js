const fs = require("fs");

const HttpError = require("../models/http-error");
const Blog = require("../models/blog");
const User = require("../models/user");
const moment = require("moment");

// Fetch All Blogs

const fetchBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching blogs failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json(blogs.map((blog) => blog.toObject({ getters: true })));
};

// Add New Blog

const addNewBlog = async (req, res, next) => {
  const { title, content, author } = req.body;

  let user;
  try {
    user = await User.findById(author);
  } catch (err) {
    const error = new HttpError(
      "Creating blog failed, couldn't find a user for the provided ID.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  const createdBlog = new Blog({
    title,
    content,
    blogImage: req.file.path,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    author,
    createdBy: user.username,
  });

  try {
    await createdBlog.save();
  } catch (err) {
    const error = new HttpError("Creating blog failed, please try again.", 500);
    return next(error);
  }

  res.json({ newBlog: createdBlog, blogAdded: true });
};

const deleteBlog = async (req, res, next) => {
  const blogId = req.params.blogId;
  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!blog) {
    const error = new HttpError(
      "Something went wrong, couldn't find blog with the provided ID.",
      500
    );
    return next(error);
  }

  const blogImagePath = blog.blogImage;

  try {
    await blog.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete blog.",
      500
    );
    return next(error);
  }

  fs.unlink(blogImagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "blog Removed", blogId: blogId });
};

exports.fetchBlogs = fetchBlogs;
exports.addNewBlog = addNewBlog;
exports.deleteBlog = deleteBlog;
