import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TransactionsProvider } from './context/TransactionContext'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionsProvider> 
    <React.StrictMode>
     <Provider store={store}>
     <App />
     </Provider>
    </React.StrictMode>,
  </TransactionsProvider>
)
