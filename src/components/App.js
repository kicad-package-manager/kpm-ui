import { Route, Routes } from 'react-router-dom';

import Home from 'pages/home';
import Packages from 'pages/packages';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/packages" element={<Packages />} />
    </Routes>
  );
}
