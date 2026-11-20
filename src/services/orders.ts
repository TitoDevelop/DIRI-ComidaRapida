import { signInAnonymously } from 'firebase/auth';
import { get, push, ref, remove, set, update } from 'firebase/database';
import { auth, database } from '../firebase/client';
import { log } from './logger';

export interface Order {
  id: string;
  foodId: number;
  foodName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: number;
}

let signInPromise: ReturnType<typeof signInAnonymously> | null = null;

async function userId() {
  // El SDK conserva la sesión anónima al refrescar el navegador.
  const user = auth.currentUser ?? (await (signInPromise ??= signInAnonymously(auth).finally(() => { signInPromise = null; }))).user;
  return user.uid;
}

const orderPath = (uid: string, id?: string) => `pedidos/${uid}${id ? '/' + id : ''}`;

export async function listOrders(): Promise<Order[]> {
  const uid = await userId();
  const snapshot = await get(ref(database, orderPath(uid)));
  const items = snapshot.val() as Record<string, Omit<Order, 'id'>> | null;
  log('info', 'Pedidos cargados');
  return Object.entries(items ?? {}).map(([id, order]) => ({ ...order, id }))
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function createOrder(data: Omit<Order, 'id'>): Promise<Order> {
  const uid = await userId();
  const newRef = push(ref(database, orderPath(uid)));
  if (!newRef.key) throw new Error('No se pudo crear el identificador del pedido');
  await set(newRef, data);
  log('info', `Pedido creado: ${newRef.key}`);
  return { ...data, id: newRef.key };
}

export async function changeOrderQuantity(order: Order, quantity: number): Promise<Order> {
  if (!Number.isInteger(quantity) || quantity < 1) throw new Error('Cantidad incorrecta');
  const uid = await userId();
  const total = Number((quantity * order.unitPrice).toFixed(2));
  await update(ref(database, orderPath(uid, order.id)), { quantity, total });
  log('info', `Pedido actualizado: ${order.id}`);
  return { ...order, quantity, total };
}

export async function deleteOrder(id: string): Promise<void> {
  const uid = await userId();
  await remove(ref(database, orderPath(uid, id)));
  log('info', `Pedido eliminado: ${id}`);
}
