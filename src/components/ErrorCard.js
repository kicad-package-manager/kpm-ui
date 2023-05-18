import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ErrorCard({ error }) {
  if (!error) {
    return null;
  }

  return (
    <Card body bg="danger">
      <Card.Title>Error - {error.message}</Card.Title>
      <blockquote>
        <pre>{error.stack}</pre>
      </blockquote>
    </Card>
  );
}

ErrorCard.propTypes = {
  error: PropTypes.instanceOf(new Error())
};
