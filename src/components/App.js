import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'components/Loader';

const Home = lazy(() => import('pages/home'));
const Package = lazy(() => import('pages/package'));
const Packages = lazy(() => import('pages/packages'));
const User = lazy(() => import('pages/user'));
const Users = lazy(() => import('pages/users'));
const TermsOfService = lazy(() => import('pages/termsOfService'));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/package/:uuid" element={<Package />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:uuid" element={<User />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </Suspense>
  );
}
