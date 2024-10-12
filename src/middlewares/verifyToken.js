import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // El token debería estar en el encabezado de autorización

  if (!token) {
    return res
      .status(403)
      .json({ error: "Token requerido para acceder a esta ruta" });
  }

  try {
    // Verificamos el token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded; // Guardamos la información del usuario en req.user para usar en las rutas
    next(); // Continuamos con la siguiente función o controlador
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
