import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../services/api/products.api';

export function SellerImportProductsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        setMessage(null);

        try {
            await productsApi.importProducts(file);
            setMessage({ type: 'success', text: 'Products imported successfully!' });
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err: any) {
            setMessage({
                type: 'error',
                text: err.message || err.data?.detail || 'Failed to import products. Please check the CSV format.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <Link to="/seller/dashboard" className="text-amazon-blue hover:underline text-sm mb-4 inline-block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 font-amazon-ember">Import Products via CSV</h1>
                <p className="text-gray-600 mt-2">
                    Upload a CSV file containing your product details to bulk import them into your inventory.
                </p>
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-8">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select CSV File
                    </label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-amazon-light-blue file:text-amazon-blue
                            hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Supported columns: title, description, price, category, inventory, imageUrl
                    </p>
                </div>

                {message && (
                    <div className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={handleUpload}
                        disabled={!file || isLoading}
                        className={`px-6 py-2 rounded-md font-medium text-white transition-colors
                            ${!file || isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-amazon-orange hover:bg-amber-500'}`}
                    >
                        {isLoading ? 'Importing...' : 'Upload and Import'}
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">CSV Format Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Your CSV file must include a header row with the following columns:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li><span className="font-medium">title</span> (Required)</li>
                    <li><span className="font-medium">price</span> (Required) - e.g., 19.99</li>
                    <li><span className="font-medium">category</span> (Required)</li>
                    <li><span className="font-medium">inventory</span> (Required) - Whole number</li>
                    <li><span className="font-medium">description</span> (Optional)</li>
                    <li><span className="font-medium">imageUrl</span> (Optional)</li>
                </ul>
            </div>
        </div>
    );
}
