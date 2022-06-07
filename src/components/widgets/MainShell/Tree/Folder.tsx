import { useHover } from '@mantine/hooks'
import { useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'

export const Folder = ({
  name,
  children,
  onNodeClick,
  nodeData,
  currentNode,
}: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const { hovered, ref } = useHover()

  const handleToggle = (e: any) => {
    e.preventDefault()
    switch (e.detail) {
      case 1:
        onNodeClick(nodeData, false)
        break
      case 2:
        setIsOpen(!isOpen)
        break
      default:
        return
    }
  }

  const Collapsible = (props: any) => {
    const { isOpen, children } = props
    if (isOpen) return <>{children}</>
    return <></>
  }

  return (
    <div className="pl-5">
      <div
        className={`flex items-center cursor-pointer ${
          currentNode.key === nodeData?.key ? 'bg-gray-200' : ''
        }`}
        onClick={handleToggle}
      >
        <AiOutlineFolder />
        <span className="ml-1">{name}</span>
      </div>

      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </div>
  )
}
