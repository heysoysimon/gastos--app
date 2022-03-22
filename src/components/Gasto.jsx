import React from 'react'

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import {formatearFecha} from '../helpers/index.js'
import iconoAhorro from '../img/icono_ahorro.svg'
import iconoComida from '../img/icono_comida.svg'
import iconoCasa from '../img/icono_casa.svg'
import iconoGastos from '../img/icono_gastos.svg'
import iconoOcio from '../img/icono_ocio.svg'
import iconoSalud from '../img/icono_salud.svg'
// import iconoSuscriciones from '../img/icono_suscripciones.svg'


const iconosDicionarios={
  Ahorro:iconoAhorro,
  Comida:iconoComida,
  Casa:iconoCasa,
  Gastos:iconoGastos,
  Ocio:iconoOcio,
  Salud:iconoSalud,
  // Suscriciones:iconoSuscriciones
}

const Gasto = ({gasto,setGastoEditar,elimanrGasto}) => {
    const{categoria, nombre, cantidad, id,fecha } = gasto

    const leadingActions = () => (
      <LeadingActions>
          <SwipeAction onClick={() => setGastoEditar(gasto)}>
              Editar
          </SwipeAction>
      </LeadingActions>
  )

      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
           onClick={() => elimanrGasto(id)}
           destructive={true}
           >
              eliminar
          </SwipeAction>
        </TrailingActions>
      )
  return (
    <SwipeableList>
      <SwipeableListItem
         leadingActions={ leadingActions()}
         trailingActions={ trailingActions()}
      >
          <div className='gastos sombra'>
            <div className='contenido-gasto'>

              <img 
              src={iconosDicionarios[categoria]} 
              alt="Icono Gasto" 
              />

              <div className='descripcion-gasto'>
                  <p className='categoria'>{categoria}</p>
                  <p className='nombre-gasto'>{nombre}</p>
                  <p className='fecha-gasto'>
                    Agregado el: {''}
                    <span>{formatearFecha(fecha)}</span>
                  </p>
              </div>
              <p className='cantidad-gasto'>${cantidad}</p>
            </div>
          </div>
    </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto