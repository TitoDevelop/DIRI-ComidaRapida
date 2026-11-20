import { useState } from 'react';
import { useFood } from '../context/FoodContext';

export default function FoodOrder() {
  // El producto, el envío del pedido y la navegación se obtienen de Context.
  const { selectedFood: food, sendOrder, showMenu } = useFood();
  const [quantity, setQuantity] = useState(1);
  const [ordered, setOrdered] = useState(false);
  if (!food) return null;
  const totalAmount = food.price * quantity;

  const handleOrderClick = () => {
    if (quantity < 1 || quantity > food.quantity || ordered) return;
    if (sendOrder(food.id, quantity)) setOrdered(true);
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
          <button className="primary" onClick={handleOrderClick}>Enviar pedido</button></>
        )}
        <button className="back" onClick={showMenu}>← Volver al menú</button>
      </div>
    </section>
  );
}
