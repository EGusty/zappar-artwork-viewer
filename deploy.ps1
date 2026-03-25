# Script de Deployment Automático - Zappar Web AR
# Este script crea el repo en GitHub y deploya a Vercel automáticamente
# Solo ejecuta este script desde PowerShell

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Zappar Web AR - Deployment Automático" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Git
Write-Host "[1/5] Verificando Git..." -ForegroundColor Yellow
git --version > $null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Git no está instalado. Instálalo desde https://git-scm.com/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Git detectado" -ForegroundColor Green

# Verificar GitHub CLI
Write-Host "[2/5] Verificando GitHub CLI..." -ForegroundColor Yellow
gh --version > $null
if ($LASTEXITCODE -ne 0) {
    Write-Host "GitHub CLI no está instalado. Instalando..." -ForegroundColor Yellow
    winget install --id GitHub.cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: No se pudo instalar GitHub CLI. Instálalo manualmente desde https://cli.github.com/" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✓ GitHub CLI disponible" -ForegroundColor Green

# Verificar autenticación en GitHub
Write-Host "[3/5] Verificando autenticación GitHub..." -ForegroundColor Yellow
gh auth status > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Necesitas autenticarte en GitHub..." -ForegroundColor Yellow
    gh auth login
}
Write-Host "✓ Autenticado en GitHub" -ForegroundColor Green

# Crear repositorio en GitHub
Write-Host "[4/5] Creando repositorio en GitHub..." -ForegroundColor Yellow
$repoName = "zappar-artwork-viewer"
$repoUrl = ""

# Verificar si ya existe
gh repo view "$repoName" 2> $null
if ($LASTEXITCODE -eq 0) {
    Write-Host "El repositorio ya existe. Usando: $repoName" -ForegroundColor Green
    $repoUrl = "$(gh repo view $repoName --json nameWithOwner -q .nameWithOwner)"
} else {
    Write-Host "Creando repositorio: $repoName..." -ForegroundColor Cyan
    gh repo create $repoName --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: No se pudo crear el repositorio" -ForegroundColor Red
        exit 1
    }
    $repoUrl = "$(gh repo view $repoName --json nameWithOwner -q .nameWithOwner)"
}

Write-Host "✓ Repositorio creado/actualizado: https://github.com/$repoUrl" -ForegroundColor Green

# Verificar Node.js (necesario para verificar Vercel CLI)
Write-Host "[5/5] Verificando Node.js..." -ForegroundColor Yellow
node --version > $null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js no está instalado" -ForegroundColor Red
    Write-Host "Descárgalo desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js detectado" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "✓ REPOSITORIO LISTO EN GITHUB" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "GitHub URL: https://github.com/$repoUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ahora necesitas deployar a Vercel..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Opción A - Automático (recomendado):" -ForegroundColor Yellow
Write-Host "  Ejecuta: npm install -g vercel" -ForegroundColor White
Write-Host "  Luego:   vercel" -ForegroundColor White
Write-Host ""
Write-Host "Opción B - Web (más fácil):" -ForegroundColor Yellow
Write-Host "  1. Abre https://vercel.com" -ForegroundColor White
Write-Host "  2. Sign up con GitHub" -ForegroundColor White
Write-Host "  3. Click 'Add New' → 'Project'" -ForegroundColor White
Write-Host "  4. Busca y selecciona '$repoName'" -ForegroundColor White
Write-Host "  5. Click 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "Cuando hayas deployado en Vercel, comparte conmigo:" -ForegroundColor Cyan
Write-Host "  - URL de Vercel (ej: https://zappar-artwork-viewer-xxx.vercel.app)" -ForegroundColor White
Write-Host "  - Screenshot de la app abriendo en tu teléfono" -ForegroundColor White
