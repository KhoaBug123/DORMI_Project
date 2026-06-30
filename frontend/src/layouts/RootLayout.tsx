import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

export const RootLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
