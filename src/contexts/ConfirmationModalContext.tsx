import { createContext, PropsWithChildren, ReactNode, useCallback, useContext, useRef, useState } from "react";
import Modal, { ModalContentProps } from "../components/modal/Modal";

/** type of props to customize <Modal/>, title, body...*/
type Params = Partial<Omit<ModalContentProps, 'open' | 'onConfirm' | 'onHide' | 'onCancel' >> 

const defaultFunction = (params:Params) => Promise.resolve(true) 

/* default value for the confirmation context */
const defaultValue = {
  confirmRef: {
    current: defaultFunction
  } 
}

/**
 * create a  confirmation context 
 */
const ConfirmContext = createContext(defaultValue)


/**
 * context provider for ConfirmationContext
 *
 * @param {ReactNode}  eg. <ConfirmProvider> <App/> </ConfirmProvider> 
 */
const ConfirmProvider = ({children}: PropsWithChildren ) => {
  // defaultFunction has a 'ref' signature of ref.current  = (params: Params) => Promise(boolean)
  //  and will be replaced after by <ConfirmGlobal/> once mounted
  const confirmRef = useRef(defaultFunction)
  return (
    <ConfirmContext.Provider value={{confirmRef}}>
      {children}
      <ConfirmGlobal/>
    </ConfirmContext.Provider>
  ) 
}

const ConfirmGlobal = () => {
  const [open, setOpen] = useState(false)
  const [props, setProps] = useState<Params>({})
  const {confirmRef} = useContext(ConfirmContext)
  const resolveRef = useRef((_v: boolean) => {})
  // modify value of  confirmContext now currentRef.value in the context will be linked to confirmRef.current in <ConfirmGlobal/>
  // props will contain props for <Modal/> title, body...
  confirmRef.current = (props) =>  new Promise(resolve => {
    setOpen(true)
    setProps(props)
    resolveRef.current = resolve
    })
  const handleConfirm = () => {
    resolveRef.current(true)
    setOpen(false)
  }
  const handleCancel = () => {
    resolveRef.current(false)
    setOpen(false)
  }
  return (
    <Modal
      open={open}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onHide={handleCancel}
      {...props}
    /> 
  )
}


/**
 * hook to use ConfirmationContext
 *
 * @returns {{confirm:(P:Params) => Promise<boolean>}} Promise<true>: confirm button has been clicked, Promise<false>: Cancel button or click on overlay 
 */
const useConfirm = ():{confirm:(p:Params) => Promise<boolean>} =>  { 
  const {confirmRef} = useContext(ConfirmContext)
  return {
    confirm: useCallback((p:Params) =>  confirmRef.current(p), [confirmRef])
  }
}

export {ConfirmProvider, useConfirm}
