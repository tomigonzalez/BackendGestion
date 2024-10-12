const verifyProject = async (req, res, next) => {
  const { id } = req.params; // ID del proyecto a verificar

  try {
    // Comprobar si el usuario es admin
    if (req.user.role === "admin") {
      return next(); // Permitir acceso a los administradores
    }

    // Comprobar si el proyecto pertenece al usuario
    const result = await pool.query(
      `SELECT * FROM projects WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({
        error: "Acceso denegado, no eres el propietario del proyecto",
      });
    }

    next(); // Permitir acceso si el usuario es el propietario del proyecto
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al verificar la propiedad del proyecto" });
  }
};
