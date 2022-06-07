import axios from 'axios'

export class WasmService {
  static async callFunctionFromWasm(data: any) {
    return axios({
      method: 'post',
      url: 'http://localhost:3002/call-function-by-name',
      data: data,
    })
  }
}
