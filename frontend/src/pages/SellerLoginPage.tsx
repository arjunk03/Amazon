import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Amazon Seller Central Login Page
 * URL: /seller/login
 */
export function SellerLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/seller/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 border border-gray-300 rounded shadow-sm">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <span className="text-2xl font-bold text-amazon-dark">amazon</span>
                        <span className="text-2xl font-normal text-gray-600 ml-1">seller central</span>
                    </div>
                    <h2 className="text-2xl font-normal text-gray-900">Sign in</h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-bold text-gray-700">
                                Email
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange focus:z-10 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                    Password
                                </label>
                                <Link to="/forgot-password" title="Forgot password" className="text-sm text-blue-600 hover:text-orange-700 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange focus:z-10 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-amazon-orange hover:bg-amber-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon-orange`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 border-t border-gray-200 pt-6">
                    <p className="text-sm text-center text-gray-600">
                        New to Amazon Seller Central?
                    </p>
                    <Link
                        to="/seller/register"
                        className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
                    >
                        Register now
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-xs text-gray-500 text-center space-x-4">
                <Link to="#" className="hover:underline">Conditions of Use</Link>
                <Link to="#" className="hover:underline">Privacy Notice</Link>
                <Link to="#" className="hover:underline">Help</Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
                © 1996-2026, Amazon.com, Inc. or its affiliates
            </p>
        </div>
    );
}
