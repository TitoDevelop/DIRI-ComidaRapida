# AC 7.1 — Redux Toolkit (DIRI)

**Alumno:** José Luis Mas García

Proyecto construido sobre la última versión proporcionada de **DIRI-ComidaRapida**, con Firebase, CRUD, pruebas y despliegue por GitHub Actions.

## Qué cambia en AC 7.1

- `src/store/foodSlice.ts`: estado de carta, navegación y pedidos con Redux Toolkit.
- `src/store/store.ts`: `configureStore` y middleware para registrar rechazos.
- `src/store/hooks.ts`: hooks tipados para acceder al store desde los componentes.
- Se elimina el anterior `FoodContext` para evitar dos fuentes distintas de estado.
- `createAsyncThunk` para consultar, crear, editar y borrar pedidos en **Firebase Realtime Database**.
- Seguimos mostrando mensajes de espera, de confirmación y de error; la carta conserva la carga diferida.
- Se mantiene `ErrorBoundary`, el diseño original y las pruebas de la aplicación.

## Comprobación en local

```bash
npm install
npm run test
npm run build
npm run dev
```

Comprueba el flujo: seleccionar producto, pedir varias unidades, ver descuento de stock, consultar pedidos, editar y borrar. Verifica en Realtime Database que los cambios se han guardado. Las operaciones de Firebase necesitan red y reglas de acceso correctas.

## Firebase

La app usa `VITE_FIREBASE_*` desde `.env.local` en desarrollo y `.env.production` al compilar para GitHub Pages. **No subas archivos con claves privadas o credenciales de cuenta de servicio.** La configuración web pública de Firebase no equivale a acceso administrativo: las reglas protegen los datos bajo `pedidos/$uid`.

## GitHub Pages

El repositorio debe llamarse `DIRI-ComidaRapida`. Vite utiliza `base: '/DIRI-ComidaRapida/'` en compilación y `/` al ejecutar Vite local. Se conservan las URLs de imágenes usando `import.meta.env.BASE_URL`.

En Settings > Pages selecciona **GitHub Actions**. El workflow `.github/workflows/deploy.yml` instala dependencias, ejecuta pruebas, compila y publica `dist`. Si cambias el nombre del repositorio, ajusta `base` en `vite.config.ts`.

## Entrega

Según la actividad AC 7.1 (página 415), hay que entregar **URL pública**, **repositorio de código** y **PDF con capturas de funcionamiento**. En `evidencias/INSTRUCCIONES_AC7_1.md` se describen capturas recomendadas.
