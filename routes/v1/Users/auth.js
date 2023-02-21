const router = require("express").Router();
const dotenv = require("dotenv"); //saves secrets like passwords, API keys etc in a virtual env
const { generateTokens } = require("../../../private/helpers/user_token");

const User = require("../../../private/schemas/User");
const Shop = require("../../../private/schemas/Shop");

const bcrypt = require("bcryptjs/dist/bcrypt"); //encrypting the password
var mongoose = require("mongoose");

const jwt = require("jsonwebtoken"); //for jwt webtoken to check if user is logged in

//encrypt password
const { encryptPassword } = require("../../../private/helpers/functions");

//validations are added to this file using the holi/joi library
const {
  loginValidation,
  registerValidation,
  emailValidation,
  passwordValidation,
  refreshTokenBodyValidation,
} = require("./validation/auth_validation");

dotenv.config();

//REGISTRATION
router.post("/register", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var shop_name = req.body.shop_name;

  //simple validation of the email and password
  const { error } = registerValidation(req.body);
  if (error)
    return res.json({ status: 400, message: error.details[0].message });

  //check if user exists
  const emailExists = await User.findOne({ email: email });
  if (emailExists)
    return res.json({ status: 400, message: "User already exists" });

  //create new user
  const user = new User({
    email: email,
    password: encryptPassword(password),
    name: name,
  });
  try {
    const saveUser = await user.save();
    if (saveUser) {
      //create new shop
      const shop = new Shop({
        owner_id: saveUser._id,
        shop_name: shop_name,
      });
      const saveShop = await shop.save();
      return res.json({ status: 200, message: "User created successfully" });
    }
  } catch (err) {
    return res.json({ status: 400, message: err });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  //simple validation of the email and password
  const { error } = loginValidation(req.body);
  if (error)
    return res.json({ status: 400, message: error.details[0].message });

  //check if email exists & comparing passwords
  const user = await User.findOne({ email: email });

  if (!user) return res.json({ status: 400, message: "Invalid email" });

  const validPass = await bcrypt.compareSync(password, user.password);
  if (!validPass) return res.json({ status: 400, message: "Invalid password" });

  //create and assign a token
  // const token = jwt.sign({_id: user._id}, process.env.SECRET)
  const { accessToken, refreshToken } = await generateTokens(user);

  const result = await Shop.find({ owner_id: user._id });


  res.header("auth-token", accessToken).json({
    email,
    // token,
    accessToken,
    refreshToken,
    accessTokenExpiresAt: 840,
    refreshTokenExpireAt: 2592000,
    id: user._id,
    usertype: user.usertype,
    name: user.name,
    shop_name: result[0].shop_name
  });
});

module.exports = router;
