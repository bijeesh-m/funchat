const userController = require("../controllers/user");
const router = require("express").Router();

//get a user
router.get("/", userController.getUser);

module.exports = router;
