import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

mkdirSync('proofs/previews', { recursive: true })

const jobs = [
  ["photo_from_googlr_drive/CAPTAINMAID Bathroom Cleaner Spray 900 ml/Banner Bathroom Cleaner 500x500-01.jpg", 'proofs/previews/bath-01.jpg'],
  ["photo_from_googlr_drive/CAPTAINMAID Bathroom Cleaner Spray 900 ml/Banner Bathroom Cleaner 500x500-04.jpg", 'proofs/previews/bath-04.jpg'],
  ["photo_from_googlr_drive/CAPTAINMAID Glass Cleaner 900 ml/Banner Glass-Cleaner 500x500-01.jpg", 'proofs/previews/glass-01.jpg'],
  ["photo_from_googlr_drive/CAPTAINMAID Glass Cleaner 900 ml/กัปตันเมด ผลิตภัณฑ์เช็ดกระจก กลิ่นฟรุตตี้ เฟรช.png", 'proofs/previews/glass-thai.jpg'],
  ["photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Floral Passion  900 ml/00.webp", 'proofs/previews/floral-00.jpg'],
  ["photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Tea Tree Flash  900 ml/01_00.webp", 'proofs/previews/teatree-00.jpg'],
]

for (const [inFile, outFile] of jobs) {
  try {
    await sharp(inFile).resize({ width: 400 }).flatten({ background: '#ffffff' }).jpeg({ quality: 65 }).toFile(outFile)
    console.log('OK  ', outFile)
  } catch (err) {
    console.log('FAIL', inFile, '-', err.message.split('\n')[0])
  }
}
