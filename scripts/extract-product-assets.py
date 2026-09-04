from pathlib import Path
from rembg import remove

JOBS = {
    'floor-lavender': Path('photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Lavender Kerry  900 ml/00_00.webp'),
    'floor-floral': Path('photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Floral Passion  900 ml/00.webp'),
    'floor-teatree': Path('photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Tea Tree Flash  900 ml/01_00.webp'),
    'bathroom': Path('photo_from_googlr_drive/CAPTAINMAID Bathroom Cleaner Spray 900 ml/Banner Bathroom Cleaner 500x500-01.jpg'),
    'kitchen': Path('photo_from_googlr_drive/CAPTAINMAID Kitchen Cleaner Spray 900 ml/Banner Kitchen Cleaner 500x500-01.jpg'),
    'glass': Path('photo_from_googlr_drive/CAPTAINMAID Glass Cleaner 900 ml/กัปตันเมด ผลิตภัณฑ์เช็ดกระจก กลิ่นฟรุตตี้ เฟรช.png'),
}

out_dir = Path('public/images/products-img/extracted')
out_dir.mkdir(parents=True, exist_ok=True)
for name, source in JOBS.items():
    target = out_dir / f'{name}.png'
    target.write_bytes(remove(source.read_bytes()))
    print(f'OK {source} -> {target}')
