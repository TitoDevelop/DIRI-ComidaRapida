import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

vi.mock('./firebase/client', () => ({ configured: true }));
vi.mock('./services/orders', () => ({
  listOrders: vi.fn(async () => []),
  createOrder: vi.fn(async (order: object) => ({ ...order, id: 'pedido-test' })),
  changeOrderQuantity: vi.fn(), deleteOrder: vi.fn()
}));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('AC 5.4 + AC 6.2', () => {
  it('muestra cuatro productos con stock', async () => {
    render(<App />);
    expect(document.querySelectorAll('.availability-row')).toHaveLength(4);
    expect(screen.getByText('40 unidades')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Pedidos cargados correctamente')).toBeInTheDocument());
  });
  it('muestra cuatro productos con imágenes y precios en la carta', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button', { name: 'Pedir comida' }));
    await waitFor(() => expect(document.querySelectorAll('.food-card')).toHaveLength(4));
    expect(screen.getByRole('img', { name: 'Hamburguesa de pollo' })).toHaveAttribute('src', '/images/pollo.svg');
    expect(screen.getByText('8.50 €')).toBeInTheDocument();
  });
  it('calcula el precio, crea un pedido y actualiza el stock después del guardado', async () => {
    const user = userEvent.setup(); render(<App />);
    await waitFor(() => expect(screen.getByText('Pedidos cargados correctamente')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Pedir comida' }));
    const card = (await screen.findByRole('img', { name: 'Hamburguesa de pollo' })).closest('article');
    await user.click(within(card!).getByRole('button', { name: 'Elegir' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: /Cantidad/ }), { target: { value: '5' } });
    expect(screen.getByText('42.50 €')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Enviar pedido' }));
    expect(await screen.findByText('¡Pedido confirmado y guardado!')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Disponibilidad' }));
    expect(screen.getByText('35 unidades')).toBeInTheDocument();
  });
});
