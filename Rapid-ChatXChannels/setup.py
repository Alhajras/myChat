import sys
from pathlib import Path
from typing import List

from setuptools import find_namespace_packages, setup

import preondock.meta

clients = ["fifty2"]


package_path = Path(__file__).parent / "src"

client = None

for c in clients:
    if c in sys.argv:
        client = c
        sys.argv.remove(c)

if client:
    client_package_path = package_path / "clusters" / "clients" / client
    package_data: List[Path] = []

    setup(
        name=f"preondock-{client}",
        version=preondock.meta.version_str,
        description=preondock.meta.__doc__,
        keywords=preondock.meta.keywords,
        author=preondock.meta.author,
        author_email=preondock.meta.email,
        url=preondock.meta.url,
        license=preondock.meta.license,
        packages=find_namespace_packages(
            include=[f"preondock.clusters.clients.{client}", f"preondock.clusters.clients.{client}.*"]
        ),
        package_data={
            f"preondock.clusters.clients.{client}": [str(f.relative_to(client_package_path)) for f in package_data]
        },
    )

else:
    package_data = []
    package_data += [package_path / "README.md"]
    package_data += [package_path / "CHANGELOG.md"]
    package_data += package_path.rglob("**/static/**/*")
    package_data += package_path.rglob("**/templates/**/*")

    setup(
        name="preondock",
        version=preondock.meta.version_str,
        description=preondock.meta.__doc__,
        keywords=preondock.meta.keywords,
        author=preondock.meta.author,
        author_email=preondock.meta.email,
        url=preondock.meta.url,
        license=preondock.meta.license,
        packages=find_namespace_packages(exclude=["preondock.clusters.clients.*"]),
        package_data={"preondock": [str(f.relative_to(package_path)) for f in package_data]},
    )
