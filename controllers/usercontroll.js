const User = require("../model/userModel");
const bcryot = require("bcrypt");

module.exports.register = async (req,res,next) =>{
    try{
        const{username,email,password}=req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck)
        return res.json({msg:"Username already exist, Try another one", status: false});
    const emailCheck = await User.findOne({email});
    if(emailCheck)
        return res.json({msg:"Email is already exist, Try another one", status: false});
    const hashedPassword = await bcryot.hash(password,10);
    const user =await User.create({
        email,
        username,
        password: hashedPassword,
    });
    delete user.password;
    return res.json({status: true, user});
    } catch(ex){
        next(ex)
    }
};


module.exports.login= async (req,res,next) =>{
    try{
        const{username,password}=req.body;
    const userC = await User.findOne({username});
    if(!userC)
        return res.json({msg:"User details not found",status: false});
    const isPasswMatch= await bcryot.compare(password,userC.password);
    if(!isPasswMatch)
        return res.json({msg:"Incorrect username or password",status: false});
    delete userC.password;
    return res.json({status: true, userC});
    } catch(ex){
        next(ex)
    }
};

module.exports.setAvatar= async (req, res , next) =>{
    try{

        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAppearance : true,
            appearance : avatarImage,
        },{new: true});
        return res.json({isSet:userData.isAppearance,image:userData.appearance})

    }catch(ex){
        next(ex)
    }

};

module.exports.getAllUsers= async (req, res, next) => {
    try {
        // console.log("---------");
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "appearance",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };

