import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'
import {generarId} from'./helpers/index.js'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )  

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const[modal, setModal] = useState(false)
  const[animarModal, setAnimarModal] = useState(false)

  const [filtro, setFiltro] = useState('')

  const [gastosFiltrados, setGastosfiltrados] = useState([])

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() =>{
    if(Object.keys(gastoEditar). length > 0){
      setModal(true)

      setTimeout( () =>{
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  // useEffect para el presupuesto 
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

    // useEffect para el filtro

    useEffect(() => {
      if(filtro){
        // console.log('filtrando', filtro)

        // filtrar por categoria
        const gastosFiltrar = gastos.filter(gasto => gasto.categoria === filtro)

        // console.log(gastosFiltrar)

        setGastosfiltrados(gastosFiltrar)
      }
    },[filtro])
  // useEffect para cargar los gastos con un presupuesto valido 
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if ( presupuestoLS > 0 ){
      setIsValidPresupuesto(true)
    }
  },[])

  // useEffect para los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  const handleNuevoGasto = () =>{
      setGastoEditar({})
      console.log('agregastes un nuevo gasto')
      setModal(true)

      setTimeout( () =>{
        console.log('animando modal')
        setAnimarModal(true)
      },500)
  }

  const guardarGasto = gasto =>{
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto ])
    }
  
    setTimeout(() =>{

      setModal(false)
    },500)
  }

  const elimanrGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }
  return (
   <div className={modal  ? 'fijar' : ''}>
     <Header
     gastos={gastos}
     setGastos={setGastos}
     presupuesto={presupuesto}
     setPresupuesto={setPresupuesto}
     setIsValidPresupuesto={setIsValidPresupuesto}
     isValidPresupuesto={isValidPresupuesto}
     />

      {isValidPresupuesto && (
    <>
        <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            >
            </Filtros>
            <ListadoGastos
            setGastoEditar={setGastoEditar}
            gastos={gastos}
            elimanrGasto={elimanrGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
            />
        </main>

      <div className='nuevo-gasto'>
            <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
            />
        </div>
    </>
  )}

    {modal && <Modal
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
              />}
     
   </div>
  )
}

export default App
