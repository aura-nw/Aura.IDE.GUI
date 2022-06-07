import { makeCosmoshubPath } from '@cosmjs/amino';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import axios from 'axios';
import { response } from 'express';

export const getSMSettings = () => {
  const getSMSettings = {
    mnemonic:
            sessionStorage.getItem('wallet_mnemonic'),
        pubkey0: {
            type: 'tendermint/PubKeySecp256k1',
            value: sessionStorage.getItem('wallet_publicKey'),
        },
        address0: sessionStorage.getItem('wallet_address'),
        address1: sessionStorage.getItem('wallet_address'),
  }
  console.log('getSMSettings', getSMSettings);
  
  return {
    mnemonic:
            sessionStorage.getItem('wallet_mnemonic'),
        pubkey0: {
            type: 'tendermint/PubKeySecp256k1',
            value: sessionStorage.getItem('wallet_publicKey'),
        },
        address0: sessionStorage.getItem('wallet_address'),
        address1: sessionStorage.getItem('wallet_address'),
  }
}

export const createAccount = async () => {
  var resp; 
  return axios.post('http://localhost:3002/create-wallet')
  .then(function (response) {
    console.log('response', response);
    resp = response
    const wallet = {
      wallet_mnemonic: resp.data.mnemonic,
      wallet_address: resp.data.account.address,
      wallet_publicKey: resp.data.account.publicKey
    }
    console.log('wallet resp', wallet)
    return wallet;
  })
  .catch(function (error) {
    console.log(error);
  });
  // let mnemonic =
  //   'fox undo purpose tip secret whisper almost bulk casual avocado wife swallow'
  // const path: any = makeCosmoshubPath(1)
  // const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
  //   prefix: 'aura',
  //   hdPaths: [path],
  // })
  //  console.log('wallet',wallet)
  // generateMnemonic();
  
  // const wallet = {
  //   wallet_mnemonic: resp.mnemonic,
  //   wallet_address: resp.account.address,
  //   wallet_publicKey: resp.account.publicKey
  // }
  // console.log('wallet resp', wallet)
  // return await wallet;
}
