import axios from 'axios'
export class WalletService {
  //Get list
  static async deposit(data: any) {
    // return mock
    return axios({
      method: 'post',
      url: '/deposit',
      data: data,
    })
  }
}
