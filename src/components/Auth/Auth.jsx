import { Button, Select } from '@chakra-ui/react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

import React, { useEffect, useState } from 'react';
import { useACtx } from '../../context/AuthContext';

function Auth() {
  const { dispatchEvent, isAuth, contract, blockchain } = useACtx();
  const [name, setName] = useState("");

  const updateBlockChain = async (event) => {
    event.preventDefault();
    const blockchain = event.target.value;
    dispatchEvent('SET_BLOCKCHAIN', blockchain);
  }

  useEffect(() => {
    const fetchName = async (contract, isAuth) => {
      const user = await contract.getUserInfo(isAuth);
      setName(user.name);
    }
    if ((isAuth !== false) && (contract !== undefined)) {
      fetchName(contract, isAuth).catch(console.error);
    }
  }, [isAuth, contract, blockchain]);

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
      <Select onClick={(event) => updateBlockChain(event)} defaultValue="tron">
          <option value="evm">Polygon</option>
          <option value="tron">Tron</option>
        </Select>
    </>
  );
}

export default Auth;
