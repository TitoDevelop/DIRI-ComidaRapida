import { lazy, Suspense, useState } from 'react';
import FoodOrder from './components/FoodOrder';
import type { MenuItem } from './entities/entities';

// AC 5.1: Foods se carga solamente al entrar en la vista de la carta.
const Foods = lazy(() => import('./components/Foods'));
const initialMenu: MenuItem[] = [
  { id: 1, name: 'Hamburguesa de pollo', quantity: 40, desc: 'Pollo crujiente, lechuga, tomate y mayonesa casera.', price: 8.5, image: 'pollo.svg' },
  { id: 2, name: 'Patatas de la casa', quantity: 35, desc: 'Patatas gajo con nuestra salsa especial.', price: 4.2, image: 'patatas.svg' },
  { id: 3, name: 'Pizza margarita', quantity: 18, desc: 'Tomate, mozzarella y albahaca fresca.', price: 9.9, image: 'pizza.svg' },
  { id: 4, name: 'Bocadillo vegetal', quantity: 24, desc: 'Pan tostado, aguacate, huevo y rúcula.', price: 7.4, image: 'bocadillo.svg' }
];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);
  const [view, setView] = useState<'stock' | 'menu' | 'order'>('stock');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedFood = menuItems.find(item => item.id === selectedId);

  // AC 5.1: FoodOrder comunica al padre el producto y las unidades elegidas.
  const handleQuantityUpdated = (id: number, quantity: number) => {
    setMenuItems(items => items.map(item => item.id === id
      ? { ...item, quantity: Math.max(0, item.quantity - quantity) }
      : item));
  };

  const chooseFood = (food: MenuItem) => { setSelectedId(food.id); setView('order'); };
  return (
    <div className="site">
      <header className="topbar"><div className="brand"><span className="brand-mark">LP.</span><span>LA PARADA <small>COMIDA PARA LLEVAR</small></span></div><span className="header-note">Recogida en local · Pago en efectivo</span></header>
      <main className="container">
        <section className="intro"><div><span className="eyebrow">HECHO AL MOMENTO</span><h1>Comida rica.<br/><em>Sin complicaciones.</em></h1><p>Escoge lo que más te guste, reserva las unidades y ven a recoger tu pedido.</p></div><span className="stamp">PARA<br/>LLEVAR <b>↗</b></span></section>
        <nav className="tabs" aria-label="Vistas de la tienda">
          <button className={view === 'stock' ? 'active' : ''} onClick={() => setView('stock')}>Disponibilidad</button>
          <button className={view !== 'stock' ? 'active' : ''} onClick={() => { setSelectedId(null); setView('menu'); }}>Pedir comida</button>
        </nav>
        {view === 'stock' && <section><div className="section-heading"><div><span className="eyebrow">EN TIEMPO REAL</span><h2>Productos disponibles</h2></div><p>El stock se actualiza cuando confirmas un pedido.</p></div>
          <div className="availability">{menuItems.map(item => <div className="availability-row" key={item.id}><span className="item-name">{item.name}</span><span className="count">{item.quantity} unidades</span></div>)}</div>
          <button className="primary start" onClick={() => setView('menu')}>Ver la carta →</button></section>}
        {view === 'menu' && <Suspense fallback={<p role="status" className="loading">Cargando carta...</p>}><Foods foodItems={menuItems} onChooseFood={chooseFood} /></Suspense>}
        {view === 'order' && selectedFood && <FoodOrder key={selectedFood.id} food={selectedFood} onQuantityUpdated={handleQuantityUpdated} onReturnToMenu={() => { setSelectedId(null); setView('menu'); }} />}
      </main>
      <footer>Proyecto DIRI · AC 5.1 · José Luis Mas García</footer>
    </div>
  );
}
