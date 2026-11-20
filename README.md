# AC 5.4 — Pruebas de la aplicación de comida rápida

**Alumno:** José Luis Mas García  
**Asignatura:** Desarrollo de Interfaces Ricos para Internet

Continúa la aplicación de **AC 5.2**, usando `React Context` y carga diferida en la carta.

## Ejecutar

```bash
npm install
npm run dev
```

## Pruebas

```bash
npm run test
npm run build
```

`src/App.test.tsx` contiene tres pruebas con Vitest y React Testing Library:

1. Hay cuatro productos en la disponibilidad, con nombre y stock.
2. Al entrar en Pedir comida aparecen cuatro productos, una imagen y precios.
3. El precio de cinco hamburguesas pasa a 42,50 € y, al confirmar el pedido, el stock baja de 40 a 35.

`src/test/setup.ts` carga los matchers de jest-dom. `vite.config.ts` configura el entorno `jsdom`.

## Correcciones respecto al código anterior

Se han corregido dos referencias incorrectas detectadas en la versión AC 5.2: `foodItems` por `menuItems` en el componente `Foods` y el choque de nombres `sendOrder` en `FoodOrder`.

## Entrega

El PDF (página 310) pide **código fuente y una captura del resultado**. Guarda en `evidencias` una captura auténtica de la terminal después de ejecutar `npm run test`, y adjúntala en Moodle según el formato que aparezca allí.

Para conservar las versiones de cada práctica en GitHub, etiqueta este commit como `ac-5.4`.
