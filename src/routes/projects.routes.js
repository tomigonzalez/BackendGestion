import { Router } from "express";
import { pool } from "../db.js";
import {
  assignUserToProject,
  deleteProyect,
  getProyect,
  getProyects,
  postProyect,
  putProyect,
} from "../controllers/projects.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router();

router.get("/projects", verifyToken, getProyects);

router.get("/projects/:id", verifyToken, getProyect);

router.post("/projects", verifyToken, postProyect);

router.put("/projects/:id", verifyToken, putProyect);

router.delete("/projects/:id", verifyToken, deleteProyect);

router.post("/projects/:id/assign-user", verifyToken, assignUserToProject);
export default router;
