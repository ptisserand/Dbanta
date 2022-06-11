import { Button } from '@chakra-ui/react';
import { BiLogInCircle } from 'react-icons/bi';

import React from 'react';
import { useACtx } from '../../context/AuthContext';

function Auth() {
  const { dispatchEvent, isAuth } = useACtx();
  return (
    <>
      {!isAuth && (
        <Button
          colorScheme="green"
          rightIcon={<BiLogInCircle />}
          onClick={() => dispatchEvent('LOGIN', null)}
        >
          Login
        </Button>
      )}
      {isAuth && <Button>{isAuth.substring(0, 10)}...</Button>}
    </>
  );
}

export default Auth;
