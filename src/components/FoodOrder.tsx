import { useState } from 'react';
import { useFood } from '../store/hooks';

export default function FoodOrder() {
  const { selectedFood: food, sendOrder, showMenu, busy, ready } = useFood();
  const [quantity, setQuantity] = useState(1);
  const [ordered, setOrdered] = useState(false);
  if (!food) return null;
  const totalAmount = food.price * quantity;

  const handleOrder = async () => {
    if (quantity < 1 || quantity > food.quantity || ordered || busy) return;
    const success = await sendOrder(food.id, quantity);
    if (success) setOrdered(true);
  };

  return <section className="order-layout">
    <div className="order-photo"><img src={`${import.meta.env.BASE_URL}images/${food.image}`} alt={food.name}/></div>
    <div className="order-info"><span className="eyebrow">PEDIDO PARA RECOGER</span><h2>{food.name}</h2><p>{food.desc}</p>
    {ordered ? <div className="confirmation" role="status"><strong>¡Pedido confirmado y guardado!</strong><p>Se han reservado {quantity} unidad(es). Paga en efectivo cuando vengas a recogerlo.</p></div> : <>
      <label htmlFor="quantity">Cantidad (máximo {food.quantity})</label>
      <input id="quantity" type="number" min="1" max={food.quantity} value={quantity} onChange={e => setQuantity(Math.min(food.quantity, Math.max(1, Number(e.target.value) || 1)))}/>
      <div className="total"><span>Total a pagar en la recogida</span><strong>{totalAmount.toFixed(2)} €</strong></div>
      <button className="primary" disabled={busy || !ready} onClick={() => void handleOrder()}>{busy ? 'Guardando...' : 'Enviar pedido'}</button>
    </>}
    <button className="back" onClick={showMenu}>← Volver al menú</button></div>
  </section>;
}
