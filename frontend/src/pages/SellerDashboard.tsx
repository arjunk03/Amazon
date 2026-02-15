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
                const data = await productsApi.getMyProducts();
                setProducts(data);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [user?.id]);

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        const cat = product.category || 'Uncategorized';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 font-amazon-ember">Seller Central Dashboard</h1>
                <div className="flex space-x-4">
                    <Link
                        to="/seller/import-products"
                        className="bg-white text-amazon-dark border border-gray-300 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
                    >
                        Import Products
                    </Link>
                    <Link
                        to="/seller/add-product"
                        className="bg-amazon-orange text-white px-4 py-2 rounded-md font-medium hover:bg-amber-500 transition-colors"
                    >
                        Add New Product
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="bg-white border rounded-lg p-12 text-center text-gray-500 shadow-sm">
                    Loading inventory...
                </div>
            ) : error ? (
                <div className="bg-white border rounded-lg p-12 text-center text-red-500 shadow-sm">
                    {error}
                </div>
            ) : Object.keys(groupedProducts).length === 0 ? (
                <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
                    <p className="text-gray-600 mb-4">You haven't added any products yet.</p>
                    <Link
                        to="/seller/add-product"
                        className="text-amazon-orange hover:underline font-medium"
                    >
                        Get started by adding your first product
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                        <div key={category} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider">{category}</h2>
                                <span className="text-sm text-gray-500">{categoryProducts.length} items</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                                        <tr>
                                            <th className="px-6 py-3 w-2/5">Product</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">ID</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {categoryProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={product.imageUrl || 'https://via.placeholder.com/80'}
                                                            alt={product.title}
                                                            className="w-12 h-12 object-contain rounded border bg-white p-1"
                                                        />
                                                        <span className="font-medium text-gray-900 line-clamp-2">{product.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-lg text-amazon-dark">₹{product.price}</td>
                                                <td className="px-6 py-4 text-gray-500 text-xs">#{product.id}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        to={`/seller/edit-product/${product.id}`}
                                                        className="text-blue-600 hover:text-blue-800 font-medium mr-4 transition-colors"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button className="text-red-600 hover:text-red-800 font-medium transition-colors">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    );
}
