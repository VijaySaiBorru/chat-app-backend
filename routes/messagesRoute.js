const { addMessage, getAllMessage } = require("../controllers/messagesController");

const router=require("express").Router();

router.post("/addmsgs",addMessage);
router.post("/getmsg",getAllMessage);



module.exports = router;
