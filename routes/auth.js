const express = require("express");
const router = express.Router();

const usercontrollers = require("../controllers/userController");
const fileUpload = require("../middleware/file-upload");

router.post(
  "/userRegister",
  fileUpload.single("image"),
  usercontrollers.signup
);

router.post("/userLogin", usercontrollers.login);

module.exports = router;
