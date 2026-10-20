param(
    [Parameter(Mandatory=$false)]
    [string]$Version = "v1.0.1",

    [Parameter(Mandatory=$false)]
    [string]$Message = "Update ZERO2HERO Language Academy website"
)

Write-Host "Publishing version $Version : $Message" -ForegroundColor Cyan
git add -A
git commit -m "release($Version): $Message"
git tag -a $Version -m $Message -f
git push origin main --tags
Write-Host "Successfully pushed $Version to GitHub!" -ForegroundColor Green
