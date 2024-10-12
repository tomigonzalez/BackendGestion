import { pool } from "../db.js";

export const getProyects = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM projects");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
};

export const getProyect = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM projects WHERE id = $1", [
    id,
  ]);
  if (rows.length == 0) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(rows[0]);
};

export const postProyect = async (req, res) => {
  const { name, description, start_date, end_date, user_id } = req.body;

  // Verificar
  if (!name || !start_date || !user_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // insertar nuevo proyect
    const result = await pool.query(
      `INSERT INTO projects (name, description, start_date, end_date, user_id) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [name, description, start_date, end_date, user_id]
    );

    // Enviamos  respuesta con proyecto
    return res.status(201).json({
      message: "Proyecto creado exitosamente",
      project: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
};

export const putProyect = async (req, res) => {
  const { id } = req.params;
  const { name, description, start_date, end_date, user_id } = req.body;

  // Verificar que uno de los campos para actualizar esté presente
  if (!name && !description && !start_date && !end_date && !user_id) {
    return res.status(400).json({ error: "No hay campos para actualizar" });
  }

  try {
    const result = await pool.query(
      `UPDATE projects 
         SET name = COALESCE($1, name),
             description = COALESCE($2, description),
             start_date = COALESCE($3, start_date),
             end_date = COALESCE($4, end_date),
             user_id = COALESCE($5, user_id)
         WHERE id = $6
         RETURNING *`,
      [name, description, start_date, end_date, user_id, id]
    );

    // Verificar proyecto encontrado y actualizado
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    // Enviar el proyecto actualizado
    res.status(200).json({
      message: "Proyecto actualizado exitosamente",
      project: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
};

export const deleteProyect = async (req, res) => {
  try {
    const { rowCount, rows } = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el proyecto" });
  }
};

export const assignUserToProject = async (req, res) => {
  const { id } = req.params; // ID del proyecto
  const { user_id } = req.body; // ID del usuario que se va a asignar

  try {
    // Usando una tabla de unión
    await pool.query(
      "INSERT INTO project_users (project_id, user_id) VALUES ($1, $2)",
      [id, user_id]
    );
    res.status(200).json({ message: "Usuario asignado al proyecto" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al asignar usuario al proyecto" });
  }
};
