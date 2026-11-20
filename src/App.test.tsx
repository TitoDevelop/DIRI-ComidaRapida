import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import type { ReactNode } from 'react';

const authMock = vi.hoisted(() => ({ loggedIn: false, admin: false, error: '' }));
vi.mock('./firebase/client', () => ({ configured: true }));
vi.mock('./auth/AuthContext', async () => ({
  AuthProvider: ({ children }: { children: ReactNode }) => children,
  useAuth: () => ({ user: authMock.loggedIn ? { uid: 'test-user', email: 'alumno@ejemplo.com' } : null,
    isAdmin: authMock.admin, loading: false, error: authMock.error, login: vi.fn(), register: vi.fn(),
    logout: vi.fn(), clearError: vi.fn() })
}));
vi.mock('./services/orders', () => ({
  listOrders: vi.fn(async () => []),
  createOrder: vi.fn(async (order: object) => ({ ...order, id: 'pedido-test' })),
  changeOrderQuantity: vi.fn(), deleteOrder: vi.fn()
}));
afterEach(() => { cleanup(); vi.clearAllMocks(); authMock.loggedIn = false; authMock.admin = false; authMock.error = ''; });

describe('AC 8.1 — permisos y sesión', () => {
  it('como invitado muestra la carta pero no permite pedir ni consultar stock', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Disponibilidad (admin)' })).not.toBeInTheDocument();
    await waitFor(() => expect(document.querySelectorAll('.food-card')).toHaveLength(4));
    expect(screen.getAllByRole('button', { name: 'Inicia sesión' })).toHaveLength(4);
    expect(screen.queryByText('40 unidades')).not.toBeInTheDocument();
  });
  it('un usuario autenticado puede hacer un pedido y no ve el stock', async () => {
    authMock.loggedIn = true;
    const user = userEvent.setup(); render(<App />);
    await waitFor(() => expect(screen.getByText('Pedidos cargados correctamente')).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: 'Disponibilidad (admin)' })).not.toBeInTheDocument();
    const card = (await screen.findByRole('img', { name: 'Hamburguesa de pollo' })).closest('article');
    await user.click(within(card!).getByRole('button', { name: 'Elegir' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: /Cantidad/ }), { target: { value: '5' } });
    expect(screen.getByText('42.50 €')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Enviar pedido' }));
    expect(await screen.findByText('¡Pedido confirmado y guardado!')).toBeInTheDocument();
  });
  it('muestra un error de lectura del rol después de iniciar sesión', async () => {
    authMock.loggedIn = true;
    authMock.error = 'No se ha podido comprobar el rol de administrador.';
    render(<App />);
    expect(await screen.findByRole('alert')).toHaveTextContent(authMock.error);
    expect(screen.queryByRole('button', { name: 'Disponibilidad (admin)' })).not.toBeInTheDocument();
    await screen.findByRole('img', { name: 'Hamburguesa de pollo' });
  });

  it('el administrador puede consultar la disponibilidad', async () => {
    authMock.loggedIn = true; authMock.admin = true;
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button', { name: 'Disponibilidad (admin)' }));
    expect(screen.getByRole('heading', { name: 'Productos disponibles' })).toBeInTheDocument();
    expect(screen.getByText('18 unidades')).toBeInTheDocument();
  });
});
