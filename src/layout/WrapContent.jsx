import { Container } from '@chakra-ui/react';
import React from 'react';

function WrapContent({ children, ...rest }) {
  return (
    <Container maxW="container.lg" {...rest} mx="auto">
      {children}
    </Container>
  );
}

export default WrapContent;
