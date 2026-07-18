# =====================================================================
# Captain Maid — Setup Script
# 1) คัดลอกรูปจาก capttt\photo -> captain-maid\public\images (ตั้งชื่อใหม่)
# 2) ลบพื้นหลังสีน้ำเงินของโลโก้ (public\images\logo-original.png -> logo.png)
# 3) npm install
# วิธีใช้:  รันจากโฟลเดอร์ captain-maid ->  .\setup-images.ps1
# =====================================================================

$ErrorActionPreference = 'Stop'

$root      = $PSScriptRoot
$photoDir  = Join-Path (Split-Path $root -Parent) 'capttt\photo'
$imagesDir = Join-Path $root 'public\images'

if (-not (Test-Path $photoDir)) {
    Write-Host "ไม่พบโฟลเดอร์รูป: $photoDir" -ForegroundColor Red
    exit 1
}
New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null

# ---------- 1) Copy & rename photos ----------
# key = ชื่อไฟล์ปลายทาง, value = wildcard ของไฟล์ต้นทาง
$map = [ordered]@{
    'hero-1.png'                = '*05_40_07 (1).png'   # ครอบครัวถูพื้น (แนวนอน)
    'hero-2.png'                = '*05_40_07 (2).png'   # ครอบครัวถูพื้น v2
    'hero-3.png'                = '*05_40_17 (5).png'   # ครอบครัวบนโซฟา
    'hero-4.png'                = '*05_40_17 (6).png'   # ครอบครัวโซฟา v2
    'hero-5.png'                = '*05_40_17 (9).png'   # ห้องครัวพื้นหินอ่อน
    'solution-floor.png'        = '*05_40_17 (12).png'  # พื้นหินอ่อน
    'solution-bathroom.png'     = '*05_40_17 (14).png'  # เช็ดกระเบื้องห้องน้ำ
    'solution-kitchen.png'      = '*05_40_16 (1).png'   # เช็ดผนังครัว
    'solution-glass.png'        = '*05_40_26 (33).png'  # เช็ดเคาน์เตอร์
    'solution-disinfectant.png' = '*05_40_18 (17).png'  # เช็ดลูกบิดประตู
    'solution-dishwasher.png'   = 'kitchen-multi-purpose.png'
    'deep-kitchen.png'          = '*05_40_16 (2).png'
    'deep-living.png'           = '*05_40_18 (25).png'  # ครอบครัวอ่านหนังสือ
    'deep-bathroom.png'         = 'bathroom-clear-active.png'
    'deep-glass.png'            = '*05_40_18 (20).png'  # ห้องนั่งเล่นหน้าต่างกระจก
    'deep-disinfectant.png'     = '*05_40_18 (23).png'  # เช็ดสวิตช์ไฟ
    'deep-floor.png'            = '*05_40_07 (3).png'   # ถูพื้น (แนวตั้ง)
    'trust-banner.png'          = '*05_40_17 (10).png'  # ห้องนั่งเล่นโปร่งสว่าง
    'why-us.png'                = '*05_40_19 (27).png'  # แม่ลูกพับผ้า
    'testimonial.png'           = '*05_40_17 (15).png'  # ผู้หญิงเช็ดเคาน์เตอร์
    'blog-1.png'                = '*05_40_17 (15).png'
    'blog-2.png'                = '*05_40_07 (3).png'
    'blog-3.png'                = '*05_40_17 (6).png'
    'newsletter-bg.png'         = '*05_40_30 (42).png'  # พื้นหลังฟองน้ำสีฟ้า
}

$allPhotos = Get-ChildItem -Path $photoDir -File
foreach ($dest in $map.Keys) {
    $pattern = $map[$dest]
    $src = $allPhotos | Where-Object { $_.Name -like $pattern } | Select-Object -First 1
    if ($null -ne $src) {
        Copy-Item $src.FullName (Join-Path $imagesDir $dest) -Force
        Write-Host "OK  $dest  <-  $($src.Name)" -ForegroundColor Green
    } else {
        Write-Host "SKIP  $dest  (ไม่พบไฟล์ $pattern)" -ForegroundColor Yellow
    }
}

# ---------- 2) Logo background removal ----------
# บันทึกรูปโลโก้ (พื้นหลังน้ำเงิน) เป็น public\images\logo-original.png ก่อนรัน
$logoSrc = Join-Path $imagesDir 'logo-original.png'
$logoOut = Join-Path $imagesDir 'logo.png'

if (Test-Path $logoSrc) {
    Add-Type -AssemblyName System.Drawing

    $bmp = New-Object System.Drawing.Bitmap($logoSrc)
    $out = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # ใช้สีมุมบนซ้ายเป็นสีพื้นหลังอ้างอิง (chroma key)
    $key = $bmp.GetPixel(0, 0)
    $tolerance = 55

    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $p = $bmp.GetPixel($x, $y)
            $dr = [math]::Abs([int]$p.R - [int]$key.R)
            $dg = [math]::Abs([int]$p.G - [int]$key.G)
            $db = [math]::Abs([int]$p.B - [int]$key.B)
            $dist = [math]::Sqrt($dr * $dr + $dg * $dg + $db * $db)

            if ($dist -lt $tolerance) {
                # พื้นหลัง -> โปร่งใส
                $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } elseif ($dist -lt ($tolerance + 40)) {
                # ขอบ -> โปร่งแสงบางส่วน (feather เนียนขึ้น)
                $alpha = [int](255 * (($dist - $tolerance) / 40))
                $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
            } else {
                $out.SetPixel($x, $y, $p)
            }
        }
    }

    $out.Save($logoOut, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose(); $out.Dispose()
    Write-Host "OK  logo.png (ลบพื้นหลังแล้ว)" -ForegroundColor Green
} else {
    Write-Host "SKIP logo — กรุณาบันทึกโลโก้เป็น public\images\logo-original.png แล้วรันสคริปต์อีกครั้ง" -ForegroundColor Yellow
}

# ---------- 3) Install dependencies ----------
Write-Host "`nกำลังติดตั้ง dependencies..." -ForegroundColor Cyan
Set-Location $root
npm install

Write-Host "`nเสร็จแล้ว!  รันเว็บด้วย:  npm run dev" -ForegroundColor Cyan
