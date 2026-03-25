# Guía de Deployment - Zappar Web AR

El repositorio local está listo. Ahora necesitas completar estos pasos para deployas la app en Vercel.

## Paso 1: Crear repositorio en GitHub

1. Ir a https://github.com/new
2. Nombre del repositorio: `zappar-artwork-viewer` (o el que prefieras)
3. Descripción: "Web AR app for viewing and placing artworks using Zappar SDK"
4. Seleccionar **Public** (para que Vercel pueda acceder)
5. **NO inicializar** con README, .gitignore ni licencia (ya tenemos esos archivos)
6. Click en **Create repository**

## Paso 2: Conectar y pushear código a GitHub

Después de crear el repo, GitHub te mostrará las instrucciones. Ejecuta estos comandos en tu terminal desde la carpeta `zappar-web-ar`:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/zappar-artwork-viewer.git
git push -u origin main
```

**Nota**: Reemplaza `TU_USUARIO` con tu usuario de GitHub.

Si te pide autenticación:
- En Windows: Se abrirá una ventana del navegador para autenticar
- Si falla: Genera un Personal Access Token en GitHub (Settings → Developer settings → Personal access tokens) y úsalo como contraseña

## Paso 3: Verificar en GitHub

- Abre https://github.com/TU_USUARIO/zappar-artwork-viewer
- Verifica que todos los archivos estén ahí:
  - package.json
  - index.html
  - src/ (con ar-manager.js, firebase-manager.js, main.js, ui-manager.js)
  - vite.config.js
  - README.md

## Paso 4: Deployas en Vercel

### Opción A: Desde la interfaz web (MÁS FÁCIL)

1. Ir a https://vercel.com
2. Si no tienes cuenta, click en **Sign Up** (puedes usar GitHub)
3. Click en **Add New** → **Project**
4. Buscar `zappar-artwork-viewer` y click en **Import**
5. Vercel auto-detectará que es un proyecto Vite
6. Click en **Deploy**
7. Esperar a que termine (2-3 minutos)

### Opción B: Desde CLI (si prefieres terminal)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la carpeta zappar-web-ar
vercel
```

Sigue las preguntas interactivas y selecciona "Deploy" cuando termine.

## Paso 5: Obtener tu URL

Después del deploy:
- Vercel te dará una URL como: `https://zappar-artwork-viewer-abc123.vercel.app`
- Esa URL es tu app en vivo

## Verificación Final

Una vez deployado:

1. Abre la URL en tu teléfono
2. Acepta permisos de cámara
3. Deberías ver el status "Inicializando AR..."
4. Si aparece error de Firebase, es normal (aún no configuramos las credenciales)

## Próximos Pasos

Una vez que confirmes que la app está en Vercel:

- **Día 2**: Configurar credenciales de Zappar SDK en el código
- **Día 3-4**: Probar camera + plane detection en teléfono real
- **Día 5+**: Integración Firebase y carga de obras de arte

---

## Solución de problemas

### Error: "permission denied" al hacer git push
→ Verifica que tengas acceso al repositorio o crea un Personal Access Token

### Vercel dice "build failed"
→ Probablemente falta algún archivo. Verifica que `npm install` instale todas las dependencias correctamente

### La app abre pero dice "Firebase error"
→ Normal por ahora. Configuraremos Firebase en el Día 2

---

**Cuando hayas completado el deploy, comparte conmigo:**
- URL de Vercel
- URL del repositorio GitHub
- Screenshot de que la app abre en tu teléfono

Luego continuamos con la configuración de Zappar SDK (Día 2).
