const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  blogImage: { type: String },
  createdAt: { type: String, required: true },
  lastUpdate: { type: String },
  author: { type: mongoose.Types.ObjectId, required: true },
  createdBy: { type: String },
});

module.exports = mongoose.model("Blog", blogSchema);
