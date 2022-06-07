/* eslint-disable jsx-a11y/anchor-is-valid */
import { yupResolver } from '@hookform/resolvers/yup'
import { ActionIcon, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  IoIosDocument,
  IoIosFolder,
  IoIosSettings,
  IoMdCheckmark,
  IoMdRemove,
} from 'react-icons/io'
import { connect } from 'react-redux'
import * as actions from '../actions/tree.actions'
import { fileNameSchema } from '../yup/schemas/file.schema'
import { Visible } from './core/Visible'
import './Node.scss'

export const Node = (props: any) => {
  const {
    id,
    parentId,
    childIds,
    itemType,
    itemName,
    selecting,
    isEdit,
    closeTab,
    updateEditNode,
  } = props

  const [isNew, setIsNew] = useState(id !== 0 ? isEdit : false)

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: itemName,
    },
    resolver: yupResolver(fileNameSchema),
  })

  const handleRemoveClick = (e: any) => {
    e.preventDefault()

    const { removeChild, deleteNode, parentId, id } = props
    removeChild(parentId, id)
    deleteNode(id)
    debugger
    closeTab(id)
  }

  const renderChild = (childId: any) => {
    const { id } = props
    return (
      <li className="pl-6" key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    )
  }

  const onSaveName = (values: any) => {
    if (values.name) {
      // console.log('values', values)
      const { increment, id } = props
      increment(id, values.name)
      updateEditNode(id, false)
      setIsNew(false)
    }
  }

  const onSelectNode = () => {
    const { selectNode, id } = props
    selectNode(id, itemType)
  }

  const onClickEdit = () => {
    updateEditNode(id, true)
    setIsNew(true)
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSaveName)}>
      <div className="flex block-node">
        <Visible visible={isNew}>
          <div className="flex gap-1">
            <TextInput
              // onChange={onChangeName}
              // defaultValue={name}
              {...register('name')}
              size="xs"
              radius={0}
              className="mt-1"
            />
            <ActionIcon type="submit">
              <IoMdCheckmark />
            </ActionIcon>
          </div>
        </Visible>

        {!isNew && (
          <>
            <div
              className={`flex px-2 items-center gap-1 text-sm cursor-pointer ${
                selecting.nodeId === id ? 'bg-slate-200' : ''
              }`}
              onClick={onSelectNode}
            >
              {itemType === 'folder' ? <IoIosFolder /> : <IoIosDocument />}
              {itemName}
            </div>

            {typeof parentId !== 'undefined' && (
              <div className="action-menu flex-grow">
                <div className="flex">
                  <ActionIcon
                    onClick={onClickEdit} // eslint-disable jsx-a11y/anchor-is-valid
                  >
                    <IoIosSettings />
                  </ActionIcon>
                  <ActionIcon
                    onClick={handleRemoveClick} // eslint-disable jsx-a11y/anchor-is-valid
                  >
                    <IoMdRemove />
                  </ActionIcon>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <ul>{childIds?.map(renderChild)}</ul>
    </form>
  )
}

function mapStateToProps(state: any, ownProps: any) {
  return { ...state.tree[ownProps.id], selecting: state.selecting }
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
