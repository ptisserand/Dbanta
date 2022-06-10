import { Button } from '@chakra-ui/react';
import { BiLogInCircle } from 'react-icons/bi';

import React from 'react';

function Auth() {
  return (
    <>
      <Button colorScheme="green" rightIcon={<BiLogInCircle />}>
        Login
      </Button>
    </>
  );
}

export default Auth;
