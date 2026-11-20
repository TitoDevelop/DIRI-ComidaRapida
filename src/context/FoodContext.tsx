import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MenuItem } from '../entities/entities';

type View = 'stock' | 'menu' | 'order';
interface FoodContextData {
  menuItems: MenuItem[];
  view: View;
  selectedFood?: MenuItem;
  showStock(): void;
  showMenu(): void;
  chooseFood(id: number): void;
  sendOrder(id: number, quantity: number): boolean;
}
const FoodContext = createContext<FoodContextData | undefined>(undefined);
const initialMenu: MenuItem[] = [
  { id: 1, name: 'Hamburguesa de pollo', quantity: 40, desc: 'Pollo crujiente, lechuga, tomate y mayonesa casera.', price: 8.5, image: 'pollo.svg' },
  { id: 2, name: 'Patatas de la casa', quantity: 35, desc: 'Patatas gajo con nuestra salsa especial.', price: 4.2, image: 'patatas.svg' },
  { id: 3, name: 'Pizza margarita', quantity: 18, desc: 'Tomate, mozzarella y albahaca fresca.', price: 9.9, image: 'pizza.svg' },
  { id: 4, name: 'Bocadillo vegetal', quantity: 24, desc: 'Pan tostado, aguacate, huevo y rúcula.', price: 7.4, image: 'bocadillo.svg' }
];

// AC 5.2: los componentes pueden consultar y modificar el estado compartido.
export function FoodProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);
  const [view, setView] = useState<View>('stock');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedFood = menuItems.find(item => item.id === selectedId);

  const showStock = () => setView('stock');
  const showMenu = () => { setSelectedId(null); setView('menu'); };
  const chooseFood = (id: number) => { setSelectedId(id); setView('order'); };
  const sendOrder = (id: number, quantity: number) => {
    const item = menuItems.find(product => product.id === id);
    if (!item || !Number.isInteger(quantity) || quantity < 1 || quantity > item.quantity) return false;
    setMenuItems(products => products.map(product => product.id === id
      ? { ...product, quantity: product.quantity - quantity } : product));
    return true;
  };

  return <FoodContext.Provider value={{ menuItems, view, selectedFood, showStock, showMenu, chooseFood, sendOrder }}>
    {children}
  </FoodContext.Provider>;
}

export function useFood() {
  const value = useContext(FoodContext);
  if (!value) throw new Error('useFood debe usarse dentro de FoodProvider');
  return value;
}
