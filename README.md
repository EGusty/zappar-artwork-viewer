# Zappar Web AR - Artwork Viewer

App Web AR para visualizar obras de arte usando Zappar SDK.

## Setup Rápido

### 1. Clonar y preparar

```bash
cd zappar-artwork-viewer
npm install
```

### 2. Obtener credenciales Zappar

1. Ir a https://console.zappar.io
2. Crear cuenta (gratis)
3. Crear nuevo proyecto
4. Copiar el **Zappar API Token**

### 3. Configurar Firebase

El proyecto ya usa Firebase (ar-artwork-viewer). Las credenciales están en `src/firebase-manager.js`.

### 4. Desarrollo

```bash
npm run dev
```

Accede a `https://localhost:3000` en tu teléfono (necesita HTTPS y conexión a la misma red).

### 5. Build para producción

```bash
npm run build
```

Los archivos se generan en `dist/`.

## Estructura del Proyecto

```
src/
├── main.js              # Punto de entrada
├── firebase-manager.js  # Conexión a Firebase
├── ar-manager.js        # Lógica AR (Zappar)
└── ui-manager.js        # Interfaz de usuario
```

## Deploy a Vercel (GRATIS)

1. Crear cuenta en https://vercel.com
2. Conectar este repositorio GitHub
3. Vercel auto-deploya en cada push

## Próximos Pasos

- [ ] Día 1-2: Setup completo + Deploy a Vercel
- [ ] Día 3-4: Integración Firebase completa
- [ ] Día 5-6: Detección de paredes mejorada
- [ ] Día 7-14: Testing, refinamiento y publicación

## Soporte

Zappar Docs: https://docs.zappar.com
Three.js Docs: https://threejs.org/docs
