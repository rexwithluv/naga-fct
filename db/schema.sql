-- Tablas sin FK (CREATE TABLE WITHOUT FK)
CREATE TABLE IF NOT EXISTS concellos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS especialidades (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS estados_alumnos (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles_usuarios (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL
);

-- Tablas de mayor uso (CREATE TABLE)
CREATE TABLE IF NOT EXISTS alumnos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    dni_nie VARCHAR(500),
    nombre VARCHAR(500) NOT NULL,
    apellidos VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL,
    telefono VARCHAR(500) NOT NULL,
    concello_id INT NOT NULL,
    numero_seguridad_social VARCHAR(500),
    estado_id TINYINT NOT NULL,
    tutor_centro_id BIGINT NOT NULL
);

CREATE TABLE correos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    usuario_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    curso_academico VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS cursos (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    nombre VARCHAR(500) NOT NULL,
    especialidad_id TINYINT NOT NULL
);

CREATE TABLE IF NOT EXISTS empresas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL,
    concello_id INT NOT NULL,
    direccion VARCHAR(500) NOT NULL,
    observaciones TEXT,
    especialidad_id TINYINT NOT NULL,
    contacto_nombre VARCHAR(500),
    contacto_email VARCHAR(500),
    contacto_telefono VARCHAR(500),
    activa BOOLEAN NOT NULL,
    plazas SMALLINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL,
    especialidad_id TINYINT NOT NULL
);

CREATE TABLE IF NOT EXISTS tutores_centro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL,
    apellidos VARCHAR(500) NOT NULL,
    usuario_id BIGINT,
    email VARCHAR(500) NOT NULL,
    curso_id SMALLINT,
    activo BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS tutores_empresa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empresa_id BIGINT NOT NULL,
    nombre VARCHAR(500) NOT NULL,
    apellidos VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL,
    telefono VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    rol_id TINYINT NOT NULL,
    activo BOOLEAN NOT NULL
);

-- Tablas de relación many-to-many (CREATE TABLE N:M)
CREATE TABLE IF NOT EXISTS empresas_skills (
    empresa_id BIGINT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (empresa_id, skill_id)
);

CREATE TABLE IF NOT EXISTS fct (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    alumno_id BIGINT NOT NULL,
    tutor_empresa_id BIGINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE
);

-- Claves foráneas (ALTER TABLE - FK)
ALTER TABLE alumnos
ADD CONSTRAINT fk_alumnos_concello FOREIGN KEY (concello_id) REFERENCES concellos (id);

ALTER TABLE alumnos
ADD CONSTRAINT fk_alumnos_estado_alumnos FOREIGN KEY (estado_id) REFERENCES estados_alumnos (id);

ALTER TABLE alumnos
ADD CONSTRAINT fk_alumnos_tutor_centro FOREIGN KEY (tutor_centro_id) REFERENCES tutores_centro (id);

ALTER TABLE correos
ADD CONSTRAINT fk_correos_empresa FOREIGN KEY (empresa_id) REFERENCES empresas (id);

ALTER TABLE cursos
ADD CONSTRAINT fk_cursos_especialidad FOREIGN KEY (especialidad_id) REFERENCES especialidades (id) ON DELETE CASCADE;

ALTER TABLE correos
ADD CONSTRAINT fk_correos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id);

ALTER TABLE empresas
ADD CONSTRAINT fk_empresas_concello FOREIGN KEY (concello_id) REFERENCES concellos (id);

ALTER TABLE empresas
ADD CONSTRAINT fk_empresas_especialidad FOREIGN KEY (especialidad_id) REFERENCES especialidades (id);

ALTER TABLE empresas_skills
ADD CONSTRAINT fk_empresas_skills_empresa FOREIGN KEY (empresa_id) REFERENCES empresas (id) ON DELETE CASCADE;

ALTER TABLE empresas_skills
ADD CONSTRAINT fk_empresas_skills_skill FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE;

ALTER TABLE fct
ADD CONSTRAINT fk_fct_alumno FOREIGN KEY (alumno_id) REFERENCES alumnos (id) ON DELETE CASCADE;

ALTER TABLE fct
ADD CONSTRAINT fk_fct_tutor_empresa_id FOREIGN KEY (tutor_empresa_id) REFERENCES tutores_empresa (id) ON DELETE CASCADE;

ALTER TABLE skills
ADD CONSTRAINT fk_skills_especialidad FOREIGN KEY (especialidad_id) REFERENCES especialidades (id);

ALTER TABLE tutores_centro
ADD CONSTRAINT fk_tutor_centro_curso FOREIGN KEY (curso_id) REFERENCES cursos (id);

ALTER TABLE tutores_centro
ADD CONSTRAINT fk_tutor_centro_usuario_id FOREIGN KEY (usuario_id) REFERENCES usuarios (id);

ALTER TABLE tutores_empresa
ADD CONSTRAINT fk_tutores_empresa FOREIGN KEY (empresa_id) REFERENCES empresas (id) ON DELETE CASCADE;

ALTER TABLE usuarios
ADD CONSTRAINT fk_usuarios_rol FOREIGN KEY (rol_id) REFERENCES roles_usuarios (id);

-- Índices únicos (UNIQUE INDEX)
CREATE UNIQUE INDEX idx_alumnos_dni_nie ON alumnos (dni_nie);

CREATE UNIQUE INDEX idx_alumnos_numero_seguridad_social ON alumnos (numero_seguridad_social);

CREATE UNIQUE INDEX idx_cursos_codigo ON cursos (codigo);

CREATE UNIQUE INDEX idx_tutores_centro_email ON tutores_centro (email);

CREATE UNIQUE INDEX idx_usuarios_email ON usuarios (email);