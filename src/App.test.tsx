import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Se reinicia el contexto en cada prueba para que el stock siempre empiece igual.
afterEach(() => cleanup());

describe('AC 5.4 - Comida rápida', () => {
  it('muestra cuatro productos en disponibilidad con nombres y stock', () => {
    render(<App />);
    const rows = document.querySelectorAll('.availability-row');
    expect(rows).toHaveLength(4);
    expect(screen.getByText('Hamburguesa de pollo')).toBeInTheDocument();
    expect(screen.getByText('40 unidades')).toBeInTheDocument();
  });

  it('en la carta aparecen cuatro productos, imágenes y precios', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Pedir comida' }));

    const cards = await screen.findAllByRole('article');
    expect(cards).toHaveLength(4);
    expect(screen.getByRole('img', { name: 'Hamburguesa de pollo' }))
      .toHaveAttribute('src', '/images/pollo.svg');
    expect(screen.getByText('8.50 €')).toBeInTheDocument();
    expect(screen.getByText('9.90 €')).toBeInTheDocument();
  });

  it('actualiza el precio según la cantidad y descuenta stock al comprar', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Pedir comida' }));

    const image = await screen.findByRole('img', { name: 'Hamburguesa de pollo' });
    const card = image.closest('article');
    expect(card).not.toBeNull();
    await user.click(within(card!).getByRole('button', { name: 'Elegir' }));
    const cantidad = screen.getByRole('spinbutton', { name: /Cantidad/ });
    fireEvent.change(cantidad, { target: { value: '5' } });
    expect(screen.getByText('42.50 €')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Enviar pedido' }));
    expect(screen.getByText('¡Pedido confirmado!')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Disponibilidad' }));
    const row = screen.getByText('Hamburguesa de pollo').closest<HTMLDivElement>('div.availability-row');
    expect(row).not.toBeNull();
    expect(within(row!).getByText('35 unidades')).toBeInTheDocument();
  });
});
