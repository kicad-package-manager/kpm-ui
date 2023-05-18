import { Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.6)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      <Spinner animation="grow" variant="primary" className="me-2" />
      <h1>Loading...</h1>
    </div>
  );
}
