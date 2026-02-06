import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { dashboard, createShortUrl, redirectUrl, deleteUrl } from "../controllers/url.controller.js";
import { adminDashboard } from "../controllers/admin.controller.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import URL from "../models/url.model.js";

const router = express.Router();


router.get("/dashboard", protect, dashboard);
router.post("/shorten", protect, createShortUrl);
router.post("/delete/:id", protect, deleteUrl);
router.get("/admin", protect, authorize("admin"), adminDashboard);
router.post(
  "/admin/delete/:id",
  protect,
  adminOnly,
  async (req, res) => {
    await URL.deleteOne({ _id: req.params.id });
    res.redirect("/admin");
  }
);

router.get("/:id", redirectUrl);

export default router;
