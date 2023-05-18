import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ErrorCard from 'components/ErrorCard';
import Layout from 'components/Layout';
import useApi from 'hooks/useApi';

const userListUrl = `${API_URL}/users`;

export default function Users() {
  const { isLoading, error, data } = useApi(['users'], userListUrl);

  return (
    <Layout title="Packages">
      <h1 className="mb-4">
        <FontAwesomeIcon icon={faUsers} /> Users
      </h1>
      {isLoading && <Spinner className="justify-self-center" />}
      {Boolean(error) && <ErrorCard error={error} />}
      {Boolean(data) && (
        <Card body>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Packages</th>
                <th>GitHub</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Link to={`/user/${row.id}`}>{row.username}</Link>
                    </td>
                    <td>
                      <Link to={`/packages/?user=${row.id}`}>
                        {row.packages.length}
                      </Link>
                    </td>
                    <td>
                      <a
                        href={`https://github.com/${row.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faGithub} /> {row.username}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No users to show!</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}
    </Layout>
  );
}
