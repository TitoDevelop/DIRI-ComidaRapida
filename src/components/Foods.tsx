import { useFood } from '../store/hooks';
import { useAuth } from '../auth/AuthContext';

export default function Foods() {
  // La carta utiliza Redux; las cantidades de stock solo se muestran a administradores.
  const { menuItems, chooseFood } = useFood();
  const { user, isAdmin } = useAuth();
  return (
    <section>
      <div className="section-heading"><div><span className="eyebrow">LA CARTA</span><h2>¿Qué te apetece hoy?</h2></div><p>Elige un producto para hacer tu pedido.</p></div>
      <div className="food-grid">
        {menuItems.map(item => (
          <article className="food-card" key={item.id}>
            <img src={`${import.meta.env.BASE_URL}images/${item.image}`} alt={item.name} />
            <div className="card-body"><div className="card-header"><h3>{item.name}</h3><strong>{item.price.toFixed(2)} €</strong></div>
              <p>{item.desc}</p><div className="card-footer"><span className={item.quantity > 0 ? 'stock' : 'soldout'}>{isAdmin ? `Disponibles: ${item.quantity}` : 'Para recoger'}</span>
                <button disabled={!user || item.quantity === 0} onClick={() => chooseFood(item.id)}>{user ? 'Elegir' : 'Inicia sesión'}</button></div></div>
          </article>
        ))}
      </div>
    </section>
  );
}
