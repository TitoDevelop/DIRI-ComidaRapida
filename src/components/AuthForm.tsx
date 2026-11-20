import { useState, type FormEvent } from 'react';
import { useAuth } from '../auth/AuthContext';

export default function AuthForm() {
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, loading, error, clearError } = useAuth();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registering) await register(email.trim(), password);
    else await login(email.trim(), password);
  };
  return <section className="auth-panel" aria-label="Acceso de usuario">
    <span className="eyebrow">TU CUENTA</span>
    <h2>{registering ? 'Crear una cuenta' : 'Iniciar sesión'}</h2>
    <p>Para hacer pedidos tienes que acceder con tu correo y contraseña.</p>
    <form onSubmit={e => void submit(e)}>
      <label htmlFor="email">Correo electrónico</label>
      <input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Contraseña</label>
      <input id="password" type="password" required minLength={6} autoComplete={registering ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} />
      <button className="primary" disabled={loading} type="submit">{loading ? 'Comprobando...' : registering ? 'Registrarse' : 'Entrar'}</button>
    </form>
    {error && <p className="failure" role="alert">{error}</p>}
    <button className="link-button" onClick={() => { clearError(); setRegistering(!registering); }}>{registering ? 'Ya tengo cuenta' : '¿No tienes cuenta? Regístrate'}</button>
  </section>;
}
