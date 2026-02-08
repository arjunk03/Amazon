import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api/products.api';
import { useAuth } from '../context/AuthContext';

export function AddProductPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();

    const categories = [
        'Electronics',
        'Home & Kitchen',
        'Fashion',
        'Beauty & Personal Care',
        'Books',
        'Toys & Games',
        'Sports & Outdoors',
        'Grocery'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!category) {
            setError('Please select a category');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await productsApi.create({
                title,
                description,
                price: parseInt(price),
                imageUrl,
                category,
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

            <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Product Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border rounded px-4 py-3 text-sm text-amazon-dark focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none"
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
                        className="w-full border rounded px-4 py-3 text-sm text-amazon-dark focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none"
                        placeholder="Describe your product in detail..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full border rounded px-4 py-3 text-sm text-amazon-dark focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none h-[54px] bg-white"
                        >
                            <option value="">Select a Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Selling Price</label>
                        <div className="flex items-center w-full h-[54px] border rounded overflow-hidden focus-within:ring-1 focus-within:ring-amazon-orange focus-within:border-amazon-orange">
                            <span className="bg-gray-100 px-4 py-3 border-r text-gray-600 font-bold text-xl">₹</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                min="1"
                                step="any"
                                className="flex-1 px-4 py-3 text-xl font-bold text-amazon-dark outline-none bg-white"
                                placeholder="Enter price"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                    <p className="text-xs text-gray-500 mb-2">Please provide a <strong>direct link</strong> to an image (ending in .jpg, .png, .webp). Webpages or Canva links will not work.</p>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className="w-full border rounded px-4 py-3 text-sm text-amazon-dark focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none"
                        placeholder="https://example.com/product-image.jpg"
                    />

                    {imageUrl && (
                        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Image Preview</p>
                            <div className="w-full h-48 flex items-center justify-center border bg-white rounded overflow-hidden">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        // Show an error message if the image fails to load
                                        const parent = target.parentElement;
                                        if (parent && !parent.querySelector('.preview-error')) {
                                            const errorMsg = document.createElement('div');
                                            errorMsg.className = 'preview-error text-center p-4';
                                            errorMsg.innerHTML = '<p class="text-red-500 text-sm font-medium">Unable to load image.<br/>Check if the URL is direct and public.</p>';
                                            parent.appendChild(errorMsg);
                                        }
                                    }}
                                    onLoad={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'block';
                                        const parent = target.parentElement;
                                        const errorMsg = parent?.querySelector('.preview-error');
                                        if (errorMsg) errorMsg.remove();
                                    }}
                                />
                            </div>
                        </div>
                    )}
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
                        className="flex-1 border border-gray-300 py-3 rounded font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 bg-amazon-orange text-white py-3 rounded font-medium hover:bg-amber-500 ${isLoading ? 'opacity-50' : ''}`}
                    >
                        {isLoading ? 'Creating...' : 'List Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
