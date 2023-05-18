import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseISO, formatRelative } from 'date-fns';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Spinner,
  Row,
  Col,
  Table
} from 'react-bootstrap';

import ErrorCard from 'components/ErrorCard';
import Layout from 'components/Layout';
import useApi from 'hooks/useApi';

const userDetailsUrl = `${API_URL}/user`;

export default function User() {
  const { uuid } = useParams();
  const { isLoading, error, data } = useApi(
    ['user', uuid],
    `${userDetailsUrl}/${uuid}`
  );

  return (
    <Layout title={data?.username || 'User'}>
      <h1 className="mb-4">
        <FontAwesomeIcon icon={faUser} /> User
      </h1>
      {isLoading && <Spinner className="justify-self-center" />}
      {Boolean(error) && <ErrorCard error={error} />}
      {Boolean(data) && (
        <Card body>
          <Container>
            <Row>
              <Col xs={9}>
                <h1>{data.username}</h1>
              </Col>
              <Col xs={3} className="d-flex justify-content-end">
                <Button variant="success">
                  <FontAwesomeIcon icon={faGithub} /> GitHub
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Created</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.packages.length ? (
                      data.packages.map((row) => (
                        <tr key={row.id}>
                          <td>{row.name}</td>
                          <td title={row.createdAt}>
                            {formatRelative(
                              parseISO(row.createdAt),
                              Date.now()
                            )}
                          </td>
                          <td title={row.updatedAt}>
                            {formatRelative(
                              parseISO(row.updatedAt),
                              Date.now()
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>No packages to show!</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Card>
      )}
    </Layout>
  );
}
