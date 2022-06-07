import { v4 as uuidv4 } from 'uuid'

export const INITIAL_TREE = 'INITIAL_TREE'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const INCREMENT = 'INCREMENT'
export const SELECT_NODE = 'SELECT_NODE'
export const INITIAL_WORKSPACE = 'INITIAL_WORKSPACE'
export const UPDATE_EDIT_NOTE = 'UPDATE_EDIT_NOTE'
export const ADD_TERMINAL_LOG = 'ADD_TERMINAL_LOG'
export const RESET_TERMINAL_LOG = 'RESET_TERMINAL_LOG'
export const CLOSE_TAB = 'CLOSE_TAB'
export const GET_ALL_DATA = 'GET_ALL_DATA'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPDATE_ADDRESS_CONTRACT = 'UPDATE_ADDRESS_CONTRACT'

export const updateAccount = (data: any) => ({
  type: updateAccount,
  data,
})

export const initialWorkspace = (data: any) => ({
  type: INITIAL_WORKSPACE,
  data,
})

export const increment = (nodeId: any, itemName: any, itemType: any) => ({
  type: INCREMENT,
  nodeId,
  itemName: itemName,
})

export const getAllData = () => ({
  type: GET_ALL_DATA,
  nodeId: 0,
})

export const selectNode = (nodeId: any, itemType: any) => ({
  type: SELECT_NODE,
  nodeId: nodeId,
  itemType: itemType,
})

export const closeTab = (nodeId: any) => ({
  type: CLOSE_TAB,
  nodeId: nodeId,
})

export const updateEditNode = (nodeId: any, isEdit: any) => ({
  type: UPDATE_EDIT_NOTE,
  nodeId: nodeId,
  isEdit: isEdit,
})

export const createNode = (type: any, name: any, isEdit: any) => ({
  type: CREATE_NODE,
  nodeId: uuidv4(),
  itemType: type,
  itemName: name,
  isEdit: isEdit,
})

export const addTerminalLog = (log: any) => ({
  type: ADD_TERMINAL_LOG,
  terminalLog: log,
})

export const resetTerminalLog = () => ({
  type: RESET_TERMINAL_LOG,
})

export const deleteNode = (nodeId: any) => ({
  type: DELETE_NODE,
  nodeId,
})

export const addChild = (nodeId: any, childId: any) => ({
  type: ADD_CHILD,
  nodeId,
  childId,
})

export const removeChild = (nodeId: any, childId: any) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId,
})

export const updateAddressContract = (addressContract: any) => ({
  type: UPDATE_ADDRESS_CONTRACT,
  addressContract,
})
