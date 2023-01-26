import { createPortal } from 'react-dom'
import './modal.css'


export interface ModalContentProps {
  open: boolean
  onConfirm: () => void 
  onCancel: () => void
  onHide: () => void
  title?: string
  body?: string

}

const ModalContent = ({ open=false, onConfirm, onCancel, onHide, title="", body=""}: ModalContentProps) => {
  if (open === false) return null
  return (
    <div 
      className="modal-overlay d-flex w-100 h-100"
      onClick={onHide}
    >
     <div className="modal-wrapper d-flex w-100 h-50 justify-content-center align-items-center">
       <div className="modale d-flex flex-column w-25 h-50 m-8 shadow rounded bg-light" onClick={e => {e.stopPropagation()}}>
         {/* header */}
         <div className="d-flex justify-content-center align-items-center py-4 bg-light border-bottom">
           <p className="text-wrap text-center">{title}</p>
         </div>
         {/* body */}
         <div className="d-flex flex-grow-1 justify-content-center align-items-center bg-light ">
            <p className="text-wrap text-center">{body}</p>
         </div>
         {/* footer */}
         <div className="d-flex flex-shrink-1 justify-content-center bg-light py-4 border-top ">
           {/* confirm button */}
           <button className="btn btn-outline-primary mx-1" onClick={onConfirm}>confirmer</button>
           {/* cancel button */}
           <button 
             className="btn btn-outline-secondary mx-1"
             onClick={onCancel}
           >
             annuler
           </button>
         </div>
       </div>
     </div>
        
    </div>
  )
}

const Modal = (props: ModalContentProps) => createPortal(<ModalContent {...props}/>, document.body)
 
export default Modal
