import { Button, Checkbox, Divider, Navbar, Select, Space } from '@mantine/core'
import { Base64 } from 'js-base64'
import React from 'react'
import { IoIosRefresh } from 'react-icons/io'
import { connect } from 'react-redux'
import * as actions from '../../../actions/tree.actions'
import { getSMSettings } from '../../../helpers/aura.helper'
import { FileService } from '../../../services/file.service'

const CompilerSettings = (props: any) => {
  const {
    file,
    addTerminalLog,
    currentOpeningFile,
    addressContract,
    tree,
    onFinish,
    updateAddressContract,
  } = props
  const compilerOptions = [
    {
      label: 'Rush',
      value: 'rush',
    },
  ]

  const languageOptions = [
    {
      label: 'Rush',
      value: 'rush',
    },
  ]

  const evmOptions = [
    {
      label: 'london',
      value: 'london',
    },
  ]

  const traversal = (tree: any, node: any) => {
    let paths: any[] = []
    const recursion = (node: any) => {
      const parent = tree.find((x: any) => x?.childs.includes(node.id))
      if (!parent || parent.id === '0') {
        return
      }
      paths.push(parent.name)
      recursion(parent)
    }
    recursion(node)
    if (node.id === '0') return 'root'
    const finalString = paths.length
      ? `${paths.reverse().join('/')}/${node.name}`
      : `${node.name}`

    return finalString
  }

  const onCompile = () => {
    const rawFromLocalStorage = localStorage.getItem(currentOpeningFile)
    if (!rawFromLocalStorage) {
      localStorage.setItem(currentOpeningFile, '')
    }

    let treeArr = []
    const clonedTree = { ...tree }
    Object.keys(clonedTree).forEach(function (key) {
      const data = tree[key]
      clonedTree[key] = {
        id: data.id,
        type: data.itemType,
        name: data.itemName,
        childs: data.childIds ? data.childIds : [],
        path: data.path,
        content:
          data.itemType === 'file'
            ? Base64.encode(localStorage.getItem(data.id))
            : '',
      }
      treeArr.push(clonedTree[key])
    })

    const finalTree = treeArr.map((x: any) => {
      return {
        type: x.type,
        name: x.name,
        content: x.content,
        path: traversal(treeArr, x),
      }
    })

    const requestParams = {
      finalTree: finalTree,
      settings: getSMSettings(),
    }

    FileService.compileFile(requestParams).then((response: any) => {
      console.log('5000 anh em', response)
      // localStorage.setItem('compile.jsSchema', response?.data?.jsSchema)

      // hien check
      updateAddressContract(response?.data?.addressContract)

      console.log(
        "take ressssss datadadasd", response.data
      );

      console.log("compilied round 1", response)
      addTerminalLog({
        message: response?.message,
        success: response?.success,
      })
      onFinish && onFinish()
    })
  }

  return (
    <Navbar padding="xs">
      <div className="font-semibold">AURA COMPILER</div>
      <Space h="md" />
      <div className="flex flex-col gap-3">
        <div>
          <Select
            label="COMPILER"
            size="xs"
            defaultValue={compilerOptions[0].value}
            data={compilerOptions}
          />
        </div>
        <div>
          <Select
            label="LANGUAGE"
            size="xs"
            defaultValue={languageOptions[0].value}
            data={languageOptions}
          />
        </div>
        <Divider />
        <div>
          <div className="text-xs">COMPILER CONFIGURATION</div>

          <Select
            label="EVM VERSION"
            size="xs"
            defaultValue={evmOptions[0].value}
            data={evmOptions}
          />
        </div>
        <div>
          <Checkbox size="xs" label="Auto compile" />
        </div>
        <div>
          <Checkbox size="xs" label="Enable optimization" />
        </div>
        <div>
          <Checkbox size="xs" label="Hide warnings" />
        </div>
      </div>
      <Space h="md" />
      <Divider />
      <Space h="md" />
      <Button
        onClick={onCompile}
        // disabled={!file?.id}
        variant="filled"
        leftIcon={
          <>
            <IoIosRefresh />
          </>
        }
        className="bg-black"
        color={'black'}
        fullWidth
      >
        Compile
      </Button>
    </Navbar>
  )
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...state,
  ...ownProps,
})

export default connect(mapStateToProps, actions)(CompilerSettings)
