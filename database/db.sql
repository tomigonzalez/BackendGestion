CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- Aquí solo almacenamos el rol sin restricciones
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL, -- Usuario responsable
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL, -- Estado de la tarea
    project_id INT REFERENCES projects(id) ON DELETE CASCADE, -- Proyecto relacionado
    assigned_to INT REFERENCES users(id) ON DELETE SET NULL, -- Usuario asignado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
