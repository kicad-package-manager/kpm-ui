import { differenceInMilliseconds, isBefore, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState, createContext } from 'react';
import { useSearchParams } from 'react-router-dom';

const authUrl = `${API_URL}/auth`;

export const AuthContext = createContext({
  isLoggedIn: () => false,
  login: () => {},
  logout: () => {},
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

  const login = useCallback(() => {
    if (token) {
      return;
    }

    window.location.href = `${authUrl}?continueUrl=${encodeURIComponent(
      window.location.href
    )}`;
  }, [token]);

  const logout = useCallback(() => {
    if (!token) {
      return;
    }

    setToken(null);
    setExpiration(null);
  }, [token]);

  useEffect(() => {
    if (!searchParams.has('token') || !searchParams.has('expiresAt')) {
      return;
    }

    const newToken = searchParams.get('token');
    const newExpiration = parseISO(searchParams.get('expiresAt'));

    setToken(newToken);
    setExpiration(newExpiration);
    setSearchParams({}, { replace: true });

    const expirationMs = differenceInMilliseconds(Date.now(), newExpiration);

    // refresh the token 30 seconds before it expires
    const intervalId = setInterval(() => {
      window.location.href = `${authUrl}?continueUrl=${encodeURIComponent(
        window.location.href
      )}`;
    }, Math.max(0, expirationMs - 30000));

    return () => clearInterval(intervalId);
  }, [searchParams, setSearchParams]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, expiration, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
