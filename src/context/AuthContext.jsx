import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const AuthContext = React.createContext({});

export const useACtx = () => {
  return React.useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const toast = useToast();

  // const { authenticate, isAuthenticated, user } = useMoralis();

  // const login = async () => {
  //   if (!isAuthenticated) {
  //     await authenticate()
  //       .then(function (user) {
  //         console.log(user.get('ethAddress'));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // };

  useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem('userAccount'));
      if (userData != null) {
        // setUserInfo(userData);
        setAuth(true);
      }
    }
    checkConnectedWallet();
  }, []);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    return provider;
  };

  const dispatchEvent = (actionType, payload) => {
    switch (actionType) {
      case 'SET_AUTH':
        setAuth(payload);
        return;
      case 'LOGOUT':
        window.localStorage.removeItem('userAccount');

        setAuth(false);
        return;
      case 'LOGIN':
        // login();
        return;

      default:
        return;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, dispatchEvent }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
