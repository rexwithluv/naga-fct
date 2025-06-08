import subprocess


def restart_docker_mariadb():
    print("Limpiando la base de datos...")

    subprocess.run(
        ["docker", "compose", "--profile", "dev", "down"],
        capture_output=True,
    )

    subprocess.run(
        ["docker", "compose", "--profile", "dev", "up", "-d"],
        capture_output=True,
    )

    print("Base de datos de fábrica!")


restart_docker_mariadb()
