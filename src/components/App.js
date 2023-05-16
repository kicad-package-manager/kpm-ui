import { Fragment } from 'react';

import useAuthContext from 'hooks/useAuthContext';

export default function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Fragment>
      <h1>Hello {isLoggedIn() ? 'User' : 'Guest'}</h1>
      <h2>You are here.</h2>
    </Fragment>
  );
}
