import { useNavigate } from 'react-router-dom'
import caricatura01 from '../assets/caricatura01.png';

export const Portada = () => {
  const navegacion = useNavigate();
  return (
    <div className="contenedor-portada">
        <h1 className="bienvenidos">BIENVENIDOS</h1>
        <div className="contenedor-portada-imagen">
          <img src={caricatura01} alt="Caricatura" />
        </div>
        <p className="nombre-juego">"El Juego del Ahorcado"</p>
        <button className="btn-jugar" onClick={() => navegacion("pregunta")}>Vamos a Jugar</button>
    </div>
  )
}
