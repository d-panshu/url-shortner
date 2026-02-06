import express from "express";
import {
  register, login, logout,
  forgotPassword, resetPage, resetPassword
} from "../controllers/auth.controller.js";


const router = express.Router();

router.get("/login", (req, res) => res.render("login", {error:null}));
router.get("/register", (req, res) => res.render("register", {error:null}));
router.get("/forgot", (req, res) =>
  res.render("forgot", { error: null, success: null })
);

router.get("/reset/:token", resetPage);



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);


export default router;