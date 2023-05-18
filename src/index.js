import 'core-js/stable';

import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.scss';
import App from 'components/App';
import { AuthProvider } from 'contexts/AuthContext.js';

const queryClient = new QueryClient();
const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </Router>
);
