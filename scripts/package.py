"""Package only the managed site output; no source files or credentials are included."""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
output = root / 'downloads'
output.mkdir(exist_ok=True)
for folder, name in [('offline-preview', 'north-and-nest-offline-preview.zip'), ('netlify-deploy', 'north-and-nest-netlify-deploy.zip')]:
    site = root / folder
    if not (site / 'index.html').is_file():
        raise SystemExit(f'Missing {folder}/index.html. Run npm run build first.')
    with ZipFile(output / name, 'w', compression=ZIP_DEFLATED) as archive:
        for file in sorted(site.rglob('*')):
            if file.is_file():
                entry = ZipInfo(file.relative_to(site).as_posix(), date_time=(2026, 1, 1, 0, 0, 0))
                entry.compress_type = ZIP_DEFLATED
                entry.external_attr = 0o644 << 16
                archive.writestr(entry, file.read_bytes())
    with ZipFile(output / name) as archive:
        assert archive.testzip() is None
        assert 'index.html' in archive.namelist()
    print(f'Packaged and verified {name}')
