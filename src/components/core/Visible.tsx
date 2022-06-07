import React from 'react'

export const Visible = (props: any) => {
  const { children, visible } = props
  if (!visible) return <></>
  return <>{children}</>
}
