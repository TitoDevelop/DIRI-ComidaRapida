import { useState } from 'react';
import type { MenuItem } from '../entities/entities';

interface FoodOrderProps {
  food: MenuItem;
  onQuantityUpdated: (id: number, quantity: number) => void;
  onReturnToMenu: () => void;
}

export default function FoodOrder({ food, onQuantityUpdated, onReturnToMenu }: FoodOrderProps) {
  const [quantity, setQuantity] = useState(1);
  const [ordered, setOrdered] = useState(false);
  const totalAmount = food.price * quantity;

  const sendOrder = () => {
    if (quantity < 1 || quantity > food.quantity || ordered) return;
    onQuantityUpdated(food.id, quantity);
    setOrdered(true);
  };

  return (
    <section className="order-layout">
      <div className="order-photo"><img src={`/images/${food.image}`} alt={food.name} /></div>
      <div className="order-info">
        <span className="eyebrow">PEDIDO PARA RECOGER</span><h2>{food.name}</h2><p>{food.desc}</p>
        {ordered ? (
          <div className="confirmation" role="status"><strong>¡Pedido confirmado!</strong><p>Hemos reservado {quantity} unidad(es). Paga en efectivo cuando vengas a recogerlo.</p></div>
        ) : (
          <><label htmlFor="quantity">Cantidad (máximo {food.quantity})</label>
          <input id="quantity" type="number" min="1" max={food.quantity} value={quantity}
            onChange={e => setQuantity(Math.min(food.quantity, Math.max(1, Number(e.target.value) || 1)))} />
          <div className="total"><span>Total a pagar en la recogida</span><strong>{totalAmount.toFixed(2)} €</strong></div>
          <button className="primary" onClick={sendOrder}>Enviar pedido</button></>
        )}
        <button className="back" onClick={onReturnToMenu}>← Volver al menú</button>
      </div>
    </section>
  );
}
