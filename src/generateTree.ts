export default function generateTree() {
  let tree: any = {
    selecting: {
      nodeId: 0,
      itemType: 'folder',
    },
    currentSelectedFiles: [],
    currentOpeningFile: '-1',
    addressContract: '',
    terminalLogs: [],
    tree: {
      '0': {
        id: '0',
        isEdit: false,
        counter: 0,
        itemType: 'folder',
        itemName: 'root',
        childIds: [],
        path: '/',
      },
    },
  }
  return tree
}
