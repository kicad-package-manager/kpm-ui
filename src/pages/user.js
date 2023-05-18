import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import ErrorCard from 'components/ErrorCard';
import Layout from 'components/Layout';
import useApi from 'hooks/useApi';

const userDetailsUrl = `${API_URL}/user/uuid`;

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
    </Layout>
  );
}
