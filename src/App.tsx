import { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppDispatch } from './store/hooks';
import { fetchOrders } from './store/foodSlice';
import FoodOrder from './components/FoodOrder';
import Orders from './components/Orders';
import ErrorBoundary from './components/ErrorBoundary';
import { useFood } from './store/hooks';
import { configured } from './firebase/client';

const Foods = lazy(() => import('./components/Foods'));
function Shop() {
  const dispatch = useAppDispatch();
  useEffect(() => { if (configured) void dispatch(fetchOrders()); }, [dispatch]);
  const { menuItems, orders, view, selectedFood, showStock, showMenu, busy, ready, notice, error, refreshOrders, updateOrder, removeOrder } = useFood();
  return <div className="site">
    <header className="topbar"><div className="brand"><span className="brand-mark">LP.</span><span>LA PARADA <small>COMIDA PARA LLEVAR</small></span></div><span className="header-note">Recogida en local · Pago en efectivo</span></header>
    <main className="container">
      <section className="intro"><div><span className="eyebrow">HECHO AL MOMENTO</span><h1>Comida rica.<br/><em>Sin complicaciones.</em></h1><p>Escoge lo que más te guste, reserva las unidades y ven a recoger tu pedido.</p></div><span className="stamp">PARA<br/>LLEVAR <b>↗</b></span></section>
      {!configured && <p className="failure" role="alert">Falta configurar Firebase. Revisa el archivo .env.local y reinicia Vite.</p>}
      {notice && <p className="loading" role="status">{notice}</p>}
      {error && <p className="failure" role="alert">{error}</p>}
      <nav className="tabs" aria-label="Vistas de la tienda">
        <button className={view === 'stock' ? 'active' : ''} onClick={showStock}>Disponibilidad</button>
        <button className={view !== 'stock' ? 'active' : ''} onClick={showMenu}>Pedir comida</button>
      </nav>
      {view === 'stock' && <section><div className="section-heading"><div><span className="eyebrow">EN TIEMPO REAL</span><h2>Productos disponibles</h2></div><p>Las reservas de esta sesión actualizan la disponibilidad.</p></div>
        <div className="availability">{menuItems.map(item => <div className="availability-row" key={item.id}><span className="item-name">{item.name}</span><span className="count">{item.quantity} unidades</span></div>)}</div>
        <button className="primary start" onClick={showMenu}>Ver la carta →</button></section>}
      {view === 'menu' && <Suspense fallback={<p role="status" className="loading">Cargando carta...</p>}><Foods/></Suspense>}
      {view === 'order' && selectedFood && <FoodOrder key={selectedFood.id}/>}
      {configured && <Orders orders={orders} busy={busy} onRefresh={refreshOrders} onUpdate={updateOrder} onDelete={removeOrder}/>}
      {configured && !ready && !busy && <button onClick={() => void refreshOrders()}>Reintentar conexión</button>}
    </main>
    <footer>Proyecto DIRI · AC 7.1 · José Luis Mas García</footer>
  </div>;
}
export default function App() {
  return <ErrorBoundary><Provider store={store}><Shop/></Provider></ErrorBoundary>;
}
