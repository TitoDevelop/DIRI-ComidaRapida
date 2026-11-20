import { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppDispatch, useFood } from './store/hooks';
import { fetchOrders, resetSession } from './store/foodSlice';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { I18nProvider, translateStatus, translateFoodName, useI18n } from './i18n/I18nContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import AuthForm from './components/AuthForm';
import FoodOrder from './components/FoodOrder';
import Orders from './components/Orders';
import ErrorBoundary from './components/ErrorBoundary';
import { configured } from './firebase/client';

const Foods = lazy(() => import('./components/Foods'));
function Shop() {
  const dispatch = useAppDispatch();
  const { user, isAdmin, loading: authLoading, logout } = useAuth();
  const { t } = useI18n();
  const { menuItems, orders, view, selectedFood, showStock, showMenu, busy, ready, notice, error, refreshOrders, updateOrder, removeOrder } = useFood();
  const authenticated = Boolean(user);
  useEffect(() => {
    dispatch(resetSession());
    if (configured && user) {
      const request = dispatch(fetchOrders());
      return () => { request.abort(); };
    }
  }, [dispatch, user?.uid]);
  const visibleView = isAdmin ? view : (view === 'order' ? 'order' : 'menu');
  return <div className="site">
    <header className="topbar"><div className="brand"><span className="brand-mark">LP.</span><span>LA PARADA <small>{t('tagline')}</small></span></div>
      <div className="user-bar flex flex-wrap items-center justify-end gap-2"><LanguageSwitcher/><span>{user ? user.email : t('guest')}{isAdmin ? ` · ${t('admin')}` : ''}</span>{user && <button className="logout" onClick={() => void logout()}>{t('logout')}</button>}</div>
    </header>
    <main className="container">
      <section className="intro"><div><span className="eyebrow">{t('introTag')}</span><h1>{t('title1')}<br/><em>{t('title2')}</em></h1><p>{t('intro')}</p></div><span className="stamp">{t('stampText')} <b>↗</b></span></section>
      {!configured && <p className="failure" role="alert">{t('config')}</p>}
      {authLoading && <p className="loading" role="status">{t('checking')}</p>}
      {!authLoading && !authenticated && <AuthForm />}
      {authenticated && notice && <p className="loading" role="status">{translateStatus(notice,t)}</p>}
      {authenticated && error && <p className="failure" role="alert">{translateStatus(error,t)}</p>}
      {!authLoading && <>
        <nav className="tabs" aria-label="Vistas / Views">
          {isAdmin && <button className={visibleView === 'stock' ? 'active' : ''} onClick={showStock}>{t('stockTab')}</button>}
          <button className={visibleView !== 'stock' ? 'active' : ''} onClick={showMenu}>{t('orderTab')}</button>
        </nav>
        {visibleView === 'stock' && isAdmin && <section><div className="section-heading"><div><span className="eyebrow">{t('restricted')}</span><h2>{t('available')}</h2></div><p>{t('stockInfo')}</p></div>
          <div className="availability">{menuItems.map(item => <div className="availability-row" key={item.id}><span className="item-name">{translateFoodName(item.id,t)}</span><span className="count">{item.quantity} {t('units')}</span></div>)}</div>
          <button className="primary start" onClick={showMenu}>{t('viewMenu')}</button></section>}
        {visibleView === 'menu' && <Suspense fallback={<p role="status" className="loading">{t('loadingMenu')}</p>}><Foods /></Suspense>}
        {visibleView === 'order' && selectedFood && (authenticated ? <FoodOrder key={selectedFood.id}/> : <AuthForm />)}
        {authenticated && configured && <Orders orders={orders} busy={busy} onRefresh={refreshOrders} onUpdate={updateOrder} onDelete={removeOrder}/>}
        {authenticated && configured && !ready && !busy && <button onClick={() => void refreshOrders()}>{t('retry')}</button>}
      </>}
    </main>
    <footer>Proyecto DIRI · AC 9.1 · José Luis Mas García</footer>
  </div>;
}
export default function App() {
  return <ErrorBoundary><Provider store={store}><I18nProvider><AuthProvider><Shop /></AuthProvider></I18nProvider></Provider></ErrorBoundary>;
}
