import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 * Response: { token, expiresAt?, user }
 */
export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    navigate('/');
  };

  return (
    <div className="max-w-[400px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-amazon-orange text-amazon-dark py-2 rounded font-semibold hover:bg-amber-500">
          Create your Amazon account
        </button>
      </form>
      <p className="mt-2 text-sm text-gray-500">API: POST /api/auth/register { '{ name, email, password }' }</p>
      <p className="mt-4 text-sm">
        Already have an account? <Link to="/login" className="text-amazon-orange hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
