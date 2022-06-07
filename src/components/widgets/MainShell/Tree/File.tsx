import { AiOutlineFile } from 'react-icons/ai'
import { DiCss3Full, DiHtml5, DiJavascript1, DiReact } from 'react-icons/di'

const FILE_ICONS: any = {
  js: <DiJavascript1 />,
  css: <DiCss3Full />,
  html: <DiHtml5 />,
  jsx: <DiReact />,
}

export const File = ({ name, nodeData, onNodeClick, currentNode }: any) => {
  let ext: any = name.split('.')[1]

  return (
    <div
      onClick={() => onNodeClick(nodeData)}
      className={`cursor-pointer pl-5 flex items-center ${
        currentNode.key === nodeData?.key ? 'bg-gray-200' : ''
      }`}
    >
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span className="ml-1">{name}</span>
    </div>
  )
}
