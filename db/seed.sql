-- TEST DATA

INSERT INTO
    concellos (nombre)
VALUES ('Agolada'),
    ('Arbo'),
    ('Baiona'),
    ('Barro'),
    ('Bueu'),
    ('Caldas de Reis'),
    ('Cambados'),
    ('Campo Lameiro'),
    ('Cangas'),
    ('A Cañiza'),
    ('Catoira'),
    ('Cerdedo-Cotobade'),
    ('Covelo'),
    ('Crecente'),
    ('Cuntis'),
    ('Dozón'),
    ('A Estrada'),
    ('Forcarei'),
    ('Fornelos de Montes'),
    ('Gondomar'),
    ('O Grove'),
    ('A Guarda'),
    ('A Illa de Arousa'),
    ('Lalín'),
    ('A Lama'),
    ('Marín'),
    ('Meaño'),
    ('Meis'),
    ('Moaña'),
    ('Mondariz'),
    ('Mondariz-Balneario'),
    ('Moraña'),
    ('Mos'),
    ('As Neves'),
    ('Nigrán'),
    ('Oia'),
    ('Pazos de Borbén'),
    ('Poio'),
    ('Ponte Caldelas'),
    ('Ponteareas'),
    ('Pontecesures'),
    ('Pontevedra'),
    ('O Porriño'),
    ('Portas'),
    ('Redondela'),
    ('Ribadumia'),
    ('Rodeiro'),
    ('O Rosal'),
    ('Salceda de Caselas'),
    ('Salvaterra de Miño'),
    ('Sanxenxo'),
    ('Silleda'),
    ('Soutomaior'),
    ('Tomiño'),
    ('Tui'),
    ('Valga'),
    ('Vigo'),
    ('Vila de Cruces'),
    ('Vilaboa'),
    ('Vilagarcía de Arousa'),
    ('Vilanova de Arousa');

INSERT INTO
    especialidades (nombre)
VALUES (
        "Informática y Comunicaciones"
    ),
    ("Imagen Personal");

INSERT INTO
    estados_alumnos (nombre)
VALUES ('Cursando'),
    ('De baja'),
    ('Graduado'),
    ('En prácticas');

INSERT INTO
    roles_usuarios (nombre)
VALUES ("Superusuario"),
    ("Usuario estándar");

---

INSERT INTO
    empresas (
        nombre,
        concello_id,
        direccion,
        observaciones,
        especialidad_id,
        contacto_nombre,
        contacto_email,
        contacto_telefono,
        disponible,
        plazas
    )
VALUES (
        'Tecnologías Pontevivas',
        1,
        'Avda. de Galicia, 25, Pontevedra',
        'Empresa dedicada al desarrollo de software para empresas locales',
        1,
        'María López',
        'maria@pontevivas.com',
        '986123456',
        TRUE,
        2
    ),
    (
        'Consultores de Innovación',
        2,
        'Calle de la Costa, 13, Poio',
        'Consultoría en innovación tecnológica y digitalización',
        1,
        'José Ruiz',
        'jose@innovacionconsultores.com',
        '986234567',
        TRUE,
        3
    ),
    (
        'Pontefrutas S.L.',
        3,
        'Calle Real, 45, Marín',
        'Distribución de productos frescos locales',
        2,
        'Carlos Gómez',
        'carlos@pontefrutas.com',
        '986345678',
        TRUE,
        4
    ),
    (
        'AutoRepuestos Galicia',
        4,
        'Polígono Industrial, nave 6, Sanxenxo',
        'Venta de repuestos y accesorios para vehículos',
        1,
        'Lucía Martínez',
        'lucia@autorepuestosgalicia.com',
        '986456789',
        TRUE,
        1
    ),
    (
        'Academia Inglés Pontevedra',
        5,
        'Calle del Mar, 12, Vilagarcía de Arousa',
        'Centro de formación en idiomas y preparación de exámenes internacionales',
        2,
        'Antonio Pérez',
        'antonio@academiaingles.com',
        '986567890',
        TRUE,
        2
    ),
    (
        'Ingeniería y Obras Noroeste',
        6,
        'Rúa do Conde, 8, O Grove',
        'Servicios de ingeniería civil, construcción y proyectos de infraestructura',
        1,
        'Ana Fernández',
        'ana@ingenierianoroeste.com',
        '986678901',
        FALSE,
        1
    ),
    (
        'Distribuciones Albariño',
        7,
        'Rúa da Torre, 5, Combarro',
        'Distribución de vinos y licores gallegos',
        2,
        'Miguel Rodríguez',
        'miguel@distribucionesalbariño.com',
        '986789012',
        TRUE,
        1
    ),
    (
        'Muebles Litoral',
        8,
        'Calle de la Playa, 32, San Vicente do Mar',
        'Fabricación y venta de muebles y artículos de decoración para el hogar',
        1,
        'Beatriz Sánchez',
        'beatriz@muebleslitoral.com',
        '986890123',
        TRUE,
        3
    ),
    (
        'Ferrogal Industria',
        9,
        'Polígono Industrial, 3, A Estrada',
        'Fabricación y distribución de piezas de metal para maquinaria industrial',
        1,
        'David Álvarez',
        'david@ferrogalindustria.com',
        '986901234',
        TRUE,
        4
    ),
    (
        'Clínica Dental Sorriso',
        10,
        'Rúa da Paz, 15, Pontevedra',
        'Servicios dentales y ortodoncia',
        2,
        'Raquel González',
        'raquel@clinicadentalsorriso.com',
        '986012345',
        TRUE,
        1
    );

INSERT INTO
    cursos (
        codigo,
        nombre,
        especialidad_id
    )
VALUES (
        "BIMP11",
        "Peiteado e Estética",
        2
    ),
    (
        "MIMP01",
        "Estética e Beleza",
        2
    ),
    (
        "MIMP02",
        "Peiteado e Cosmética Capilar",
        2
    ),
    (
        "SIMP01",
        "Estética Integral e Benestar",
        2
    ),
    (
        "SIMP02",
        "Estilismo e dirección de peiteado",
        2
    ),
    (
        "SIMP03",
        "Asesoría de imaxe persoal e corporativa",
        2
    ),
    (
        "SIMP04",
        "Caracterización e maquillaxe profesional",
        2
    ),
    (
        "SIMP05",
        "Termalismo e benestar",
        2
    ),
    (
        "BIFC11",
        "Informática e comunicacións",
        1
    ),
    (
        "BIFC12",
        "Informática de oficina",
        1
    ),
    (
        "MIFC01",
        "Sistemas microinformáticos e redes",
        1
    ),
    (
        "SIFC01",
        "Administración de sistemas informáticos en rede",
        1
    ),
    (
        "SIFC02",
        "Desenvolvemento de aplicacións multiplataforma",
        1
    ),
    (
        "SIFC03",
        "Desenvolemento de aplicacións web",
        1
    );

INSERT INTO
    skills (nombre, especialidad_id)
VALUES ('Python', 1),
    ('JavaScript', 1),
    ('Linux', 1),
    ('Docker', 1),
    ('Git', 1),
    ('Redes', 1),
    ('Bases de datos SQL', 1),
    ('Ciberseguridad', 1),
    ('Desarrollo web', 1),
    ('Machine Learning', 1),
    ('Corte de pelo', 2),
    ('Colorimetría', 2),
    ('Maquillaje profesional', 2),
    ('Estilismo y moda', 2),
    ('Uñas esculpidas', 2),
    ('Depilación', 2),
    ('Peinados y recogidos', 2),
    ('Asesoría de imagen', 2),
    ('Masajes faciales', 2),
    ('Tratamientos capilares', 2);

INSERT INTO
    tutores_centro (
        nombre,
        apellidos,
        email,
        curso_id,
        activo
    )
VALUES (
        'Patricia',
        'González',
        'patricia@edu.xunta.gal',
        11,
        true
    ),
    (
        'Marta',
        'Rey',
        'marta@edu.xunta.gal.com',
        14,
        true
    );

INSERT INTO
    tutores_empresa (
        empresa_id,
        nombre,
        apellidos,
        email,
        telefono
    )
VALUES (
        1,
        'María',
        'López',
        'maria@pontevivas.com',
        '986123456'
    ),
    (
        2,
        'José',
        'Ruiz',
        'jose@innovacionconsultores.com',
        '986234567'
    ),
    (
        3,
        'Carlos',
        'Gómez',
        'carlos@pontefrutas.com',
        '986345678'
    ),
    (
        4,
        'Lucía',
        'Martínez',
        'lucia@autorepuestosgalicia.com',
        '986456789'
    ),
    (
        5,
        'Antonio',
        'Pérez',
        'antonio@academiaingles.com',
        '986567890'
    ),
    (
        6,
        'Ana',
        'Fernández',
        'ana@ingenierianoroeste.com',
        '986678901'
    ),
    (
        7,
        'Miguel',
        'Rodríguez',
        'miguel@distribucionesalbariño.com',
        '986789012'
    ),
    (
        8,
        'Beatriz',
        'Sánchez',
        'beatriz@muebleslitoral.com',
        '986890123'
    ),
    (
        9,
        'David',
        'Álvarez',
        'david@ferrogalindustria.com',
        '986901234'
    ),
    (
        10,
        'Raquel',
        'González',
        'raquel@clinicadentalsorriso.com',
        '986012345'
    );

INSERT INTO
    alumnos (
        dni_nie,
        nombre,
        apellidos,
        email,
        telefono,
        concello_id,
        numero_seguridad_social,
        estado_id,
        tutor_empresa_id,
        tutor_centro_id
    )
VALUES (
        123456789,
        'Carlos',
        'Pérez García',
        'carlos.perez@example.com',
        '986123457',
        1,
        123456789,
        1,
        1,
        1
    ),
    (
        987654321,
        'Ana',
        'López Fernández',
        'ana.lopez@example.com',
        '986234568',
        2,
        987654321,
        2,
        2,
        2
    ),
    (
        112233445,
        'Laura',
        'Martín Sánchez',
        'laura.martin@example.com',
        '986345679',
        3,
        112233445,
        3,
        3,
        2
    ),
    (
        223344556,
        'Pedro',
        'Gómez Díaz',
        'pedro.gomez@example.com',
        '986456780',
        4,
        223344556,
        4,
        4,
        1
    ),
    (
        334455667,
        'Marta',
        'Vázquez Pérez',
        'marta.vazquez@example.com',
        '986567891',
        5,
        334455667,
        2,
        5,
        1
    ),
    (
        445566778,
        'José',
        'Martínez Ruiz',
        'jose.martinez@example.com',
        '986678902',
        6,
        445566778,
        3,
        6,
        2
    ),
    (
        556677889,
        'Isabel',
        'González Álvarez',
        'isabel.gonzalez@example.com',
        '986789013',
        7,
        556677889,
        1,
        7,
        2
    ),
    (
        667788990,
        'David',
        'López Torres',
        'david.lopez@example.com',
        '986890124',
        8,
        667788990,
        4,
        8,
        1
    ),
    (
        778899001,
        'Sofía',
        'Hernández Fernández',
        'sofia.hernandez@example.com',
        '986901235',
        9,
        778899001,
        4,
        9,
        2
    ),
    (
        889900112,
        'Luis',
        'Torres López',
        'luis.torres@example.com',
        '986012346',
        10,
        889900112,
        2,
        10,
        1
    );

INSERT INTO
    usuarios (
        email,
        password,
        rol_id,
        tutor_id,
        activo
    )
VALUES (
        'admin@edu.xunta.gal',
        '$2a$12$Gxa5XO.b0rvew79tIBrYMO55PXw1pVDyTRPXs3/rGyYhc2wosC7zO', -- abc123.
        1,
        null,
        true
    ),
    (
        'patricia@edu.xunta.gal',
        '$2a$12$frnjU.CRV0Ic/LDJMVaNXOGUFdo8lHBvKSezjYTm2vbmiuP6UwdDG', -- springboot
        2,
        1,
        true
    ),
    (
        'marta@edu.xunta.gal',
        '$2a$12$ieUrumtPuz/f7trjuX8uxOL7cTdDVP.eMxu7ZrC7FERaGRiWGhMiG', -- sushi
        2,
        2,
        false
    );

---

INSERT INTO
    alumnos_empresas (
        alumno_id,
        empresa_id,
        fecha_inicio,
        fecha_fin
    )
VALUES (1, 1, '2025-04-01', null),
    (
        2,
        2,
        '2025-04-05',
        '2025-07-05'
    ),
    (
        3,
        3,
        '2025-04-10',
        '2025-07-10'
    ),
    (
        4,
        4,
        '2025-04-15',
        '2025-07-15'
    ),
    (5, 5, '2025-04-20', null),
    (
        6,
        6,
        '2025-04-25',
        '2025-07-25'
    ),
    (
        7,
        7,
        '2025-05-01',
        '2025-08-01'
    ),
    (8, 8, '2025-05-05', null),
    (
        9,
        9,
        '2025-05-10',
        '2025-08-10'
    ),
    (
        10,
        10,
        '2025-05-15',
        '2025-08-15'
    );

INSERT INTO
    empresas_skills (empresa_id, skill_id)
VALUES (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 11),
    (3, 12),
    (4, 5),
    (4, 6),
    (5, 13),
    (5, 14),
    (6, 7),
    (6, 8),
    (7, 15),
    (7, 16),
    (8, 9),
    (8, 10),
    (9, 17),
    (9, 18),
    (10, 19),
    (10, 20);