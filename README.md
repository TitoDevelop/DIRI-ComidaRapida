# AC 9.1 — Framework UI y globalización

**Alumno:** José Luis Mas García  
**Asignatura:** DIRI — Universidad de Alicante

Esta versión parte de la **AC 8.1** con Redux Toolkit, Firebase Realtime Database y Firebase Authentication. Añade **Tailwind CSS**, **Headless UI** y dos idiomas (español e inglés).

## Puesta en marcha

```bash
npm install
npm run test
npm run build
npm run dev
```

El proyecto usa `tailwindcss` 3 con `postcss` y `autoprefixer`. Las clases de Tailwind aparecen en el selector de idiomas y el diálogo de confirmación. El diálogo es de `@headlessui/react` (no se ha recreado de cero). La aplicación mantiene el CSS anterior para no romper las vistas de las demás actividades.

## Cómo comprobar AC 9.1

1. Cambia con los botones **ES / EN** y comprueba que cambian la navegación, la carta, el formulario, los pedidos y el modal.
2. Recarga la página: el idioma escogido permanece guardado con `localStorage`.
3. Inicia sesión, haz un pedido y pulsa **Borrar**: Headless UI muestra un cuadro de confirmación con botones de cancelar o eliminar.
4. Verifica que cancelar no elimina nada; confirmar sí borra en Firebase.
5. Entra con un administrador: solo él ve la pestaña de stock.

## Archivos importantes

- `src/i18n/I18nContext.tsx` contiene diccionarios, selección y persistencia de idioma.
- `src/components/LanguageSwitcher.tsx` utiliza clases de Tailwind.
- `src/components/Orders.tsx` utiliza el diálogo accesible de Headless UI.
- `tailwind.config.cjs`, `postcss.config.cjs` y `src/style.css` integran Tailwind.

## GitHub Pages

Se conserva la base `/DIRI-ComidaRapida/`, el directorio `dist` y el workflow en `.github/workflows/deploy.yml`.  **Esta entrega cambia dependencias**, por lo que el lockfile anterior queda pendiente de regenerar con `npm install` en tu equipo. El workflow usa `npm install` en lugar de `npm ci` para no fallar con un lockfile antiguo. **Recomendado:** ejecuta `npm install`, incluye el `package-lock.json` generado en el commit y, después, vuelve al comando `npm ci --no-audit --no-fund` en el workflow para tener instalaciones reproducibles.

Por limitaciones de red del entorno de preparación, no se ha podido ejecutar la instalación, las pruebas ni la compilación completa. **Haz las comprobaciones anteriores antes del push.**

## Entrega al profesor

- URL pública en GitHub Pages.
- URL del código fuente en GitHub, con etiqueta `ac-9.1`.
- PDF con capturas reales (véase `evidencias/INSTRUCCIONES_AC9_1.md`).
