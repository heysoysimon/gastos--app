import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';
import { useState,useEffect } from 'react';

const Modal = ({
setModal,
animarModal,
setAnimarModal, 
guardarGasto, 
gastoEditar,
setGastoEditar
    }) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')
    useEffect(() => {
        if(Object.keys(gastoEditar). length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar. cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    },[])

    const ocultarModal = () =>{
       
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() =>{

            setModal(false)
        },500)
    }
    const handleSubmit = e =>{
        e.preventDefault()
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            },3000)
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }
  return(
    <div className="modal">
        <div className="cerrar-modal">
            <img
            src={cerrarBtn}
            alt="cerrar modal"
            onClick={ocultarModal}
            />
        </div>
        <form
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input type="text" 
                id='nombre'
                placeholder='añade el nombre del gasto'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
        
                
                 <label htmlFor="Cantidad">Cantidad</label>

                <input type="number" 
                id='cantidad'
                placeholder='añade la cantidad  del gasto: ej 300'
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))} />
            </div>
            
            <div className="campo">
                <label htmlFor="Categoria">Categoria</label>

                <select
                id='categoria'
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Selecione --</option>
                    <option value="Ahorro">Ahorro</option>
                    <option value="Comida">Comida</option>
                    <option value="Casa">Casa</option>
                    <option value="Gastos">Gastos</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Salud">Salud</option>
                    {/* <option value="Suscripciones">Suscripciones</option> */}
                </select>
                
            <input 
                 type="submit"
                 value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir Gasto'}
            />

            </div>
        </form>
    </div>
  )
};

export default Modal;
