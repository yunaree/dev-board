'use client';
import { useAuthStore } from '../store/auth.store';

export default function AuthTest() {
  const { user, tokens, login, register, refresh, logout } = useAuthStore();

  return (
    <div>
      <button onClick={() => login({ username: 'youruser', pass: 'yourpass' })}>Login</button>
      <button onClick={() => register({ username: 'newuser', pass: 'newpass' })}>Register</button>
      <button onClick={refresh}>Refresh</button>
      <button onClick={logout}>Logout</button>
      <pre>{JSON.stringify({ user, tokens }, null, 2)}</pre>
    </div>
  );
}