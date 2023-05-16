import useAuth from 'hooks/useAuth';
import { Fragment } from 'react';

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Fragment>
      <h1>Hello {isLoggedIn() ? 'User' : 'Guest'}</h1>
      <h2>You are here.</h2>
    </Fragment>
  );
}
