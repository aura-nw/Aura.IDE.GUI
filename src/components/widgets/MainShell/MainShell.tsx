import { ActionIcon, AppShell } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {
  IoCheckmarkOutline,
  IoDocumentsOutline,
  IoNavigateCircleOutline,
} from 'react-icons/io5'
import { connect } from 'react-redux'
import * as actions from '../../../actions/tree.actions'
import { createAccount } from '../../../helpers/aura.helper'
import { WalletService } from '../../../services/wallet.services'
import { Visible } from '../../core/Visible'
import CompilerSettings from './CompilerSettings'
import { Mainframe } from './Mainframe'
import SideBar from './SideBar'
import Terminal from './Terminal'
import Testframe from './Testframe'

export const getWalletAddress = () => {
  const wallet = sessionStorage.getItem('wallet_address') ?? ''
  console.log('getWalletAddress', wallet)
  return wallet
}

export const getWalletMemonic = () => {
  const wallet_mnemonic = sessionStorage.getItem('wallet_mnemonic') ?? ''
  return wallet_mnemonic
}

const MainShell = (props: any) => {
  const { currentSelectedFiles, tree, currentOpeningFile, selecting } = props
  const currentOpeningFileData = tree[currentOpeningFile]
  const [editorContent, setEditorContent] = useState<any>('')
  const [menu, setMenu] = useState(0)
  const [isCompiled, setIsCompiled] = useState(false)
  const [wallet, setWallet] = useState(0)

  useEffect(() => {
    localStorage.setItem('goclamviec', JSON.stringify(props))
  }, [props])


  // useEffect(() => {
  //   createAccount().then((x: any) => {
  //     console.log('take x', x)
  //     sessionStorage.setItem('wallet_mnemonic', x.wallet_mnemonic)
  //     sessionStorage.setItem('wallet_address', x.wallet_address)
  //     sessionStorage.setItem('wallet_publicKey', x.wallet_publicKey)
  //   })
  // }, [])

  useEffect(() => {
    createAccount().then((x: any) => {
      console.log('take x', x)
      sessionStorage.setItem('wallet_mnemonic', x.wallet_mnemonic)
      sessionStorage.setItem('wallet_address', x.wallet_address)
      sessionStorage.setItem('wallet_publicKey', x.wallet_publicKey)

      const depositParams = {
        Address: getWalletAddress(),
        Coin: '10000000uaura',
      }
      console.log('depositParams', depositParams);

      WalletService.deposit(depositParams).then((response: any) => {
        const moneyString: string = response?.data ? response?.data : '0'
        setWallet(parseInt(moneyString))
        console.log('moneyString', moneyString)
      })
    })
  }, [])

  useEffect(() => {
    setEditorContent('')
    let currentOpen = currentOpeningFile

    console.log('currentOpen', currentOpen, currentSelectedFiles)
    const isFound = currentSelectedFiles.find(
      (x: any) => x === currentOpeningFile,
    )
    if (!isFound && currentSelectedFiles.lenght) {
      currentOpen = currentSelectedFiles.find(
        (x: any) => x !== currentOpeningFile,
      )
    }
    if (currentOpen !== '-1' && currentOpen.length > 0) {
      const rawFromLocalStorage = localStorage.getItem(currentOpen)
      console.log('rawFromLocalStorage', rawFromLocalStorage)
      if (rawFromLocalStorage == null) {
        const initialContent = `// New file. Created on ${new Date().toLocaleTimeString()}`
        localStorage.setItem(currentOpen, initialContent)
        setEditorContent(initialContent)
      } else {
        setEditorContent(rawFromLocalStorage)
      }
    }
  }, [currentOpeningFile, currentSelectedFiles])

  const onChangeEditor = (content: any) => {
    if (currentOpeningFile !== -1) {
      localStorage.setItem(currentOpeningFile, content)
    }
  }

  const getListFiles = () => {
    return currentSelectedFiles.map((x: any) => {
      return tree[x]
    })
  }

  const selectedTabFiles: any[] = getListFiles()

  const selectedTabIndex =
    selectedTabFiles.findIndex((x: any) => x.id === currentOpeningFile) ?? 0

  const [tabs, setTabs] = useState<any>([
    {
      id: 0,
      content: '',
      name: 'README.md',
      language: 'c',
      active: true,
      path: 'readme_md',
    },
  ])
  const [workspace, setWorkspace] = useState<any>()

  const [selectedWorkspace, setSelectedWorkspace] = useState<any>()

  useEffect(() => {
    fetchWorkspace()
  }, [])

  const fetchWorkspace = () => {
    const local_WorkSpace: any = localStorage.getItem('tb_workspaces')
    setWorkspace(JSON.parse(local_WorkSpace))
  }

  useEffect(() => {
    if (workspace) {
      setSelectedWorkspace(workspace[0])
    }
  }, [workspace])

  const handleSelectFile = (file: any) => {
    const newState = tabs.map((x: any) => {
      return {
        ...x,
        active: false,
      }
    })
    setTabs([
      ...newState,
      ...[
        {
          ...file,
          active: true,
        },
      ],
    ])
  }

  const onChangeWorkspace = (val: any) => {
    const selected = workspace.find((x: any) => x.key == val)
    setSelectedWorkspace(selected)
  }

  const menus = [
    {
      tab: 0,
      icon: IoDocumentsOutline,
    },
    {
      tab: 1,
      icon: IoNavigateCircleOutline,
    },
    {
      tab: 2,
      icon: IoCheckmarkOutline,
    },
  ]

  const onChangeMenu = (tab: any) => {
    setMenu(tab)
  }

  return (
    <>
      <div className="flex gap-2 bg-black text-white p-2">
        <span className="text-xs font-semibold">Address:</span>
        <div className="text-xs overflow-ellipsis">{getWalletAddress()}</div>
        <div className="text-xs overflow-ellipsis">{wallet}</div>
      </div>
      <AppShell
        padding="md"
        navbar={
          <div className="grid grid-cols-12">
            <div className="col-span-2 bg-black">
              <div className="flex flex-col py-5 px-3 gap-3">
                {menus.map((x: any, idx: any) => {
                  const IconComponent = x.icon

                  return (
                    <ActionIcon
                      key={idx}
                      size="lg"
                      onClick={() => onChangeMenu(x.tab)}
                      className="w-full"
                    >
                      <IconComponent size={22} />
                    </ActionIcon>
                  )
                })}
              </div>
            </div>
            <div className="col-span-10">
              <Visible visible={menu === 0}>
                <SideBar
                  workspace={workspace}
                  selectedWorkspace={selectedWorkspace}
                  onChangeWorkspace={onChangeWorkspace}
                  onSelectFile={handleSelectFile}
                />
              </Visible>
              <Visible visible={menu === 1}>
                <CompilerSettings
                  onFinish={() => setIsCompiled(true)}
                  file={currentOpeningFileData}
                />
              </Visible>
              <Visible visible={menu === 2}>
                <Testframe isCompiled={isCompiled} />
              </Visible>
            </div>
          </div>
        }
        classNames={{
          main: 'p-0 h-full',
        }}
      >
        <div className="h-screen flex flex-col justify-between">
          <div className="h-2/3 overflow-auto">
            <Mainframe
              selectedTabIndex={selectedTabIndex}
              selectedTabFiles={selectedTabFiles}
              onChangeEditor={onChangeEditor}
              editorContent={editorContent}
            />
          </div>
          <Terminal />
        </div>
      </AppShell>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  ...state,
})

export default connect(mapStateToProps, actions)(MainShell)
