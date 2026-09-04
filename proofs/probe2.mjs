import sharp from 'sharp'
const files = [
  'public/images/hero/v2/slide-1-brand-desktop.jpg',
  'photo_from_googlr_drive/LOGO CAPTAINMAID/LOGO CAPTAINMAID.png',
]
for (const f of files) {
  const m = await sharp(f).metadata()
  console.log(f, m.width + 'x' + m.height, m.format, m.space, 'alpha:' + m.hasAlpha)
}
