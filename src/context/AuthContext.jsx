import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
const dbantaAbi = require('../assets/Dbanta.json').abi;

const wanted = { name: "maticmum", label: "Polygon Mumbai" };

const AuthContext = React.createContext({});

export const useACtx = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [contract, setContract] = useState(undefined);
  const toast = useToast();
  let _PROVIDER = useRef(null);
  let _SIGNER = useRef(null);
  

  const detectCurrentProvider = useCallback(async () => {
    if (window.ethereum) {
      _PROVIDER.current = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );
      _PROVIDER.current.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
      let net = await _PROVIDER.current.getNetwork();

      if (net.name === wanted.name) {
        let acct = await _PROVIDER.current.listAccounts();
        acct[0] && setAuth(acct[0]);
      }
    }
    return _PROVIDER.current;
  }, [_PROVIDER]);

  const login = async () => {
    if (_PROVIDER.current) {
      let net = await _PROVIDER.current.getNetwork();
      if (net.name === wanted.name) {
        let accounts = await _PROVIDER.current.send('eth_requestAccounts', []);
        _SIGNER.current = _PROVIDER.current.getSigner();
        let dbanta = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, dbantaAbi, _SIGNER.current);
        setContract(dbanta);
        setAuth(accounts[0]);
      } else {
        toast({
          title: `Please connect to ${wanted.label}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        status: 'error',
        title: 'Cannot detect current provider',
        description: 'Please install MetaMask',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const dispatchEvent = (actionType, payload) => {
    switch (actionType) {
      case 'SET_AUTH':
        setAuth(payload);
        return;
      case 'LOGOUT':
        window.localStorage.removeItem('userAccount');

        setAuth(false);
        setContract(undefined)
        return;
      case 'LOGIN':
        !isAuth && login();
        return;

      default:
        return;
    }
  };

  useEffect(() => {
    detectCurrentProvider();
  }, [detectCurrentProvider]);

  return (
    <AuthContext.Provider value={{ isAuth, _PROVIDER, _SIGNER, contract, dispatchEvent }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
