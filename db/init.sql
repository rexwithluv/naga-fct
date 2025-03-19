-- Activamos las extensiones
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_partman;

-- Configuramos la partición para la tabla padre
SELECT partman.create_parent(
    p_parent_table := 'correos',
    p_control      := 'curso_academico',
    p_type         := 'range',
    p_interval     := 'year',
    p_start        := '2024-09-01',
    p_inherit_fk   := true,
    p_retention    := '5 years'
);

-- -- Programamos la tarea cada 1 de septiembre a medianoche
SELECT cron.schedule(
    '0 0 1 9 *',
    'SELECT partman.run_maintenance(''correos'');'
);