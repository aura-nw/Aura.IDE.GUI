import axios from 'axios'
export class FileService {
  //Get list
  static async compileFile(data: any) {
    // return mock
    return axios({
      method: 'post',
      url: '/compile',
      data: data.finalTree,
    }).then((x: any) => {

      localStorage.setItem(
        'compile.schema',
        JSON.stringify(x?.data?.schemas),
      )
      const wasmBase64 = x?.data?.wasm;
      
      localStorage.setItem('compile.wasm_file', x?.data?.wasm)
      console.log("x?.data?.wasm", {
        ...x,
        ...data.settings, 
        wasm: wasmBase64
      });


      if (x){
        return axios({
          method: 'post',
          url: 'http://localhost:3002/upload-contract',
          data: {
            ...data.settings, 
            wasm: wasmBase64
          },
        }).then((y: any) => {
          return {
            ...x.data,
            ...y,
            addressContract: x,
          }
        })
      }
      
    })
  }
}
