import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { dashboard, createShortUrl, redirectUrl, deleteUrl } from "../controllers/url.controller.js";
import { adminDashboard } from "../controllers/admin.controller.js";

const router = express.Router();


router.get("/dashboard", protect, dashboard);
router.post("/shorten", protect, createShortUrl);
router.post("/delete/:id", protect, deleteUrl);
router.get("/admin", protect, authorize("admin"), adminDashboard);

router.get("/:id", redirectUrl);

export default router;
