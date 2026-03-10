# Deploy PromotieMeester to FTP
# Uploads all files from deploy folder to promotiemeester.nl

param(
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

Write-Host "PromotieMeester FTP Deployment" -ForegroundColor Cyan
Write-Host ""

# Get credentials from vault
Write-Host "Retrieving FTP credentials from vault..." -ForegroundColor Yellow
$vaultPath = "C:\scripts\tools\vault.ps1"
$credsJson = & $vaultPath -Action get -Service "promotiemeester-ftp"

if (-not $credsJson) {
    Write-Host "ERROR: Could not retrieve FTP credentials from vault" -ForegroundColor Red
    exit 1
}

$creds = $credsJson | ConvertFrom-Json
$ftpHost = "ftp://promotiemeester.nl"
$ftpUser = $creds.username
$ftpPass = $creds.password

Write-Host "Credentials retrieved: $ftpUser @ promotiemeester.nl" -ForegroundColor Green
Write-Host ""

# Deploy folder
$deployFolder = "E:\projects\promotiemeester\deploy"

if (-not (Test-Path $deployFolder)) {
    Write-Host "ERROR: Deploy folder not found: $deployFolder" -ForegroundColor Red
    exit 1
}

# Files to upload
$filesToUpload = @(
    @{ Local = "$deployFolder\index.html"; Remote = "public_html/index.html" }
    @{ Local = "$deployFolder\signup.php"; Remote = "public_html/signup.php" }
    @{ Local = "$deployFolder\promotiemeester.png"; Remote = "public_html/promotiemeester.png" }
    @{ Local = "$deployFolder\seo-meester-screenshot.png"; Remote = "public_html/seo-meester-screenshot.png" }
    @{ Local = "$deployFolder\social-media-meester-screenshot.png"; Remote = "public_html/social-media-meester-screenshot.png" }
    @{ Local = "$deployFolder\favicon.svg"; Remote = "public_html/favicon.svg" }
    @{ Local = "$deployFolder\crown-logo.svg"; Remote = "public_html/crown-logo.svg" }
)

# Add assets files
$assetsFiles = Get-ChildItem "$deployFolder\assets" -File
foreach ($file in $assetsFiles) {
    $filesToUpload += @{
        Local = $file.FullName
        Remote = "public_html/assets/$($file.Name)"
    }
}

Write-Host "Files to upload: $($filesToUpload.Count)" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be uploaded" -ForegroundColor Yellow
    Write-Host ""
    foreach ($file in $filesToUpload) {
        Write-Host "  -> $($file.Local) -> $($file.Remote)" -ForegroundColor Gray
    }
    Write-Host ""
    Write-Host "Run without -DryRun to actually upload files" -ForegroundColor Yellow
    exit 0
}

# Create FTP credential object
$credential = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

# Create assets directory if needed
Write-Host "Creating assets directory..." -ForegroundColor Yellow
$createDirUri = "$ftpHost/public_html/assets"
try {
    $request = [System.Net.WebRequest]::Create($createDirUri)
    $request.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    $request.Credentials = $credential
    $request.UseBinary = $true
    $response = $request.GetResponse()
    $response.Close()
    Write-Host "Assets directory created" -ForegroundColor Green
} catch {
    # Directory might already exist, that's ok
    Write-Host "Assets directory already exists (or access denied)" -ForegroundColor Gray
}
Write-Host ""

# Upload files
$uploaded = 0
$failed = 0

foreach ($file in $filesToUpload) {
    $localPath = $file.Local
    $remotePath = $file.Remote

    if (-not (Test-Path $localPath)) {
        Write-Host "SKIP: File not found: $localPath" -ForegroundColor Yellow
        continue
    }

    $fileName = Split-Path $localPath -Leaf
    $fileSize = (Get-Item $localPath).Length
    $fileSizeKB = [math]::Round($fileSize / 1KB, 2)

    Write-Host "Uploading $fileName ($fileSizeKB KB)..." -ForegroundColor Cyan

    try {
        $uri = "$ftpHost/$remotePath"
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = $credential
        $webclient.UploadFile($uri, $localPath)

        Write-Host "   Uploaded to $remotePath" -ForegroundColor Green
        $uploaded++
    } catch {
        Write-Host "   FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deployment Summary:" -ForegroundColor Cyan
Write-Host "   Uploaded: $uploaded files" -ForegroundColor Green
Write-Host "   Failed: $failed files" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Gray" })
Write-Host ""

if ($failed -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Visit: https://promotiemeester.nl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Test the website in your browser" -ForegroundColor Gray
    Write-Host "   2. Try the signup form" -ForegroundColor Gray
    Write-Host "   3. Check if emails are delivered" -ForegroundColor Gray
    Write-Host "   4. Verify dark/light mode toggle works" -ForegroundColor Gray
} else {
    Write-Host "Deployment completed with errors" -ForegroundColor Yellow
    Write-Host "   Review the errors above and retry" -ForegroundColor Gray
}

Write-Host ""
