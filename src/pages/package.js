import { useQuery } from '@tanstack/react-query';
import { Card, Col, Row, Spinner, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Layout from 'components/Layout';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

const packageListUrl = `${API_URL}/package`;

export default function Package() {
  const { uuid } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['package', uuid],
    queryFn: async () => {
      const result = await fetch(`${packageListUrl}/uuid/${uuid}`);

      return await result.json();
    },
    refetchOnWindowFocus: false
  });

  if (!uuid) {
    return null;
  }

  return (
    <Layout>
      <h1 className="mb-4">
        <FontAwesomeIcon icon={faBox} /> {data?.name ?? 'Package'}
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
          <Row>
            <Col xs={12}>
              First uploaded on {format(parseISO(data.createdAt), 'yyyy-MM-dd')}{' '}
              by {data.user.username}, there are {data.releases.length}{' '}
              releases.
            </Col>
          </Row>
          {Array.isArray(data.releases) && Boolean(data.releases.length) && (
            <Row>
              <Col xs={12}>
                <Table>
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Size</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.releases.map((release) => (
                      <tr key={release.id}>
                        <td colSpan={3}>text</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Card>
      )}
    </Layout>
  );
}
