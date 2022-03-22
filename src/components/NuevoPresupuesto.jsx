import {useState} from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto, 
  setIsValidPresupuesto
}) => {

  const [mensaje, setMensaje]= useState('')

  const hanledPresupuesto = (e) =>{

      e.preventDefault()

    if(!presupuesto || presupuesto < 0){

      setMensaje('no es valido')
      return
    }

      console.log(presupuesto)
      setMensaje('')
      setIsValidPresupuesto(true)
    
    
  }

  return(
      <div className='contenedor-presupuesto contenedor sombra'>
          <form onSubmit={hanledPresupuesto} className='formulario'>
              <div className='campo'>
                <label>
                  definir presupuesto
                </label>
                <input 
                className='nuevo-presupuesto'
                type="number"
                placeholder='añade tu presupuesto'
               value={presupuesto}
               onChange={(e) => setPresupuesto(Number (e.target.value))}
                />
              </div>
              <input type="submit" value="añadir"/>
              {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          </form>
      </div>
  )
};

export default NuevoPresupuesto;
