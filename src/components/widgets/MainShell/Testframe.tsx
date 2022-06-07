import { Navbar, Space } from '@mantine/core'
import { Base64 } from 'js-base64'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions/tree.actions'
import { getSMSettings } from '../../../helpers/aura.helper'
import { WasmService } from '../../../services/wasm.services'
import { Visible } from '../../core/Visible'
import { UnitBlock } from './Test/UnitBlock'

const Testframe = (props: any) => {
  const { addTerminalLog, addressContract } = props
  const [isCompiled, setIsCompiled] = useState(false)
  const [processFiles, setProcessFiles] = useState(() => {
    const wasm = localStorage.getItem('compile.wasm_file')
    // const jsSchema = localStorage.getItem('compile.jsSchema')
    const jsSchema = JSON.parse(localStorage.getItem('compile.schema'))
    return {
      wasm: wasm,
      schemaModel: jsSchema,
    }
  })

  useEffect(() => {
    const wasm = localStorage.getItem('compile.wasm_file')
    // const jsSchema = localStorage.getItem('compile.jsSchema')
    const jsSchema = JSON.parse(localStorage.getItem('compile.schema'))
    if (jsSchema) {
      setIsCompiled(true)
      setProcessFiles({
        wasm: wasm,
        schemaModel: jsSchema,
      })
    }
  }, [])


  console.log("processFilesprocessFiles", processFiles);



  const getFunctionsDeclarations = () => {
    console.log("getFUnctionsDEclare", processFiles);

    if (!processFiles?.schemaModel) return []

    const schemaResults: any[] = processFiles?.schemaModel.map((x: any) => JSON.parse(Base64.decode(x))) ?? []
    const finalList = schemaResults.filter((x: any) => x?.oneOf);
    console.log("finaList", finalList);
    const listOneOf = finalList.map((x: any) => x.oneOf);
    let listFuncs = []
    listOneOf.forEach((x: any) => {
      listFuncs = [...listFuncs, ...x]
    })
    return listFuncs;
    // return schemaResults
  }

  // const getFunctionsDeclarations = () => {
  //   console.log('jsSchema', processFiles.jsSchema)
  //   if (!processFiles?.jsSchema) return []
  //   const jsResult: any = FunctionBase.findDeclarations(processFiles.jsSchema)
  //   if (!jsResult?.funcs) {
  //     return []
  //   }
  //   return jsResult?.funcs
  // }


  const onTestFunction = (functionName: any, values: any) => {
    // const funcParams = values
    //   ? Object.keys(values).map(function (key: any) {
    //     return values[key]
    //   })
    //   : {}

    const settings = {
      funcName: functionName,
      funcdata: values,
      wasm64: processFiles.wasm,
      settings: getSMSettings(),
      queryType: 'excute',
      contractAddress: addressContract,
    }

    return WasmService.callFunctionFromWasm(settings)
  }

  console.log("getFunctionsDeclarationsgetFunctionsDeclarations", getFunctionsDeclarations());


  return (
    <div className="overflow-y-auto">
      <Navbar padding="xs">
        <div className="font-semibold">UNIT TEST</div>
        <Space h="md" />
        <Visible visible={isCompiled}>
          <div className="flex flex-col gap-5">
            <>
              {getFunctionsDeclarations().map((x: any, idx: any) => {
                const requiredFunctions = x.required
                const functions = x.properties ?? [];

                return Object.keys(functions).map((key: any) => {
                  console.log('FUNCTION', key, functions[key])
                  const data = functions[key]
                  return (
                    <UnitBlock
                      name={key}
                      properties={data.properties}
                      required={data.required}
                      onTest={onTestFunction}
                    />
                  )
                })
              })}
            </>
          </div>
        </Visible>
        <Visible visible={!isCompiled}>
          <code className="text-sm text-center">
            You need to compile your code first!
          </code>
        </Visible>
      </Navbar>
    </div>
  )
}

const mapStateToProps = (state: any, ownStates: any) => ({
  ...state,
  ...ownStates,
})

export default connect(mapStateToProps, actions)(Testframe)
