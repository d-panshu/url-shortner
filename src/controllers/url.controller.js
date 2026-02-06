import { create } from "node:domain";
import URL from "../models/url.model.js";
import { nanoid } from "nanoid";


export const dashboard = async (req, res) => {
    
    console.log("LOGGED USER:", req.user);
    const urls = await URL.find({ user: req.user.id });
    res.render("dashboard", {
  urls,
  user: req.user,
  request: req
});

};


export const createShortUrl = async (req, res) => {
    await URL.create({
        shortId: nanoid(8),
        originalURL: req.body.url,
        user: req.user.id
    });
    res.redirect("/dashboard");
}


export const redirectUrl = async (req, res) => {
    const url = await URL.findOne({ shortId: req.params.id });
    if (!url) {
        return res.status(404).json({ message: "URL not found" });
    }
    console.log(url);
    if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

    url.clicks++;
    await url.save();
    res.redirect(url.originalURL);

    
};


export const deleteUrl = async (req, res) => {
  console.log("DELETE HIT:", req.params.id);

  await URL.deleteOne({
    _id: req.params.id
  });

  res.redirect("/dashboard");
};
