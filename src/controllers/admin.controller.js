import User from "../models/user.model.js";
import URL from "../models/url.model.js";



export const adminDashboard = async (req, res) => {
    const users = await User.find();
    const urls = await URL.find();
    res.render("admin", { admin: req.user, users, urls });
};