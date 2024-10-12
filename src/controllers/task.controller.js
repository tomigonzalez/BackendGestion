import { pool } from "../db.js";

export const postTask = async (req, res) => {
  const { name, description, status, project_id, assigned_to } = req.body;

  // Verificación de campos obligatorios
  if (!name || !status || !project_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (name, description, status, project_id, assigned_to) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
      [name, description, status, project_id, assigned_to]
    );

    // Enviar la tarea creada
    res.status(201).json({
      message: "Tarea creada exitosamente",
      task: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

export const patchTask = async (req, res) => {
  const { id } = req.params; // ID de la tarea a actualizar
  const { status } = req.body; // Nuevo estado de la tarea

  // Verificación de campos obligatorios
  if (!status) {
    return res.status(400).json({ error: "El estado es obligatorio" });
  }

  try {
    // Actualizar el estado de la tarea
    const result = await pool.query(
      `UPDATE tasks 
         SET status = $1 
         WHERE id = $2 
         RETURNING *`,
      [status, id]
    );

    // Verificar si la tarea fue encontrada y actualizada
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Enviar la tarea actualizada
    res.status(200).json({
      message: "Estado de la tarea actualizado exitosamente",
      task: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

export const getTask = async (req, res) => {
  const { project_id } = req.query;

  // Verificar si el project_id fue proporcionado
  if (!project_id) {
    return res.status(400).json({ error: "El project_id es obligatorio" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE project_id = $1`,
      [project_id]
    );

    // Enviar las tareas correspondientes
    res.status(200).json({
      message: "Tareas obtenidas exitosamente",
      tasks: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const getUserTasks = async (req, res) => {
  const userId = req.userId; // ID del usuario autenticado

  try {
    // Obtiene todas las tareas asignadas al usuario
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE assigned_to = $1",
      [userId]
    );
    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas del usuario" });
  }
};

export const assignUserToTask = async (req, res) => {
  const { id } = req.params; // ID de la tarea
  const { user_id } = req.body; // ID del usuario asignado

  try {
    // Actualiza la tarea con el usuario asignado
    await pool.query("UPDATE tasks SET assigned_to = $1 WHERE id = $2", [
      user_id,
      id,
    ]);
    res.status(200).json({ message: "Usuario asignado a la tarea" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al asignar usuario a la tarea" });
  }
};
