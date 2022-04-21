const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
// const normalize = require('normalize-url');
// @route post api/user
// @desc Test route
//@acess Public

router.post(
  "/signup",
  [
    check("firstname", "firstname is required").not().isEmpty(),
    check("lastname", "lastname is required").not().isEmpty(),
    check("typeuser", "type of user is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { firstname, lastname, typeuser, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Useral ready exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        firstname,
        lastname,
        email,
        avatar,
        typeuser,
        password,
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        id: user.id,
      };

      // create a token using json webtoken
      const token = jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      res.status(200).send({user,token})
    } catch (err) {
      console.error(err.message);
      res.status(400).send({ errors: [{ msg: "Cannot Login",error:err }] });
    }
  }
);

router.post(
  "/signin", 
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Bad Credential" }] });
      }

      // Check password
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
     
      // create a token using json webtoken
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      res.status(200).send({user,token})
    } catch (err) {
      console.error(err.message);
      res.status(400).send({ errors: [{ msg: "Cannot Login",error:err }] });
    }
  } 
);
module.exports = router;
