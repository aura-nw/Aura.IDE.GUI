import { ActionIcon, Tabs } from '@mantine/core'
import React from 'react'
import { IoIosDocument } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { connect } from 'react-redux'
import * as actions from '../../../actions/tree.actions'

const MenuBar = (props: any) => {
  const { selectedTabIndex, selectedTabFiles } = props

  const onSelectTab = (x: any) => {
    const { selectNode } = props
    selectNode(x.id, 'file')
  }

  const onCloseTab = (x: any, e: any) => {
    const { closeTab } = props
    closeTab(x.id)
  }

  return (
    <>
      <Tabs active={selectedTabIndex}>
        {selectedTabFiles.map((x: any, idx: any) => (
          <Tabs.Tab
            key={idx}
            label={
              <div
                onClick={() => onSelectTab(x)}
                className="flex justify-between items-center"
              >
                <label className="flex items-center gap-2">
                  <IoIosDocument />
                  {x.itemName}
                </label>
                <ActionIcon
                  onClick={(e: any) => onCloseTab(x.id, e)}
                  variant="transparent"
                >
                  <IoClose />
                </ActionIcon>
              </div>
            }
          ></Tabs.Tab>
        ))}
        <Tabs.Tab key={1} label={'README.md'} icon={<IoIosDocument />} />
      </Tabs>
    </>
  )
}

function mapStateToProps(state: any, ownProps: any) {
  return { ...state.tree[ownProps.id], selecting: state.selecting }
}

const ConnectedNode = connect(mapStateToProps, actions)(MenuBar)
export default ConnectedNode
