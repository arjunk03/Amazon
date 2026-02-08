import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

import { mockDeliveryLocation } from '../../mock/data';

export function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="bg-amazon-dark text-white sticky top-0 z-50">
      <div className="flex items-center gap-4 px-4 py-2 max-w-[1600px] mx-auto">
        <Link to="/" className="text-amazon-nav-hover hover:text-white text-2xl font-bold">
          amazon
        </Link>

        {user?.user_type !== 'seller' && (
          <div className="flex items-start gap-1 text-sm text-gray-300">
            <span className="text-xs">Deliver to</span>
            <span className="font-semibold text-white">{mockDeliveryLocation.label}</span>
          </div>
        )}

        <form onSubmit={handleSearch} className="flex-1 flex max-w-[600px]">
          <input
            type="search"
            placeholder="Search Amazon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-amazon-dark rounded-l"
          />
          <button type="submit" className="bg-amazon-orange text-amazon-dark px-4 rounded-r hover:bg-amber-500">
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 relative">
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setAccountOpen(true)}
            onMouseLeave={() => setAccountOpen(false)}
          >
            <span className="text-sm">
              {user ? `Hello, ${user.name}` : 'Account & Lists'}
            </span>
            {accountOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white text-amazon-dark rounded shadow-lg py-2 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="font-bold text-sm">Your Account</p>
                    </div>
                    {user.user_type === 'seller' ? (
                      <Link to="/seller/dashboard" className="block px-4 py-1 hover:bg-gray-100 text-amazon-orange font-semibold">
                        Seller Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link to="/account/orders" className="block px-4 py-1 hover:bg-gray-100">Orders</Link>
                        <Link to="/account/lists" className="block px-4 py-1 hover:bg-gray-100">Lists</Link>
                      </>
                    )}
                    <Link to="/account/profile" className="block px-4 py-1 hover:bg-gray-100">Profile</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-1 hover:bg-gray-100 border-t border-gray-100 mt-1">
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-center font-semibold border border-amazon-dark rounded mx-2 mb-2">
                      Sign in
                    </Link>
                    <Link to="/register" className="block px-4 py-1 hover:bg-gray-100">New customer? Start here.</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {user?.user_type !== 'seller' && (
            <>
              <Link to="/account/orders" className="text-sm whitespace-nowrap">Returns & Orders</Link>

              <Link to="/cart" className="flex items-end gap-0">
                <span className="text-2xl">🛒</span>
                <span className="text-amazon-orange font-bold">{cart.itemCount}</span>
                <span className="text-sm">Cart</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="bg-amazon-dark-light px-4 py-1 flex items-center gap-4 text-sm whitespace-nowrap overflow-x-auto no-scrollbar">
        <Link to="/" className="hover:text-amazon-nav-hover flex items-center gap-1 font-bold border border-transparent hover:border-white px-2 py-1">
          <span className="text-lg">☰</span> All
        </Link>
        {user?.user_type === 'seller' ? (
          <>
            <Link to="/seller/dashboard" className="hover:text-amazon-nav-hover border border-transparent hover:border-white px-2 py-1">Inventory</Link>
            <Link to="/seller/add-product" className="hover:text-amazon-nav-hover border border-transparent hover:border-white px-2 py-1">Add a Product</Link>
          </>
        ) : (
          <>
            <Link to="/search?category=deals" className="hover:text-amazon-nav-hover border border-transparent hover:border-white px-2 py-1">Today's Deals</Link>
            <Link to="/registry" className="hover:text-amazon-nav-hover border border-transparent hover:border-white px-2 py-1">Registry</Link>
            <Link to="/gift-cards" className="hover:text-amazon-nav-hover border border-transparent hover:border-white px-2 py-1">Gift Cards</Link>
            <Link to="/seller/register" className="hover:text-amazon-nav-hover border border-transparent hover:border-white px-2 py-1">Sell</Link>
          </>
        )}

        <Link to="/customer-service" className="hover:text-amazon-nav-hover border border-transparent hover:border-white px-2 py-1">Customer Service</Link>

        {user?.user_type === 'seller' && (
          <Link
            to="/seller/dashboard"
            className="text-amazon-orange font-bold hover:text-white border border-transparent hover:border-white px-2 py-1 ml-auto"
          >
            Seller Central
          </Link>
        )}
      </nav>
    </header>
  );
}
