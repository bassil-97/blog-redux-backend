const express = require("express");
const router = express.Router();

const { checkAuth } = require("../util/auth");
const fileUpload = require("../middleware/file-upload");
const blogControllers = require("../controllers/blogController");

router.get("/get-all-blogs", blogControllers.fetchBlogs);

router.use(checkAuth);

router.post(
  "/add-new-blog",
  fileUpload.single("image"),
  blogControllers.addNewBlog
);

router.delete("/delete-blog/:blogId", blogControllers.deleteBlog);

module.exports = router;
