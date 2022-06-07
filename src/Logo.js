import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <Heading as="h1" fontSize="3xl" fontWeight="bold">
        DBanta
      </Heading>
    </Link>
  );
}

export default Logo;
