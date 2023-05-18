import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';

import Header from 'components/Header';
import { Helmet } from 'react-helmet';

export default function Layout({ children, title = 'Page' }) {
  return (
    <Fragment>
      <Helmet title={title} titleTemplate={`KiPM - %s`} />
      <Header />
      <Container>{children}</Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};
