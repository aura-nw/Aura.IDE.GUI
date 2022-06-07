import { createStore } from '@reduxjs/toolkit'
import { default as React } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import generateTree from './generateTree'
// import generateTree from './generateTree';
import './index.css'
import treeReducer from './reducers/treeReducer'
import reportWebVitals from './reportWebVitals'

let data = generateTree()
const raw: any = localStorage.getItem('goclamviec')

if (raw) {
  data = JSON.parse(raw)
}

localStorage.setItem(
  'tb_workspaces',
  JSON.stringify([
    {
      name: 'Workspace 1',
      key: 'tb_workspace_123123123',
    },
  ]),
)

// const tree = generateTree()
const store = createStore(treeReducer, data)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
