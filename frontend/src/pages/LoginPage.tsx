import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Response: { token, expiresAt?, user: { id, email, name, imageUrl? } }
 */
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="max-w-[400px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="w-full bg-amazon-orange text-amazon-dark py-2 rounded font-semibold hover:bg-amber-500">
          Sign in
        </button>
      </form>
      <p className="mt-2 text-sm text-gray-500">API: POST /api/auth/login {'{ email, password }'}</p>
      <Link to="/forgot-password" className="block mt-2 text-sm text-amazon-orange hover:underline">Forgot password?</Link>
      <p className="mt-4 text-sm text-center">
        New? <Link to="/register" className="text-amazon-orange hover:underline">Create an account</Link>
      </p>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-sm font-semibold text-gray-700">Want to sell on Amazon?</h2>
        <Link to="/seller/login" className="block mt-1 text-sm text-blue-600 hover:text-orange-700 hover:underline">
          Go to Seller Central
        </Link>
      </div>
    </div>
  );
}
