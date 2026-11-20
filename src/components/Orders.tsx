import { useState } from 'react';
import type { Order } from '../services/orders';

interface Props {
  orders: Order[];
  busy: boolean;
  onRefresh(): Promise<void>;
  onUpdate(order: Order, quantity: number): Promise<boolean>;
  onDelete(id: string): Promise<void>;
}
export default function Orders({ orders, busy, onRefresh, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  return <section className="orders"><div className="orders-heading"><h2>Mis pedidos guardados</h2><button disabled={busy} onClick={() => void onRefresh()}>Actualizar lista</button></div>
    {orders.length === 0 ? <p>Aún no tienes pedidos guardados.</p> :
      <ul className="orders-list">{orders.map(order => <li key={order.id}>
        <div><strong>{order.foodName}</strong><small>{new Date(order.createdAt).toLocaleString('es-ES')} · {order.id.slice(-6)}</small></div>
        {editing === order.id ? <div className="order-actions"><label>Unidades <input aria-label={`Editar cantidad de ${order.foodName}`} type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))}/></label>
          <button disabled={busy || !Number.isInteger(quantity) || quantity < 1} onClick={async () => { if (await onUpdate(order, quantity)) setEditing(null); }}>Guardar</button><button onClick={() => setEditing(null)}>Cancelar</button></div> :
          <div className="order-actions"><span>{order.quantity} ud. · {order.total.toFixed(2)} €</span>
            <button disabled={busy} onClick={() => { setEditing(order.id); setQuantity(order.quantity); }}>Editar</button>
            <button disabled={busy} onClick={() => void onDelete(order.id)}>Borrar</button></div>}
      </li>)}</ul>}
    <p className="orders-note">Los pedidos se guardan en Firebase. La disponibilidad de la carta es una demostración local y se reinicia al recargar.</p>
  </section>;
}
