const verifyTask = async (req, res, next) => {
  const { id } = req.params; // ID de la tarea a verificar

  try {
    // Comprobar si el usuario es admin
    if (req.user.role === "admin") {
      return next(); // Permitir acceso a los administradores
    }

    // Comprobar si la tarea pertenece al usuario
    const result = await pool.query(
      `SELECT * FROM tasks WHERE id = $1 AND assigned_to = $2`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Acceso denegado, no eres el propietario de la tarea" });
    }

    next(); // Permitir acceso si el usuario es el propietario de la tarea
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al verificar la propiedad de la tarea" });
  }
};
