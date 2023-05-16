import useAuthContext from 'hooks/useAuthContext';
import Layout from 'components/Layout';
import { Card } from 'react-bootstrap';

export default function Home() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Layout>
      <h1>Welcome, {isLoggedIn() ? 'User' : 'Guest'}</h1>
      <h2>Discover Packages</h2>
      <Card body></Card>
      <h2>New Packages</h2>
      <Card body></Card>
      <h2>Popular Packages</h2>
      <Card body></Card>
    </Layout>
  );
}
