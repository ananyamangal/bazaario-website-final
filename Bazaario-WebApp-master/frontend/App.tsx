
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './Footer';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import CustomerDashboard from './pages/CustomerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerOnboarding from './pages/SellerOnboarding';
import SellerProfilePage from './pages/SellerProfile';
import VideoCall from './pages/VideoCall';
import Checkout from './pages/Checkout';
import MarketPage from './pages/MarketPage';
import StorePage from './pages/StorePage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide Navbar/Footer on Video Call screen for immersion
  const isImmersive = location.pathname === '/video-call';

  return (
    <>
      {!isImmersive && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isImmersive && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/market/:id" element={<MarketPage />} />
            <Route path="/store/:id" element={<StorePage />} />
            
            {/* Seller Routes */}
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-onboarding" element={<SellerOnboarding />} />
            <Route path="/seller-profile" element={<SellerProfilePage />} />
            
            <Route path="/video-call/:storeId?" element={<VideoCall />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;
