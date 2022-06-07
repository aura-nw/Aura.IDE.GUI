import Editor from '@monaco-editor/react'
import React from 'react'
import MenuBar from './MenuBar'

export const Mainframe = (props: any) => {
  const {
    selectedTabIndex,
    selectedTabFiles,
    onChangeEditor,
    editorContent,
  } = props
  return (
    <>
      <MenuBar
        selectedTabFiles={selectedTabFiles}
        selectedTabIndex={selectedTabIndex}
      />
      <Editor
        defaultLanguage={'rush'}
        onChange={onChangeEditor}
        value={editorContent}
      />
    </>
  )
}
