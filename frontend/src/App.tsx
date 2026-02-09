import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AppLayout } from './components/Layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutConfirmationPage } from './pages/CheckoutConfirmationPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { SellerLoginPage } from './pages/SellerLoginPage';
import { SellerRegisterPage } from './pages/SellerRegisterPage';
import { SellerDashboard } from './pages/SellerDashboard';
import { AddProductPage } from './pages/AddProductPage';
import { AccountOrdersPage } from './pages/AccountOrdersPage';
import { AccountOrderDetailPage } from './pages/AccountOrderDetailPage';
import { AccountProfilePage } from './pages/AccountProfilePage';
import { AccountAddressesPage } from './pages/AccountAddressesPage';
import { AccountListsPage } from './pages/AccountListsPage';
import { ListDetailPage } from './pages/ListDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CustomerServicePage } from './pages/CustomerServicePage';
import { RegistryPage } from './pages/RegistryPage';
import { GiftCardsPage } from './pages/GiftCardsPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="checkout/confirmation" element={<CheckoutConfirmationPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="seller/login" element={<SellerLoginPage />} />
              <Route path="seller/register" element={<SellerRegisterPage />} />
              <Route path="seller/dashboard" element={<SellerDashboard />} />
              <Route path="seller/add-product" element={<AddProductPage />} />
              <Route path="seller/edit-product/:id" element={<AddProductPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="account/orders" element={<AccountOrdersPage />} />
              <Route path="account/orders/:orderId" element={<AccountOrderDetailPage />} />
              <Route path="account/profile" element={<AccountProfilePage />} />
              <Route path="account/addresses" element={<AccountAddressesPage />} />
              <Route path="account/lists" element={<AccountListsPage />} />
              <Route path="account/lists/:listId" element={<ListDetailPage />} />
              <Route path="customer-service" element={<CustomerServicePage />} />
              <Route path="registry" element={<RegistryPage />} />
              <Route path="gift-cards" element={<GiftCardsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
