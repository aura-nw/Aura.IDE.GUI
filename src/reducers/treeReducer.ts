/* eslint-disable import/no-anonymous-default-export */

import {
  ADD_CHILD,
  ADD_TERMINAL_LOG,
  CLOSE_TAB,
  CREATE_NODE,
  GET_ALL_DATA,
  INCREMENT,
  REMOVE_CHILD,
  RESET_TERMINAL_LOG,
  SELECT_NODE,
  UPDATE_ACCOUNT,
  UPDATE_ADDRESS_CONTRACT,
  UPDATE_EDIT_NOTE,
} from '../actions/tree.actions'

const childIds = (state: any, action: any) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId]
    case REMOVE_CHILD:
      return state.filter((id: any) => id !== action.childId)
    default:
      return state
  }
}

export const node = (state: any, action: any) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        counter: 0,
        itemType: action.itemType,
        itemName: action.itemName,
        isEdit: action.isEdit,
        childIds: [],
      }
    case INCREMENT:
      return {
        ...state,
        itemName: action.itemName,
      }
    case UPDATE_EDIT_NOTE:
      return {
        ...state,
        isEdit: action.isEdit,
      }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action),
      }
    default:
      return state
  }
}

export default (state: any = {}, action: any) => {
  const { nodeId, type, itemType } = action

  if (type === UPDATE_ACCOUNT) {
    return {
      ...state,
      action,
    }
  }

  if (type === UPDATE_ADDRESS_CONTRACT) {
    debugger
    return {
      ...state,
      addressContract: action,
    }
  }

  if (type === GET_ALL_DATA) {
    return {
      ...state,
    }
  }

  if (type === ADD_TERMINAL_LOG) {
    return {
      ...state,
      terminalLogs: [...state.terminalLogs, ...[action.terminalLog]],
    }
  }

  if (type === RESET_TERMINAL_LOG) {
    return {
      ...state,
      terminalLogs: [],
    }
  }

  if (type === CLOSE_TAB) {
    localStorage.removeItem(nodeId)
    let currentSelectedFiles = state.currentSelectedFiles
    let newSelectedFiles = currentSelectedFiles.filter((x: any) => x !== nodeId)
    let currentOpeningFile = newSelectedFiles.find((x: any) => x !== nodeId)
    // close tab
    return {
      ...state,
      currentOpeningFile: currentOpeningFile,
      currentSelectedFiles: newSelectedFiles,
    }
  }

  if (type === SELECT_NODE) {
    let currentSelectedFiles = state.currentSelectedFiles
    let currentOpeningFile = -1
    let parentNodeId = 0
    // current select node data
    const nodeData = state.tree[nodeId]
    Object.entries(state.tree).forEach((x: any) => {
      const childs: any[] = x[1].childIds
      const parent = childs.find((x: any) => nodeId)
      if (parent) {
        parentNodeId = x[1].id
        console.log(parentNodeId)
      }
    })

    if (itemType === 'file') {
      const isFoundInList = currentSelectedFiles.findIndex(
        (x: any) => x === nodeId,
      )
      if (isFoundInList === -1) {
        currentSelectedFiles.push(nodeId)
      }
      currentOpeningFile = nodeId
    }
    return {
      ...state,
      selecting: {
        data: nodeData,
        parentId: parentNodeId,
        nodeId,
        itemType,
      },
      currentSelectedFiles: currentSelectedFiles,
      currentOpeningFile: currentOpeningFile,
    }
  }

  if (typeof nodeId === 'undefined') {
    return state
  }

  return {
    ...state,
    tree: {
      ...state.tree,
      [nodeId]: node(state.tree[nodeId], action),
    },
  }
}
