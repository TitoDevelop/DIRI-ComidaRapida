# AC 6.2 — CRUD REST con Firebase

**Alumno:** José Luis Mas García  
**Asignatura:** DIRI · Universidad de Alicante

Continuación de la aplicación de comida rápida. Esta entrega utiliza Firebase Realtime Database y Authentication anónima para guardar, consultar, editar y borrar pedidos. Añade registros de actividad, gestión de errores en componentes y mensajes de carga durante las operaciones asíncronas.

## 1. Probar en local

1. El archivo `.env.local` está preparado para el proyecto Firebase `diri-comidarapida`. Está excluido del repositorio por `.gitignore`.
2. Comprueba en Firebase que está habilitada la autenticación **Anónima**, que existe Realtime Database y que sus reglas protegen `pedidos/$uid`.
3. Ejecuta:

```bash
npm install
npm run dev
```

4. Abre la dirección local de Vite. En la vista inicial debería aparecer «Pedidos cargados correctamente».
5. Haz un pedido de cinco hamburguesas. Debe aparecer la confirmación y el pedido debajo de la carta.
6. En Firebase Console > Realtime Database > Datos comprueba que existe `pedidos/<uid>/<id-pedido>`.
7. Prueba editar la cantidad y borrar el pedido; verifica esos cambios en Firebase.
8. Ejecuta las pruebas y compila:

```bash
npm run test
npm run build
```

## 2. Configuración de Firebase

Este proyecto usa la configuración pública de Firebase Web SDK que facilitaste. La configuración está en `.env.production` para que GitHub Pages pueda compilar con GitHub Actions. Las variables `VITE_*` se incluyen en el bundle web: **no son secretos ni deben contener contraseñas, credenciales de servicio ni tokens privados**. La protección de los datos depende de Authentication y las reglas de Realtime Database.

Reglas de Realtime Database para esta práctica:

```json
{
  "rules": {
    "pedidos": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```

**Nota:** la configuración de Firebase expuesta al cliente no reemplaza unas reglas de seguridad correctas.

## 3. Qué realiza cada archivo

- `src/firebase/client.ts`: inicializa Firebase, Authentication y Realtime Database.
- `src/services/orders.ts`: operaciones de lectura, creación, edición y borrado de pedidos mediante SDK Firebase.
- `src/services/logger.ts`: registro de acciones y errores en consola.
- `src/context/FoodContext.tsx`: estado compartido y funciones asíncronas; solo confirma pedidos después del guardado remoto.
- `src/components/Orders.tsx`: listado editable y eliminación de pedidos persistentes.
- `src/components/ErrorBoundary.tsx`: captura de errores de renderizado de React; los fallos asíncronos se manejan con `try/catch` y avisos visibles.

La disponibilidad del catálogo se actualiza en memoria como en la práctica anterior, **pero no persiste después de recargar**. Lo que se persiste en Firebase es el historial de pedidos. Tampoco se simula un pago online: se paga en efectivo al recoger.

## 4. Publicar

Se conserva el workflow `.github/workflows/deploy.yml`. Tras hacer push a `main`, comprueba el resultado en GitHub Actions y la web publicada. Si las pruebas o la compilación fallan, no publiques hasta corregirlos.

## 5. Entrega

El profesor pide URL de la aplicación en producción, enlace a GitHub y PDF con capturas reales. Guía en `evidencias/INSTRUCCIONES_AC6_2.md`.
