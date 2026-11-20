# DIRI — AC 5.5: Despliegue en GitHub Pages

Alumno: José Luis Mas García

Esta versión de la tienda de comida rápida mantiene las actividades anteriores (AC 5.1, AC 5.2 y AC 5.4) y añade la publicación automática mediante GitHub Actions.

## Ejecutar y comprobar

```bash
npm install
npm run test
npm run build
npm run dev
```

## Publicar en GitHub Pages

1. Subir esta versión a la rama `main` de `TitoDevelop/DIRI-ComidaRapida`.
2. Entrar en **Settings > Pages**.
3. En **Build and deployment**, cambiar **Source** a **GitHub Actions**.
4. Entrar en la pestaña **Actions** y comprobar que el workflow `Publicar en GitHub Pages` termina en verde.
5. Abrir la URL publicada y revisar que aparecen las imágenes, que la carta carga y que el pedido descuenta stock.

El workflow se ejecuta automáticamente con cada push a `main`, y también se puede lanzar manualmente desde Actions.

**URL prevista** (solo funcionará tras publicar con éxito):
https://titodevelop.github.io/DIRI-ComidaRapida/

**Repositorio**:
https://github.com/TitoDevelop/DIRI-ComidaRapida

## Cambios de esta actividad

- `vite.config.ts`: base de Vite ajustada a la ruta del repositorio al compilar.
- `.github/workflows/deploy.yml`: instala dependencias, ejecuta pruebas, compila y publica.
- `Foods.tsx` y `FoodOrder.tsx`: rutas de imágenes adaptadas a la ruta base de Vite.

Si el repositorio cambia de nombre, modifica la ruta `/DIRI-ComidaRapida/` en `vite.config.ts`.

## Entrega

El profesor solicita dos URLs: la pública del frontend y la del repositorio. No se exigen capturas expresamente en AC 5.5.
