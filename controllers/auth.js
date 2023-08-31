 const User=require('../models/userModel')
 const bcrypt = require("bcrypt");
 const createJwtToken =require('../utils/createJwtToken')
 module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password,birthday} = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);//salt value 10 type of encryption
      const user = await User.create({
        email,
        username,
        dob:birthday,
        password: hashedPassword,
      });
      delete user.password;
      // user.password=undefined

     
      return res.json({ status: true, user});
    } catch (ex) {
      next(ex);
    }
};
module.exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
        const tokenPayload = {
          userId: user._id,
          email: user.email,
          username:user.password,
          password: user.password,
        };
        const token= await createJwtToken(tokenPayload)
        delete user.password;

        //cookie
        // const option={
        //    expires :new Date(Date.now() + 3 *24 *60*60 *1000),
        //    httpOnly:true
        // }
      // return res.status(200).cookie("token",token,option).json({succes:true,user:user,jwtToken:token});

      return res.status(200).json({succes:true,user:user,jwtToken:token});
    } catch (ex) {
      next(ex);
    }
  };