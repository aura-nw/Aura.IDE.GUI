import React from 'react'
import { File } from './File'
import { Folder } from './Folder'

const TreeRecursive = ({ data, onNodeClick, currentNode }: any) => {
  // loop through the data
  return data.map((item: any) => {
    // if its a file render <File />
    if (item.type === 'file') {
      return (
        <File
          currentNode={currentNode}
          onNodeClick={onNodeClick}
          nodeData={item}
          name={item.name}
        />
      )
    }
    // if its a folder render <Folder />
    if (item.type === 'folder') {
      return (
        <Folder
          currentNode={currentNode}
          onNodeClick={onNodeClick}
          nodeData={item}
          name={item.name}
        >
          {/* Call the <TreeRecursive /> component with the current item.childrens */}
          <TreeRecursive
            currentNode={currentNode}
            onNodeClick={onNodeClick}
            data={item.childrens}
          />
        </Folder>
      )
    }
  })
}

const Tree = ({ data, children, onNodeClick, currentNode }: any) => {
  const isImparative = data && !children
  return (
    <div>
      {isImparative ? (
        <TreeRecursive
          data={data}
          currentNode={currentNode}
          onNodeClick={onNodeClick}
        />
      ) : (
        children
      )}
    </div>
  )
}

Tree.File = File
Tree.Folder = Folder

export default Tree
