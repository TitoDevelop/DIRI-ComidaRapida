import type { MenuItem } from '../entities/entities';

interface FoodsProps {
  foodItems: MenuItem[];
  onChooseFood: (food: MenuItem) => void;
}

export default function Foods({ foodItems, onChooseFood }: FoodsProps) {
  return (
    <section>
      <div className="section-heading"><div><span className="eyebrow">LA CARTA</span><h2>¿Qué te apetece hoy?</h2></div><p>Elige un producto para hacer tu pedido.</p></div>
      <div className="food-grid">
        {foodItems.map(item => (
          <article className="food-card" key={item.id}>
            <img src={`/images/${item.image}`} alt={item.name} />
            <div className="card-body"><div className="card-header"><h3>{item.name}</h3><strong>{item.price.toFixed(2)} €</strong></div>
              <p>{item.desc}</p><div className="card-footer"><span className={item.quantity > 0 ? 'stock' : 'soldout'}>Disponibles: {item.quantity}</span>
                <button disabled={item.quantity === 0} onClick={() => onChooseFood(item)}>Elegir</button></div></div>
          </article>
        ))}
      </div>
    </section>
  );
}
