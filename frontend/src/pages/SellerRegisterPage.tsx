import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Amazon Seller Central Registration Page
 * URL: /seller/register
 */
export function SellerRegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Explicitly set user_type to 'seller'
            await register(name, email, password, phone, "seller");
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
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
                    <h2 className="text-2xl font-normal text-gray-900">Create your seller account</h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                                Your name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange focus:z-10 sm:text-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            <label htmlFor="phone" className="block text-sm font-bold text-gray-700">
                                Mobile number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange focus:z-10 sm:text-sm"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Optional"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange focus:z-10 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                minLength={6}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div className="text-xs text-gray-600">
                        By creating an account, you agree to Amazon's <Link to="#" className="text-blue-600 hover:underline">Conditions of Use</Link> and <Link to="#" className="text-blue-600 hover:underline">Privacy Notice</Link>.
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-amazon-orange hover:bg-amber-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon-orange`}
                        >
                            {isLoading ? 'Creating account...' : 'Create your Amazon account'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 border-t border-gray-200 pt-6">
                    <p className="text-sm text-center text-gray-600">
                        Already have a seller account?
                    </p>
                    <Link
                        to="/seller/login"
                        className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
                    >
                        Sign in
                    </Link>
                </div>
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center max-w-sm">
                © 1996-2026, Amazon.com, Inc. or its affiliates
            </p>
        </div>
    );
}
