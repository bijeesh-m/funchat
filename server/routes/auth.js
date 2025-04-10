const router = require("express").Router();
const authController = require("../controllers/auth");

//REGISTER
router.post("/register", authController.Register);

//LOGIN
router.post("/login", authController.Login);

module.exports = router;
