# DIRI — AC 8.1 · Autenticación, autorización y mantenimiento de sesión

**Alumno:** José Luis Mas García

Partimos de AC 7.1 con React, Redux Toolkit, Firebase Authentication, Realtime Database y GitHub Pages.

## Arranque

```bash
npm ci
npm run test
npm run build
npm run dev
```

Los datos públicos de configuración de Firebase están en `.env.production` (para GitHub Pages). Para trabajar en local crea `.env.local` a partir de `.env.example` y completa las variables `VITE_FIREBASE_*`. Nunca subas contraseñas ni claves de servicio.

## Firebase (configuración obligatoria)

1. En Firebase Console > Authentication > Sign-in method, **habilitar Correo electrónico/Contraseña**. La autenticación anónima antigua puede permanecer activada, pero esta versión no concede acceso a invitados anónimos.
2. En Realtime Database > Reglas, copia las reglas de `firebase-rules.json` y pulsa **Publicar**. Solo un usuario autenticado no anónimo puede acceder a su propia carpeta `pedidos/{uid}` o consultar su propio rol `roles/{uid}`.
3. Crea una cuenta de prueba mediante la interfaz de registro de la aplicación. Comprueba que aparece en Authentication > Usuarios.
4. Para probar el administrador, copia el **UID** de ese usuario en Authentication > Usuarios. Ve a Realtime Database > Datos y crea el nodo `roles/{UID}/admin` con valor booleano **true** (no texto). Después cierra sesión y vuelve a entrar para recargar el rol.
5. Si ya hay pedidos de las prácticas con usuario anónimo, seguirán asociados al UID antiguo. Las nuevas cuentas no los verán (separación intencionada).
6. En Authentication > Settings > Authorized domains, comprueba que esté autorizado `titodevelop.github.io` si el login desde GitHub Pages muestra `auth/unauthorized-domain`.

> Importante: las reglas protegen los pedidos y los roles, pero en esta práctica el stock es un estado local en Redux, no una tabla persistida. Su acceso visual se restringe al administrador, tal como pide el ejercicio. Para un sistema real con inventario privado se necesitaría almacenar y leer el stock desde un backend sujeto a reglas de autorización.

## Comprobaciones

- **Invitado**: ve carta y formulario de acceso, pero no stock, ni puede confirmar pedidos.
- **Usuario registrado**: puede iniciar sesión, hacer, ver, editar y borrar sus pedidos, pero no ve stock.
- **Administrador**: ve la pestaña Disponibilidad con cantidades.
- **Persistencia de sesión**: al recargar la pestaña, Firebase restaura la sesión.
- **Cerrar sesión**: desaparecen los pedidos personales y vuelve el formulario de acceso.
- **Redux DevTools**: los pedidos siguen ejecutando `fetchOrders`, `submitOrder`, etc., con acciones `pending/fulfilled/rejected`.

## Publicación

El workflow `.github/workflows/deploy.yml` ejecuta pruebas y compilación con `npm ci`, y despliega en GitHub Pages. Comprueba que **Actions > Publicar en GitHub Pages** termina en verde.

URL pública prevista después del despliegue: `https://titodevelop.github.io/DIRI-ComidaRapida/`.

## Entrega

El profesor pide URL pública, enlace al código fuente y PDF con capturas. En `evidencias/INSTRUCCIONES_AC8_1.md` se detallan las capturas recomendadas.
