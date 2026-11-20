import { lazy, Suspense } from 'react';
import FoodOrder from './components/FoodOrder';
import { FoodProvider, useFood } from './context/FoodContext';

// AC 5.1: Foods se carga solamente al entrar en la vista de la carta.
const Foods = lazy(() => import('./components/Foods'));
function Shop() {
  // AC 5.2: App ya no pasa el estado ni las acciones por props.
  const { menuItems, view, selectedFood, showStock, showMenu } = useFood();
  return (
    <div className="site">
      <header className="topbar"><div className="brand"><span className="brand-mark">LP.</span><span>LA PARADA <small>COMIDA PARA LLEVAR</small></span></div><span className="header-note">Recogida en local · Pago en efectivo</span></header>
      <main className="container">
        <section className="intro"><div><span className="eyebrow">HECHO AL MOMENTO</span><h1>Comida rica.<br/><em>Sin complicaciones.</em></h1><p>Escoge lo que más te guste, reserva las unidades y ven a recoger tu pedido.</p></div><span className="stamp">PARA<br/>LLEVAR <b>↗</b></span></section>
        <nav className="tabs" aria-label="Vistas de la tienda">
          <button className={view === 'stock' ? 'active' : ''} onClick={showStock}>Disponibilidad</button>
          <button className={view !== 'stock' ? 'active' : ''} onClick={showMenu}>Pedir comida</button>
        </nav>
        {view === 'stock' && <section><div className="section-heading"><div><span className="eyebrow">EN TIEMPO REAL</span><h2>Productos disponibles</h2></div><p>El stock se actualiza cuando confirmas un pedido.</p></div>
          <div className="availability">{menuItems.map(item => <div className="availability-row" key={item.id}><span className="item-name">{item.name}</span><span className="count">{item.quantity} unidades</span></div>)}</div>
          <button className="primary start" onClick={showMenu}>Ver la carta →</button></section>}
        {view === 'menu' && <Suspense fallback={<p role="status" className="loading">Cargando carta...</p>}><Foods /></Suspense>}
        {view === 'order' && selectedFood && <FoodOrder key={selectedFood.id} />}
      </main>
      <footer>Proyecto DIRI · AC 5.4 · José Luis Mas García</footer>
    </div>
  );
}

export default function App() {
  return <FoodProvider><Shop /></FoodProvider>;
}
