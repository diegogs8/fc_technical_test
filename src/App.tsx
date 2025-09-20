import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import GlobalRanking from './screens/GlobalRanking';
import VendorRanking from './screens/VendorRanking';
import VendorDetail from './screens/VendorDetail';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<GlobalRanking />} />
                    <Route path="vendor-ranking" element={<VendorRanking />} />
                    <Route path="vendor/:vendorId" element={<VendorDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;