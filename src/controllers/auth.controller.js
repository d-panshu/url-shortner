import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const register = async (req, res) => {
    const exist = await User.findOne({email: req.body.email});
    if(exist){
        return res.render("register", {error: "User already exists"});
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    await User.create({
        email: req.body.email,
        password: hashed
    });
    
    res.redirect("/auth/login");
};


export const login = async (req, res) => {
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.render("login", {error: "Invalid credentials"});
    }

    const ok = await bcrypt.compare(req.body.password, user.password);
    if(!ok){
        return res.render("login", {error: "Invalid credentials"});
    }

    const accessToken = jwt.sign(
        {id :user._id, role: user.role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign(
        {
            id :user._id
        },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '7d'}
    );
    user.refreshToken = refreshToken;
    await user.save();
    
    res.cookie("token", accessToken, {httpOnly: true});
    res.cookie("refreshToken", refreshToken, {httpOnly: true});
    res.redirect("/dashboard");
}


export const logout = async(req, res)=>{
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.redirect("/auth/login");
};


export const forgotPassword = async (req, res) => {
  console.log("FORGOT PASSWORD HIT", req.body);

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.render("forgot", {
      error: "User not found",
      success: null
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  console.log(
    "Password reset link:",
    `http://localhost:3000/auth/reset/${token}`
  );

  res.render("forgot", {
    error: null,
    success: "Check terminal for reset link"
  });
};



export const resetPage = async(req, res)=>{
    const user = await User.findOne({resetToken: req.params.token, resetTokenExpiry: {$gt: Date.now()}});
    if(!user){
        return res.send("Invalid or expired token");
    }
    console.log("RESET TOKEN:", req.params.token);

    res.render("reset");

}


export const resetPassword = async(req, res)=>{
    const user=await User.findOne({resetToken: req.params.token, resetTokenExpiry: {$gt: Date.now()}});
    if(!user){
        return res.send("Invalid or expired token");
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.redirect("/auth/login");
}



