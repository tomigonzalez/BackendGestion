import express from "express";
import { PORT } from "./config.js";
import projectsRoutes from "./routes/projects.routes.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(projectsRoutes);
app.use(taskRoutes);
app.use(userRoutes);

app.listen(PORT);

console.log("server on port", PORT);
