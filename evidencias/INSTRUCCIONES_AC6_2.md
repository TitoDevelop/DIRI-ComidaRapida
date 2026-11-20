# Evidencias para AC 6.2

Haz capturas reales, comprobando que la base de datos contiene el pedido. Después reunirlas en un PDF:

1. `01-carga.png`: aplicación con mensaje de carga / conexión.
2. `02-confirmacion.png`: pedido guardado y confirmación en pantalla.
3. `03-firebase.png`: Realtime Database > Datos, ruta `pedidos/<uid>/<id>` y campos del pedido (oculta si quieres los identificadores completos).
4. `04-edicion.png`: pedido editado y cantidad actualizada en Firebase.
5. `05-borrado.png`: pedido eliminado de Firebase.
6. `06-logging.png`: consola DevTools con registros de lectura, creación, edición y borrado.
7. `07-error.png`: prueba de error controlado (por ejemplo, desactivar temporalmente la conexión antes de crear un pedido), con aviso de error visible. React ErrorBoundary maneja específicamente errores durante renderizado.

Entrega el PDF de capturas, la URL pública y el enlace al repositorio. Recupera siempre la conexión al acabar la prueba.
