const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class AuthController {
  // [POST] /auth/login
  async login(req, res, next) {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json("Missing required fields");
        }

        const user = await User.findOne({
            username: username,
            email: email
        });
        if(!user) {
            return res.status(401).json("Invalid username or email");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json("Invalid password");
        }
        return res.status(200).json("Login successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).json("Error Server");
    }
  }
  // [POST] /auth/register
  async register(req, res, next) {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return res.status(400).json("Missing required fields");
      }

      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return res.status(409).json("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
      });

      await newUser.save();

      return res.status(201).json("User created successfully");
    } catch (err) {
      console.error(err);
      return res.status(500).json("Failed to create user");
    }
  }

  // [PUT]/auth/:id/forgotpassword
  async forgotPassword(req, res, next){
    try {
        const { email } = req.body;
        if(!email){
            return res.status(400).json("Email is required")
        }

        const user = User.findOne({
            email: email
        });

        if(!user){
            return res.status(404).json("User not found");
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpires = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetPasswordExpires;

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'   
            }
        });

        const mailOptions = {
            to: user.email,
            from: 'passwordreset@yourdomain.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
            http://${req.headers.host}/reset/${resetToken}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json("Password reset email sent");

    } catch (err) {
        console.log(err);
        return res.status(500).json("Error Server");
    }
  }

  //ResetPassword
  async resetPassword(req, res, next){
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if(!user){
            return res.status(400).json("Password reset token is invalid or has exprired");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json("Password reset successfully");
        
    } catch (err) {
        console.log(err);
        res.status(500).json("Error Reseting Password");
    }
  }
  // [GET] /auth/logout
  logout(req, res, next) {
    req.logout();
    res.redirect("/auth/login");
  }
}

module.exports = new AuthController();
