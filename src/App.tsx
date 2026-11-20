import { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppDispatch, useFood } from './store/hooks';
import { fetchOrders, resetSession } from './store/foodSlice';
import { AuthProvider, useAuth } from './auth/AuthContext';
import AuthForm from './components/AuthForm';
import FoodOrder from './components/FoodOrder';
import Orders from './components/Orders';
import ErrorBoundary from './components/ErrorBoundary';
import { configured } from './firebase/client';

const Foods = lazy(() => import('./components/Foods'));
function Shop() {
  const dispatch = useAppDispatch();
  const { user, isAdmin, loading: authLoading, error: authError, logout } = useAuth();
  const { menuItems, orders, view, selectedFood, showStock, showMenu, busy, ready, notice, error, refreshOrders, updateOrder, removeOrder } = useFood();
  const authenticated = Boolean(user);

  useEffect(() => {
    dispatch(resetSession());
    if (configured && user) {
      const request = dispatch(fetchOrders());
      return () => { request.abort(); };
    }
  }, [dispatch, user?.uid]);

  // La vista de stock nunca aparece a usuarios sin rol administrador.
  const visibleView = isAdmin ? view : (view === 'order' ? 'order' : 'menu');
  return <div className="site">
    <header className="topbar"><div className="brand"><span className="brand-mark">LP.</span><span>LA PARADA <small>COMIDA PARA LLEVAR</small></span></div>
      <div className="user-bar"><span>{user ? user.email : 'Invitado'}{isAdmin ? ' · Administrador' : ''}</span>{user && <button className="logout" onClick={() => void logout()}>Salir</button>}</div>
    </header>
    <main className="container">
      <section className="intro"><div><span className="eyebrow">HECHO AL MOMENTO</span><h1>Comida rica.<br/><em>Sin complicaciones.</em></h1><p>Escoge lo que más te guste, reserva las unidades y ven a recoger tu pedido.</p></div><span className="stamp">PARA<br/>LLEVAR <b>↗</b></span></section>
      {!configured && <p className="failure" role="alert">Falta la configuración de Firebase. Comprueba las variables de entorno.</p>}
      {authLoading && <p className="loading" role="status">Comprobando la sesión...</p>}
      {!authLoading && !authenticated && <AuthForm />}
      {authenticated && authError && <p className="failure" role="alert">{authError}</p>}
      {authenticated && notice && <p className="loading" role="status">{notice}</p>}
      {authenticated && error && <p className="failure" role="alert">{error}</p>}
      {!authLoading && <>
        <nav className="tabs" aria-label="Vistas de la tienda">
          {isAdmin && <button className={visibleView === 'stock' ? 'active' : ''} onClick={showStock}>Disponibilidad (admin)</button>}
          <button className={visibleView !== 'stock' ? 'active' : ''} onClick={showMenu}>Pedir comida</button>
        </nav>
        {visibleView === 'stock' && isAdmin && <section><div className="section-heading"><div><span className="eyebrow">SOLO ADMINISTRACIÓN</span><h2>Productos disponibles</h2></div><p>Las reservas de esta sesión actualizan la disponibilidad.</p></div>
          <div className="availability">{menuItems.map(item => <div className="availability-row" key={item.id}><span className="item-name">{item.name}</span><span className="count">{item.quantity} unidades</span></div>)}</div>
          <button className="primary start" onClick={showMenu}>Ver la carta →</button></section>}
        {visibleView === 'menu' && <Suspense fallback={<p role="status" className="loading">Cargando carta...</p>}><Foods /></Suspense>}
        {visibleView === 'order' && selectedFood && (authenticated ? <FoodOrder key={selectedFood.id}/> : <AuthForm />)}
        {authenticated && configured && <Orders orders={orders} busy={busy} onRefresh={refreshOrders} onUpdate={updateOrder} onDelete={removeOrder}/>}
        {authenticated && configured && !ready && !busy && <button onClick={() => void refreshOrders()}>Reintentar conexión</button>}
      </>}
    </main>
    <footer>Proyecto DIRI · AC 8.1 · José Luis Mas García</footer>
  </div>;
}
export default function App() {
  return <ErrorBoundary><Provider store={store}><AuthProvider><Shop /></AuthProvider></Provider></ErrorBoundary>;
}
