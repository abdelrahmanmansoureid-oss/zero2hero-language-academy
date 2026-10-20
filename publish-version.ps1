param(
    [Parameter(Mandatory=$false)]
    [string]$Version = "v1.0.1",

    [Parameter(Mandatory=$false)]
    [string]$Message = "Update ZERO2HERO Language Academy website"
)

Write-Host "Publishing version $Version : $Message" -ForegroundColor Cyan

# Check if git CLI is available and .git exists
if ((Get-Command git -ErrorAction SilentlyContinue) -and (Test-Path ".git")) {
    git add -A
    git commit -m "release($Version): $Message"
    git tag -a $Version -m $Message -f
    git push origin main --tags
    Write-Host "Successfully pushed $Version to GitHub via Git CLI!" -ForegroundColor Green
    exit 0
}

# Fallback: Publish directly via GitHub REST API using .env.local or $env:GITHUB_TOKEN
$token = $env:GITHUB_TOKEN
$owner = "abdelrahmanmansoureid-oss"
$repo  = "zero2hero-language-academy"

if (Test-Path ".env.local") {
    Get-Content ".env.local" | ForEach-Object {
        if ($_ -match "^GITHUB_TOKEN=(.+)$") { $token = $Matches[1].Trim() }
        if ($_ -match "^GITHUB_OWNER=(.+)$") { $owner = $Matches[1].Trim() }
        if ($_ -match "^GITHUB_REPO=(.+)$")  { $repo  = $Matches[1].Trim() }
    }
}

if (-not $token) {
    Write-Error "No GitHub token found in .env.local or `$env:GITHUB_TOKEN."
    exit 1
}

$headers = @{
    "Authorization"        = "Bearer $token"
    "Accept"               = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
    "User-Agent"           = "ZERO2HERO-Version-Publisher"
}
$baseUri = "https://api.github.com/repos/$owner/$repo"

$ref = Invoke-RestMethod -Uri "$baseUri/git/ref/heads/main" -Headers $headers -Method Get
$latestCommitSha = $ref.object.sha
$latestCommit = Invoke-RestMethod -Uri "$baseUri/git/commits/$latestCommitSha" -Headers $headers -Method Get
$baseTreeSha = $latestCommit.tree.sha

$filesToUpload = @(
    "package.json",
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    ".gitignore",
    "index.html",
    "preview.html",
    "README.md",
    "publish-version.ps1",
    "logo.png",
    "public/logo.png",
    "src/main.jsx",
    "src/index.css",
    "src/translations.js",
    "src/App.jsx",
    ".github/workflows/deploy.yml"
)

$treeItems = @()
foreach ($relPath in $filesToUpload) {
    $fullPath = Join-Path (Get-Location) $relPath
    if (Test-Path $fullPath) {
        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        $b64 = [Convert]::ToBase64String($bytes)
        $blobBody = @{ content = $b64; encoding = "base64" } | ConvertTo-Json -Compress
        $blob = Invoke-RestMethod -Uri "$baseUri/git/blobs" -Headers $headers -Method Post -Body $blobBody -ContentType "application/json"
        $treeItems += @{
            path = $relPath.Replace("\", "/")
            mode = "100644"
            type = "blob"
            sha  = $blob.sha
        }
    }
}

$treeBody = @{ base_tree = $baseTreeSha; tree = $treeItems } | ConvertTo-Json -Depth 5 -Compress
$newTree = Invoke-RestMethod -Uri "$baseUri/git/trees" -Headers $headers -Method Post -Body $treeBody -ContentType "application/json"

$commitBody = @{
    message = "release($Version): $Message"
    tree    = $newTree.sha
    parents = @($latestCommitSha)
} | ConvertTo-Json -Compress
$newCommit = Invoke-RestMethod -Uri "$baseUri/git/commits" -Headers $headers -Method Post -Body $commitBody -ContentType "application/json"

$updateRefBody = @{ sha = $newCommit.sha; force = $true } | ConvertTo-Json -Compress
Invoke-RestMethod -Uri "$baseUri/git/refs/heads/main" -Headers $headers -Method Patch -Body $updateRefBody -ContentType "application/json" | Out-Null

$releaseBody = @{
    tag_name         = $Version
    target_commitish = "main"
    name             = "$Version - $Message"
    body             = $Message
    draft            = $false
    prerelease       = $false
} | ConvertTo-Json -Compress
$release = Invoke-RestMethod -Uri "$baseUri/releases" -Headers $headers -Method Post -Body $releaseBody -ContentType "application/json"

Write-Host "Published $Version! Release URL: $($release.html_url)" -ForegroundColor Green
