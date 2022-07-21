import { Button } from '@chakra-ui/react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

import React, { useEffect, useState } from 'react';
import { useACtx } from '../../context/AuthContext';

function Auth() {
  const { dispatchEvent, isAuth, contract } = useACtx();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async (contract, isAuth) => {
      const user = await contract.getUserInfo(isAuth);
      setName(user.name);
    }
    if ((isAuth !== false) && (contract !== undefined)) {
      fetchName(contract, isAuth).catch(console.error);
    }
  }, [isAuth, contract]);

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
      {isAuth && (
        <>
          <Button>{name}</Button>
          <Button
            colorScheme="red"
            rightIcon={<BiLogOutCircle />}
            onClick={() => dispatchEvent('LOGOUT', null)}
          >
            Logout
          </Button>
        </>
      )}
    </>
  );
}

export default Auth;
