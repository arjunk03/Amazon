import { Link } from 'react-router-dom';

export function GiftCardsPage() {
    return (
        <div className="max-w-[1000px] mx-auto p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-semibold mb-2">Amazon Gift Cards</h1>
                <p className="text-lg text-gray-700">The perfect gift for any occasion.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                    <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
                        <span className="text-4xl">🎁</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">eGift Cards</h3>
                    <p className="text-sm text-gray-600 mb-4">Send instantly via email or text.</p>
                    <button className="bg-amazon-orange text-amazon-dark px-4 py-2 rounded-full font-medium hover:bg-amber-500 w-full">Buy eGift Card</button>
                </div>

                <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                    <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
                        <span className="text-4xl">💳</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Physical Gift Cards</h3>
                    <p className="text-sm text-gray-600 mb-4">Free one-day shipping.</p>
                    <button className="bg-amazon-orange text-amazon-dark px-4 py-2 rounded-full font-medium hover:bg-amber-500 w-full">Buy Physical Card</button>
                </div>

                <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                    <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
                        <span className="text-4xl">🖨️</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Print at Home</h3>
                    <p className="text-sm text-gray-600 mb-4">Print a gift card yourself.</p>
                    <button className="bg-amazon-orange text-amazon-dark px-4 py-2 rounded-full font-medium hover:bg-amber-500 w-full">Print Now</button>
                </div>
            </div>

            <div className="mt-12 text-center pt-8 border-t">
                <p className="mb-4">Already have a gift card?</p>
                <Link to="/account/profile" className="text-amazon-orange hover:underline font-medium">Redeem a Gift Card</Link>
            </div>
        </div>
    );
}
