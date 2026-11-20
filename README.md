# AC 5.1 — Comida rápida online

**Alumno:** José Luis Mas García  
**Asignatura:** Desarrollo de Interfaces Ricos para Internet (DIRI)

Aplicación de recogida de comida hecha con React y TypeScript. Los productos se pueden consultar en la vista de disponibilidad y pedir en la carta. Se paga en efectivo al recoger el pedido.

## Ejecutar

```bash
npm install
npm run dev
```

Para comprobar la compilación:

```bash
npm run build
```

## Qué se ha realizado

- Entidad `MenuItem` en `src/entities/entities.ts`.
- Vista de disponibilidad con nombre y stock.
- Vista de carta con cuatro productos e imágenes propias.
- `Foods` cargado con `React.lazy` y `Suspense`.
- `FoodOrder` permite cambiar cantidad y ver cómo cambia el precio.
- Al confirmar, `FoodOrder` avisa a `App` mediante `onQuantityUpdated`; `App` descuenta el stock.
- Confirmación del pedido y vuelta a la carta. Pago solamente en efectivo durante la recogida.

La gestión del carrito no se incluye porque es opcional. El contexto de React corresponde a **AC 5.2**, y lo incorporaremos después sobre este mismo proyecto.

## Capturas para Moodle

La diapositiva 264 pide capturas del proceso de compra y otra que muestre la carga diferida. Consulta `evidencias/INSTRUCCIONES.md`. Haz capturas reales de la aplicación ejecutándose, no de ilustraciones.

## Código

`App.tsx` guarda los productos y el stock. `Foods.tsx` muestra la carta. `FoodOrder.tsx` comunica el pedido al componente padre. Las imágenes están en `public/images`.
