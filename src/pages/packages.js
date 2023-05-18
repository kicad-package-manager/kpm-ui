import { formatRelative, parseISO } from 'date-fns';
import { faBoxesPacking, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Spinner, Table, Row, Col, Button } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

import ErrorCard from 'components/ErrorCard';
import Layout from 'components/Layout';
import useAuthContext from 'hooks/useAuthContext';
import useApi from 'hooks/useApi';

const packageListUrl = `${API_URL}/packages`;

export default function Packages() {
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuthContext();
  const { isLoading, error, data } = useApi(['packages'], packageListUrl);

  return (
    <Layout title="Packages">
      <h1 className="mb-4">
        <FontAwesomeIcon icon={faBoxesPacking} /> Packages
      </h1>
      {isLoading && <Spinner className="justify-self-center" />}
      {Boolean(error) && <ErrorCard error={error} />}
      {Boolean(data) && (
        <Card body>
          {isLoggedIn() && (
            <Row>
              <Col xs={{ span: 2, offset: 10 }}>
                <Button>
                  <FontAwesomeIcon icon={faPlus} /> Create
                </Button>
              </Col>
            </Row>
          )}
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data
                  .filter(
                    (row) =>
                      !searchParams.has('user') ||
                      row.user.id === searchParams.get('user')
                  )
                  .map((row) => (
                    <tr key={row.id}>
                      <td>
                        <Link to={`/package/${row.id}`}>{row.name}</Link>
                      </td>
                      <td>
                        <Link to={`/user/${row.user.username}`}>
                          {row.user.username}
                        </Link>
                      </td>
                      <td title={row.createdAt}>
                        {formatRelative(parseISO(row.createdAt), Date.now())}
                      </td>
                      <td title={row.updatedAt}>
                        {formatRelative(parseISO(row.updatedAt), Date.now())}
                      </td>
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
