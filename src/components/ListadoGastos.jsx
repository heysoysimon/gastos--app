import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos,
    setGastoEditar, 
    elimanrGasto,
    filtro,
    gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
        

        {filtro ?(
          <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'no hay gastos en esta categoria '}</h2>
            {gastosFiltrados.map(gasto => (
              <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              elimanrGasto={elimanrGasto}
              ></Gasto>
          ))}
          </>
          ):(
            <>
            <h2>{gastos.length ? 'Gastos' : 'no hay gastos aun '}</h2>
            {gastos.map(gasto => (
              <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              elimanrGasto={elimanrGasto}
              ></Gasto>
          ))}
          
          </>
          )
        }
    </div> 
  )
}

export default ListadoGastos