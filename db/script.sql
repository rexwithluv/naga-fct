CREATE DATABASE fct;

CREATE TABLE IF NOT EXISTS cursos (
    id smallint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL,
    especialidad_id smallint NOT NULL
);

CREATE TABLE IF NOT EXISTS especialidades (
    id smallint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS alumnos (
    dni_nie bigint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL,
    apellidos varchar(500) NOT NULL,
    curso_id smallint NOT NULL,
    email varchar(500) NOT NULL,
    telefono varchar(500) NOT NULL,
    concello_id bigint NOT NULL,
    numero_seguridad_social bigint,
    estado_id smallint NOT NULL,
    tutor_empresa_id bigint NOT NULL,
    tutor_centro_id bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS estados_alumnos (
    id smallint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
    id bigint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL,
    especialidad_id smallint NOT NULL
);

CREATE TABLE IF NOT EXISTS empresas (
    id bigint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL,
    concello_id bigint NOT NULL,
    direccion varchar(500) NOT NULL,
    observaciones text,
    especialidad_id smallint NOT NULL,
    skills_id bigint NOT NULL,
    contacto_nombre varchar(500),
    contacto_email varchar(500),
    contacto_telefono varchar(500),
    disponible boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS concellos (
    id bigint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS empresas_skills (
    id bigint NOT NULL PRIMARY KEY,
    empresa_id bigint NOT NULL,
    skill_id bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS tutores_empresa (
    id bigint NOT NULL PRIMARY KEY,
    empresa_id bigint NOT NULL,
    nombre varchar(500) NOT NULL,
    apellidos varchar(500) NOT NULL,
    email varchar(500) NOT NULL,
    telefono varchar(500)
);

CREATE TABLE IF NOT EXISTS roles_usuarios (
    id smallint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id bigint NOT NULL PRIMARY KEY,
    email varchar(500) NOT NULL,
    password varchar(500) NOT NULL,
    rol_id smallint NOT NULL,
    tutor_id bigint,
    activo boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS tutores_centro (
    id bigint NOT NULL PRIMARY KEY,
    nombre varchar(500) NOT NULL,
    apellidos varchar(500) NOT NULL,
    email varchar(500) NOT NULL,
    curso_id smallint NOT NULL,
    activo boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS alumnos_empresas (
    id bigint NOT NULL PRIMARY KEY,
    alumno_dni_nie bigint NOT NULL,
    empresa_id bigint NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date
);

CREATE TABLE IF NOT EXISTS correos (
    id bigint NOT NULL PRIMARY KEY,
    fecha date NOT NULL,
    usuario_id bigint NOT NULL,
    empresa_id bigint NOT NULL,
    curso_academico varchar(50) NOT NULL
);

ALTER TABLE alumnos
ADD CONSTRAINT alumnos_concello_id_fk FOREIGN KEY (concello_id) REFERENCES concellos (id);

ALTER TABLE alumnos
ADD CONSTRAINT alumnos_cursos_id_fk FOREIGN KEY (curso_id) REFERENCES cursos (id);

ALTER TABLE alumnos_empresas
ADD CONSTRAINT alumnos_empresas_alumno_dni_nie_fk FOREIGN KEY (alumno_dni_nie) REFERENCES alumnos (dni_nie);

ALTER TABLE alumnos_empresas
ADD CONSTRAINT alumnos_empresas_empresa_id_fk FOREIGN KEY (empresa_id) REFERENCES empresas (id);

ALTER TABLE alumnos
ADD CONSTRAINT alumnos_estado_id_fk FOREIGN KEY (estado_id) REFERENCES estados_alumnos (id);

ALTER TABLE alumnos
ADD CONSTRAINT alumnos_tutor_centro_id_fk FOREIGN KEY (tutor_centro_id) REFERENCES tutores_centro (id);

ALTER TABLE alumnos
ADD CONSTRAINT alumnos_tutor_empresa_id_fk FOREIGN KEY (tutor_empresa_id) REFERENCES tutores_empresa (id);

ALTER TABLE cursos
ADD CONSTRAINT curso_especialidad_id_fk FOREIGN KEY (especialidad_id) REFERENCES especialidades (id);

ALTER TABLE empresas
ADD CONSTRAINT empresas_concello_id_fk FOREIGN KEY (concello_id) REFERENCES concellos (id);

ALTER TABLE empresas
ADD CONSTRAINT empresas_especialidad_id_fk FOREIGN KEY (especialidad_id) REFERENCES especialidades (id);

ALTER TABLE empresas_skills
ADD CONSTRAINT empresas_skills_empresa_id_fk FOREIGN KEY (empresa_id) REFERENCES empresas (id);

ALTER TABLE empresas_skills
ADD CONSTRAINT empresas_skills_skill_id_fk FOREIGN KEY (skill_id) REFERENCES skills (id);

ALTER TABLE skills
ADD CONSTRAINT skills_especialidad_id_fk FOREIGN KEY (especialidad_id) REFERENCES especialidades (id);

ALTER TABLE tutores_centro
ADD CONSTRAINT tutores_centro_curso_id_fk FOREIGN KEY (curso_id) REFERENCES cursos (id);

ALTER TABLE tutores_empresa
ADD CONSTRAINT tutores_empresa_empresa_id_fk FOREIGN KEY (empresa_id) REFERENCES empresas (id);

ALTER TABLE usuarios
ADD CONSTRAINT usuarios_rol_id_fk FOREIGN KEY (rol_id) REFERENCES roles_usuarios (id);

ALTER TABLE usuarios
ADD CONSTRAINT usuarios_tutor_id_fk FOREIGN KEY (tutor_id) REFERENCES tutores_centro (id);

ALTER TABLE correos
ADD CONSTRAINT correos_usuario_id_fk FOREIGN KEY (usuario_id) REFERENCES usuarios (id);

ALTER TABLE correos
ADD CONSTRAINT correos_empresa_id_fk FOREIGN KEY (empresa_id) REFERENCES empresas (id);