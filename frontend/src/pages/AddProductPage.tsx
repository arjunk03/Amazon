import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api/products.api';
import { useAuth } from '../context/AuthContext';

export function AddProductPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);
        setError('');

        try {
            await productsApi.create({
                name,
                description,
                price: parseInt(price),
                image,
                seller_id: user.id
            });
            navigate('/seller/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Product Title</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none"
                        placeholder="What are you selling?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        className="w-full border rounded px-3 py-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none"
                        placeholder="Describe your product in detail..."
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min="1"
                            className="w-full border rounded px-3 py-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none"
                            placeholder="e.g. 25"
                        />
                    </div>
                    <div className="flex-2 w-full">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
                        {error}
                    </div>
                )}

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/seller/dashboard')}
                        className="flex-1 border border-gray-300 py-2 rounded font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 bg-amazon-orange text-white py-2 rounded font-medium hover:bg-amber-500 ${isLoading ? 'opacity-50' : ''}`}
                    >
                        {isLoading ? 'Creating...' : 'List Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
