import { Button } from '@chakra-ui/react';
import { BiLogInCircle } from 'react-icons/bi';

import React, { useEffect, useState } from 'react';
import { useACtx } from '../../context/AuthContext';
import { getUserInfo } from '../../util/backend';

function Auth() {
  const { dispatchEvent, isAuth, contract } = useACtx();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async (contract, isAuth) => {
      const user = await getUserInfo(contract, isAuth);
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
      {isAuth && <Button onClick={() => dispatchEvent('LOGOUT', null)}>{name}</Button>}
    </>
  );
}

export default Auth;
