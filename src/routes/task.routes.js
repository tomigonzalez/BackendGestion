import { Router } from "express";

import {
  assignUserToTask,
  getTask,
  getUserTasks,
  patchTask,
  postTask,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/tasks", verifyToken, postTask);

router.patch("/tasks/:id", verifyToken, patchTask);

router.get("/tasks", verifyToken, getTask);

// Nuevos endpoints para asignar usuario a tarea y obtener tareas del usuario
router.put("/tasks/:id/assign-user", verifyToken, assignUserToTask);
router.get("/tasks/user", verifyToken, getUserTasks);

export default router;
