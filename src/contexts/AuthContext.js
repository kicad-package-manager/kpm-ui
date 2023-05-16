import { differenceInMilliseconds, isBefore, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState, createContext } from 'react';
import { useSearchParams } from 'react-router-dom';

const authUrl = `${API_URL}/auth`;

export const AuthContext = createContext({
  isLoggedIn: () => false,
  token: null,
  expiration: null
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoggedIn = useCallback(
    () =>
      Boolean(token) && Boolean(expiration) && isBefore(expiration, Date.now()),
    [expiration, token]
  );

  useEffect(() => {
    if (!searchParams.has('token') || !searchParams.has('expiresAt')) {
      if (!token) {
        window.location.href = authUrl;
      }
      return;
    }

    const newToken = searchParams.get('token');
    const newExpiration = parseISO(searchParams.get('expiresAt'));

    setToken(newToken);
    setExpiration(newExpiration);
    setSearchParams({}, { replace: true });

    const expirationMs = differenceInMilliseconds(Date.now(), newExpiration);

    const intervalId = setInterval(() => {
      window.location.href = authUrl;
    }, Math.max(0, expirationMs - 30000));

    return () => clearInterval(intervalId);
  }, [searchParams, token, setSearchParams]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, expiration }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
