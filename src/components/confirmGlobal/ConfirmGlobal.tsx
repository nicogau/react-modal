import { useRef, useState } from "react"
import Modal, { ModalContentProps } from "../modal/Modal"

/** type of props to customize <Modal/>, title, body...*/
type ConfirmGlobalProps = Partial<Omit<ModalContentProps, 'open' | 'onConfirm' | 'onHide' | 'onCancel' >> 

/* used as a global variable here */
const confirmAction = {
  //  current has a default value just to please typescript and set a signature current: () => Promise<boolean>
  //  it will be replaced by the ref in <ConfirmGlobal/>
  current: (props:ConfirmGlobalProps) => Promise.resolve(true)
}

/**
 * this function will trigger opening / hiding of the modal 
 * <ConfirmGlobal/> must be mounted  first
 *
 * @param {ConfirmGlobalProps} props: ConfirmGlobalProps (title, body...) information to display in the modal
 * @returns(Promise<boolean>)  true: confirm action, false: cancel action
 */
export const confirm = (props: ConfirmGlobalProps) => confirmAction.current(props)

/**
 * this component will trigger  the overlay with the modal
 * it must be set in a root Component of the project
 * must use function confirm() to trigger hide/show of the modal
 *
 * @returns {[FunctionComponent]} react functional component 
 */
const ConfirmGlobal = () => {
  const [open, setOpen] = useState(false)
  const [props, setProps] = useState<ConfirmGlobalProps>({})

  // assign a default value with a function signature (same as current() function)
  const resolveRef = useRef((_v: boolean) => {})
  
  confirmAction.current = (props) =>  new Promise(resolve => {
    setOpen(true)
    setProps(props)
    console.log(props)
    // when <ConfirmGlobal/> is mounted, function confirm  will be linked to Promise.resolve
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

export default ConfirmGlobal
