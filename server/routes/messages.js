const router = require("express").Router();
const messageController = require("../controllers/messages");

router.post("/", messageController.sendMessage);
router.get("/:conversationId", messageController.getMessage);

module.exports = router;
