import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainer } from '../ToastContainer';

export function AppLayout() {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}
