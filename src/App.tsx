import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { useCallback, useState } from 'react'
import { confirm as confirmGlobal } from './components/confirmGlobal/ConfirmGlobal'
import { useConfirm } from './contexts/ConfirmationModalContext'

/*
 * grafikart
 * https://www.youtube.com/watch?v=FBVUaC2ZOCE
 */
const App = () => {
  const [counter, setCounter] = useState(0)
  const {confirm} = useConfirm()


  // utilisation d' un context pour trigger l' affichage de la modale
  const incrementWithModalContext = async () => { 
    const resConfirm = await confirm({title:"confirmation avec <ConfirmProvider>", body: "voulez vous vraiment incrémenter?"})
    resConfirm === true &&  setCounter(counter => counter + 1)
  }

  // utilisation d' une globale pour trigger l' affichage de la modale
  const incrementwithModalConfirm = async () => { 
    const resConfirm = await confirmGlobal({title:"confirmation avec <ConfirmGlobal/>", body:"voulez vous incrémenter le compteur"})
    resConfirm === true && setCounter(counter => counter + 1)
  }

  return (
    <div id="app">
      <div className="d-flex justify-content-center py-4">
        <h1 className="fs-1">Compteur</h1>
      </div>
      <div className="container h-100">
         <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{height:"100%!important"}}>
           <div>
             <div className="d-flex justify-content-center align-items-center py-4">
               <p className= "m-auto" >click on buttons to increment</p>
             </div>
             <div className="d-flex justify-content-center">
               <div>
                 <p className="text-center">count:{`${counter}`}</p>
                 <button className="btn btn-info mx-2" onClick={incrementWithModalContext}>increment</button>
                 <button className="btn btn-secondary mx-2" onClick={incrementwithModalConfirm}>increment</button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   
  )
}

export default App
