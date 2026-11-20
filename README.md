# AC 5.2 — Contexto de React

**Alumno:** José Luis Mas García

Esta es la continuación de **AC 5.1**. El diseño y el proceso de compra siguen siendo los mismos, pero se sustituye el paso de información entre componentes por React Context, como pide el profesor en la diapositiva 275.

## Ejecutar

```bash
npm install
npm run dev
npm run build
```

## Qué he cambiado

- `src/context/FoodContext.tsx`: almacena el menú, el stock, el producto seleccionado y las acciones de compra.
- `App.tsx` contiene el `FoodProvider` y utiliza `useFood()`.
- `Foods.tsx` obtiene los productos y la función de selección del contexto, sin props.
- `FoodOrder.tsx` obtiene el producto y actualiza el stock usando el contexto, sin props.
- Se mantiene la carga diferida de `Foods` de la actividad 5.1.

Para comprobarlo, haz un pedido de 5 hamburguesas y vuelve a **Disponibilidad**. El stock debe cambiar de 40 a 35. Si recargas, se reinicia el stock porque aún no hemos añadido persistencia.

## GitHub

Actualiza **el mismo repositorio** de AC 5.1 y crea un nuevo commit. Conserva el tag `ac-5.1` para mantener la versión anterior.

El PDF no exige capturas adicionales específicamente para AC 5.2; revisa también la tarea de Moodle.
