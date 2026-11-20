import { useState, type FormEvent } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useI18n } from '../i18n/I18nContext';
export default function AuthForm() {
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, loading, error, clearError } = useAuth();
  const {t}=useI18n();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registering) await register(email.trim(), password);
    else await login(email.trim(), password);
  };
  return <section className="auth-panel" aria-label="Account / Cuenta">
    <span className="eyebrow">{t('account')}</span><h2>{registering ? t('createAccount') : t('login')}</h2><p>{t('accountIntro')}</p>
    <form onSubmit={e => void submit(e)}><label htmlFor="email">{t('email')}</label>
      <input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">{t('password')}</label><input id="password" type="password" required minLength={6} autoComplete={registering ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} />
      <button className="primary" disabled={loading} type="submit">{loading ? t('checkingAuth') : registering ? t('register') : t('enter')}</button>
    </form>
    {error && <p className="failure" role="alert">{({ 'Ya existe una cuenta con ese correo.':t('errAccount'),'El correo no es válido.':t('errEmail'),'La contraseña debe tener al menos 6 caracteres.':t('errPassword'),'Correo o contraseña incorrectos.':t('errCredentials'),'Activa Email/Password en Firebase Authentication.':t('errMethod'),'No se pudo completar la operación.':t('errDefault') } as Record<string,string>)[error] ?? error}</p>}
    <button className="link-button" onClick={() => { clearError(); setRegistering(!registering); }}>{registering ? t('haveAccount') : t('noAccount')}</button>
  </section>;
}
