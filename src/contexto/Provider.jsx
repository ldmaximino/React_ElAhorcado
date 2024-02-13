import { useState } from "react"
import Contexto from "./Contexto"

export const Provider = ({children}) => {
  const [respuesta, setRespuesta] = useState("");
  const [palabraPista, setPalabraPista] = useState({
    palabraIng: '',
    pistaIng: ''
  });

  const escribirRespuesta = (aGuardar="") => {
    setRespuesta(aGuardar);
  }

  return ( 
    <Contexto.Provider value={{
        //acá van todas las variables a compartir en el proyecto
        escribirRespuesta,
        respuesta,
        palabraPista,
        setPalabraPista
    }}>
        {children}
    </Contexto.Provider>
  )
}
