# Ejecutar después de cambiar la estructura de la DB en el schema.sql
import os
import subprocess
from typing import AnyStr, List

SQL_FILE: str = "db/schema.sql"
DBML_FILE: str = "db/database.dbml"


def write_dbml(sql_filename: str, dbml_filename: str) -> None:
    subprocess.run(f"sql2dbml --mysql {SQL_FILE} -o {DBML_FILE}".split(" "))

    with open(DBML_FILE, "r") as f:
        lines: List[AnyStr] = f.readlines()

    for i, line in enumerate(lines):
        if (
            'Ref "fk_tutor_centro_usuario_id":"usuarios"."id" < "tutores_centro"."usuario_id"'
            in line
        ):
            lines[i] = line.replace("<", "-")

    with open(DBML_FILE, "w") as f:
        f.writelines(lines)


def remove_dbml_error_log() -> None:
    if os.path.getsize("dbml-error.log") == 0:
        os.remove("dbml-error.log")
    else:
        print("El archivo de log no está vacío.")


try:
    write_dbml(SQL_FILE, DBML_FILE)
    remove_dbml_error_log()
except Exception as e:
    print(f"Ha ocurrido un error: {e}")
