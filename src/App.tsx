import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions/tree.actions'
import './App.css'
import MainShell from './components/widgets/MainShell/MainShell'
import { createAccount } from './helpers/aura.helper'
import { AppService } from './services/aura.service'

function App(props: any) {
  const { resetTerminalLog, updateAccount } = props

  // useEffect(() => {
  //   createAccount().then((x: any) => {
  //     console.log('take x', x)
  //     sessionStorage.setItem('wallet_mnemonic', x.wallet_mnemonic)
  //     sessionStorage.setItem('wallet_address', x.wallet_address)
  //     sessionStorage.setItem('wallet_publicKey', x.wallet_publicKey)
  //   })
  // }, [])

  useEffect(() => {
    resetTerminalLog()
  }, [])
  return (
    <>
      {/* <Node id={0} /> */}
      <MainShell />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  ...state,
})

export default connect(mapStateToProps, actions)(App)
