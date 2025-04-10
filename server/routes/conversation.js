const router = require("express").Router();
const conversationController = require("../controllers/conversation");

//new conv

router.post("/", conversationController.newConversation);

//get conv of a user

router.get("/:userId", conversationController.getConversation);

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", conversationController.getConversationIncludesTwoUser);

module.exports = router;
