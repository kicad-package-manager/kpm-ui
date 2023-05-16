import { differenceInMilliseconds, isBefore, parseISO } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const authUrl = `${API_URL}/auth`;

export default function useAuth() {
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

  return { isLoggedIn, token };
}
