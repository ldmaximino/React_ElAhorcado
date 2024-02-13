import { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom"
import Contexto from "../contexto/Contexto";

export const IngresoPalabra = () => {
  const navegacion = useNavigate();
  const { palabraPista, setPalabraPista } = useContext(Contexto);
  const [ validaPalabra, setValidaPalabra ] = useState(false);
  const [ inputPalabra, setInputPalabra] = useState(false);
  const [ validaPista, setValidaPista ] = useState(false);
  const [ inputPista, setInputPista] = useState(false);

  const handlePalabra = (e) => {
    if(e.target.name === "palabraIng") {
      setInputPalabra(true);
      (e.target.value.length > 2 || e.target.value.length === 0)
        ? setValidaPalabra(true)
        : setValidaPalabra(false);
      e.target.value.length === 0 && setInputPalabra(false);
    }

    if(e.target.name === "pistaIng") {
      setInputPista(true);    
      (e.target.value.length > 5 || e.target.value.length === 0)
        ? setValidaPista(true)
        : setValidaPista(false);
      e.target.value.length === 0 && setInputPista(false);
    }

    setPalabraPista({
      ...palabraPista,
      [e.target.name]: e.target.value.toUpperCase()
    })
   
  };


  return (
    <div className="container-ingresoPalabra">
      <h2 className="titulo-ingresoPalabra">"El Juego del Ahorcado"</h2>
      <label htmlFor="palabraID">Cuál es la palabra o frase que quieres esconder?</label>
      <input 
        id="palabraID" 
        type="text" 
        value={palabraPista.palabraIng} 
        onChange={handlePalabra} 
        placeholder="Ingresa una palabra o frase..." 
        name="palabraIng" 
        required
      />
      {(!validaPalabra && inputPalabra) && <span className="msj-valida">La palabra debe contener 3 caracteres o más.</span>}
      
      <label htmlFor="pistaID">Indica una pista</label>
      <input 
        id="pistaID" 
        type="text" 
        value={palabraPista.pistaIng} 
        onChange={handlePalabra} 
        placeholder="Ingresa una pista..." 
        name="pistaIng"
        required
      />
      {(!validaPista && inputPista) && <span className="msj-valida">La pista debe contener 5 caracteres o más.</span>}
      <button className={`${(inputPalabra && inputPista && validaPalabra && validaPista) ? "btn-ajugar" : "btn-ajugar btn-ajugar-disabled"}`} type="submit" onClick={() => navegacion("/juego")}>A Jugar</button>
    </div>
  )
}
