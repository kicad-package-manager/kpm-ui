import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Spinner, Table } from 'react-bootstrap';

import Layout from 'components/Layout';
import { useQuery } from '@tanstack/react-query';

const packageListUrl = `${API_URL}/packages`;

export default function Packages() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const result = await fetch(packageListUrl);

      return await result.json();
    },
    refetchOnWindowFocus: false
  });

  return (
    <Layout>
      <h1 className="mb-4">
        <FontAwesomeIcon icon={faBoxesPacking} /> Packages
      </h1>
      {isLoading && <Spinner className="justify-self-center" />}
      {Boolean(error) && (
        <Card body bg="danger">
          <Card.Title>Error - {error.message}</Card.Title>
          <blockquote>
            <pre>{error.stack}</pre>
          </blockquote>
        </Card>
      )}
      {Boolean(data) && (
        <Card body>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.user.username}</td>
                    <td>{row.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No packages to show!</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}
    </Layout>
  );
}
