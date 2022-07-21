import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PolygonContract, TronContract } from '../util/backend';
const dbantaAbi = require('../assets/Dbanta.json').abi;

const AuthContext = React.createContext({});

export const useACtx = () => {
  return React.useContext(AuthContext);
};

class EVMProvider {
  constructor(setContract, setAuth, toast) {
    this._PROVIDER = null;
    this._SIGNER = null;
    this.wanted = { name: "maticmum", label: "Polygon Mumbai" };
    this.setContract = setContract;
    this.setAuth = setAuth;
    this.toast = toast;
  }
  // const wanted = { name: "unknown", label: "Localhost"};
  updateState(account) {
    let dbanta = new ethers.Contract(process.env.REACT_APP_MUMBAI_CONTRACT_ADDRESS, dbantaAbi, this._SIGNER);
    this.setContract(new PolygonContract(dbanta));
    this.setAuth(account);
  };

  async detectCurrentProvider() {
    if (window.ethereum) {
      this._PROVIDER = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );
      this._PROVIDER.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
      let net = await this._PROVIDER.getNetwork();

      if (net.name === this.wanted.name) {
        let acct = await this._PROVIDER.listAccounts();
        if (acct[0]) {
          this._SIGNER = this._PROVIDER.getSigner();
          this.updateState(acct[0]);
        }
      }
    }
    return this._PROVIDER;
  }

  async login() {
    if (this._PROVIDER) {
      let net = await this._PROVIDER.getNetwork();
      if (net.name === this.wanted.name) {
        let accounts = await this._PROVIDER.send('eth_requestAccounts', []);
        this._SIGNER = this._PROVIDER.getSigner();
        this.updateState(accounts[0]);
        this.toast({
          status: 'success',
          title: 'Connected to wallet',
          description: `Address: ${accounts[0]}`,
          duration: 3000,
          isClosable: true,
        });
      } else {
        this.toast({
          title: `Please connect to ${this.wanted.label}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      this.toast({
        status: 'error',
        title: 'Cannot detect current provider',
        description: 'Please install MetaMask',
        duration: 5000,
        isClosable: true,
      });
    }
  };

};

class TronProvider {
  constructor(setContract, setAuth, toast) {
    this.setContract = setContract;
    this.setAuth = setAuth;
    this.toast = toast;
  }

  async updateState(account) {
    let dbanta = await this.tronWeb.contract(dbantaAbi, process.env.REACT_APP_TRON_CONTRACT_ADDRESS);
    this.setContract(new TronContract(dbanta));
    this.setAuth(account);
  };

  async login() {
    try {
      if (window && window.tronLink) {
        const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
        this.tronWeb = window.tronWeb;
        let addr = this.tronWeb.defaultAddress;
        await this.updateState(addr);
        if (res.code === 200) {
          this.toast({
            status: 'success',
            title: 'Connected to wallet',
            description: `Address: ${addr.base58}`,
            duration: 3000,
            isClosable: true,
          });
        } else {
          this.toast({
            status: 'error',
            title: 'Cannot connect to application',
            description: 'Please allow connection',
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        this.toast({
          status: 'error',
          title: 'Cannot detect wallet',
          description: 'Please install Tronlink',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      this.toast({
        status: 'error',
        title: 'Cannot connect wallet',
        description: err,
        duration: 5000,
        isClosable: true,
      });
    };

  }
}

const AuthProvider = ({ children }) => {
  const toast = useToast();
  const [isAuth, setAuth] = useState(false);
  const [contract, setContract] = useState(undefined);
  const [blockchain, setBlockchain] = useState("evm");
  let provider = useRef(null);

  const updateProvider = async (blockchain) => {
    console.log("Update blockchain to ", blockchain);
    if (blockchain === "evm") {
      let evm = new EVMProvider(setContract, setAuth, toast);
      await evm.detectCurrentProvider();
      provider.current = evm;
      setBlockchain("evm");
    } else {
      let tron = new TronProvider(setContract, setAuth, toast);
      provider.current = tron;
      setBlockchain("tron");
    }
  }

  const login = async () => {
    if (null === provider.current) {

    }
    await provider.current.login();
  }

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
      case 'SET_BLOCKCHAIN':
        window.localStorage.removeItem('userAccount');
        setAuth(false);
        setContract(undefined)
        updateProvider(payload);
        return;
      default:
        return;
    }
  };


  return (
    <AuthContext.Provider value={{ isAuth, contract, blockchain, dispatchEvent }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
