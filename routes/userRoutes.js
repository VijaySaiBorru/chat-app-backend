const { register, login , setAvatar, getAllUsers} = require("../controllers/usercontroll");

const router=require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/avatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);


module.exports = router;
