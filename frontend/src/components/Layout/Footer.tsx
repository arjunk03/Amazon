import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-amazon-dark-light text-gray-300 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-white mb-2">Get to Know Us</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press Releases</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Make Money with Us</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
              <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Amazon Payment Products</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Amazon Business Card</a></li>
              <li><a href="#" className="hover:underline">Shop with Points</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Let Us Help You</h3>
            <ul className="space-y-1">
              <li><Link to="/account/orders" className="hover:underline">Your Account</Link></li>
              <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
              <li><Link to="/account/orders" className="hover:underline">Returns & Replacements</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-6 pt-6 text-center text-sm">
          <p>Amazon clone UI — Frontend only. See docs/API_CONTRACTS.md for API contracts.</p>
        </div>
      </div>
    </footer>
  );
}
