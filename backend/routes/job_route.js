import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {  applyJob,getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job_controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJob);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/apply/:id")
.post(isAuthenticated, applyJob);
export default router;