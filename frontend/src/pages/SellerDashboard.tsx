import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../services/api/products.api';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types/product';

export function SellerDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productsApi.getAll();
                // Filter products by current seller
                const filtered = data.filter(p => p.seller_id === user?.id);
                setProducts(filtered);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [user?.id]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 font-amazon-ember">Seller Central Dashboard</h1>
                <Link
                    to="/seller/add-product"
                    className="bg-amazon-orange text-white px-4 py-2 rounded-md font-medium hover:bg-amber-500"
                >
                    Add New Product
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">Your Inventory</h2>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading inventory...</div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : products.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-600 mb-4">You haven't added any products yet.</p>
                        <Link
                            to="/seller/add-product"
                            className="text-amazon-orange hover:underline font-medium"
                        >
                            Get started by adding your first product
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Product</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 flex items-center space-x-3">
                                            <img
                                                src={product.image || 'https://via.placeholder.com/40'}
                                                alt={product.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </td>
                                        <td className="px-6 py-4">${product.price}</td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">#{product.id}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                            <button className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
