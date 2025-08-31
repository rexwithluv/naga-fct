# Should run in root of the project
# For development purposes

from subprocess import CalledProcessError, run
from typing import List


def build_and_push(directory: str, gh_user: str) -> None:
    try:
        run(
            [
                "docker",
                "buildx",
                "build",
                "--push",
                "--tag",
                f"ghcr.io/{gh_user}/naga-fct-{directory}:test",
                directory,
            ],
            check=True,
        )
    except CalledProcessError as e:
        print(f"An error occurred while build or push the docker image of {directory}")
        print(f"Details: {e.stderr}")


if __name__ == "__main__":
    directories: List[str] = ["frontend", "backend"]
    for dir in directories:
        build_and_push(dir, "rexwithluv")
