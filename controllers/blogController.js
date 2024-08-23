const slugify = require("slugify");
const Blogs = require("../models/blogs.js");
const { v4: uuidv4 } = require("uuid");
const e = require("express");

exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) slug = uuidv4();
  switch (true) {
    case !title:
      return res.status(400).json({ error: "Title is required" });
      break;
    case !content:
      return res.status(400).json({ error: "Content is required" });
      break;
  }
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ error: "Duplicate post. Try another title" });
    }
    res.json(blog);
  });
};

exports.getAllBlogs = (req, res) => {
  Blogs.find({}).exec((err, blogs) => {
    res.json(blogs);
  });
};

exports.getBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).exec((err, blog) => {
    res.json(blog);
  });
};

exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.json({ message: "Blog deleted" });
  });
};

exports.update = (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  ).exec((err, blog) => {
    if (err) console.log(err);
    res.json(blog);
  });
};
