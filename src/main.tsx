import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import ConfirmGlobal from './components/confirmGlobal/ConfirmGlobal'
import { ConfirmProvider } from './contexts/ConfirmationModalContext'

const container = document.getElementById("root")

const root = createRoot(container!)

root.render(
  <StrictMode>
    <ConfirmGlobal/>
    <ConfirmProvider>
      <App/>
    </ConfirmProvider>
  </StrictMode>
)


