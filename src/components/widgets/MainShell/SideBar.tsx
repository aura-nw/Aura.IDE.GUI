import { ActionIcon, Navbar, Select, Space } from '@mantine/core'
import React from 'react'
import { IoIosArrowDown, IoMdDocument, IoMdFolder } from 'react-icons/io'
import { IoCloudUpload } from 'react-icons/io5'
import { connect } from 'react-redux'
import * as actions from '../../../actions/tree.actions'
import { TreeDirectories } from './TreeDirectories'

const SideBar = (props: any) => {
  const {
    workspace,
    selectedWorkspace,
    onChangeWorkspace,
    createNode,
    addChild,
    selecting,
    selectNode,
  } = props

  const addNewItem = (
    type: string = 'folder',
    name: string = 'New Folder',
    isEdit: boolean = true,
  ) => {
    const childId = createNode(type, name, isEdit).nodeId
    if (selecting.itemType === 'folder') {
      addChild(selecting.nodeId, childId)
    } else {
      addChild(selecting.parentId, childId)
    }
    return childId
  }

  const onAddNewFolder = () => {
    addNewItem()
  }

  const onAddNewFile = () => {
    addNewItem('file', 'New File')
  }

  const getWorkspaceOptions = () => {
    if (!workspace) return []
    return workspace.map((x: any) => {
      return {
        label: x?.name,
        value: x?.key,
      }
    })
  }

  const onUploadFile = (e: any) => {
    const file = e.target.files[0]
    const fileName = file.name
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target.result
      const fileId = addNewItem('file', fileName, false)
      localStorage.setItem(fileId, text.toString())
      selectNode(fileId, 'file')
    }
    reader.readAsText(e.target.files[0])
  }

  const workspaceOptions: any = getWorkspaceOptions()
  return (
    <Navbar padding="xs">
      <div className="flex justify-between items-center">
        <label>FILE EXPLORERS</label>
        icon
      </div>

      <Space h={'md'} />
      {/* work space   */}
      <div>
        <div className="flex gap-2 items-center">
          Workspaces
          <div className="flex">
            {/* <ActionIcon>
              <IoIosAddCircleOutline />
            </ActionIcon>
            <ActionIcon>
              <IoMdCreate />
            </ActionIcon>
            <ActionIcon>
              <IoIosTrash />
            </ActionIcon> */}
          </div>
        </div>
        <Select
          onChange={onChangeWorkspace}
          value={selectedWorkspace?.key}
          data={workspaceOptions}
        />
        <Space h="sm" />
        <div className="flex gap-1 items-center">
          <IoIosArrowDown />
          <div className="flex">
            <ActionIcon onClick={onAddNewFolder}>
              <IoMdFolder />
            </ActionIcon>
            <ActionIcon onClick={onAddNewFile}>
              <IoMdDocument />
            </ActionIcon>
            <input
              type="file"
              onChange={onUploadFile}
              style={{ display: 'none' }}
              id="contained-button-file"
            />
            <label htmlFor="contained-button-file">
              <ActionIcon component="span">
                <IoCloudUpload />
              </ActionIcon>
            </label>
          </div>
        </div>
        <div className="pl-5">
          <TreeDirectories />
        </div>
      </div>
    </Navbar>
  )
}

const mapStateToProps = (state: any, ownProps?: any) => ({
  ...state,
  ...ownProps,
})

export default connect(mapStateToProps, actions)(SideBar)
