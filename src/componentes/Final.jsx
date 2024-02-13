import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import imgPerdiste from '../assets/perdiste.jpeg';

export const Final = () => {
  const navegacion = useNavigate();
  const { respuesta } = useContext(Contexto);
  return (
    <div className="final-container">
      <h1>Has perdido, Inténtalo nuevamente!!</h1>
      <div className="final-img">
        <img src={imgPerdiste} alt="Caricatura Perdiste" />
      </div>
      <h2>La respuesta correcta era: <strong className="resp-strong">{respuesta}</strong></h2>
      <button className="btn-volver-a-jugar" onClick={() => navegacion("/pregunta/")}>Volver a jugar</button> {/* La primer barra de juego significa que parte desde el directorio raíz y desde ahí accede a la ruta juego */}
    </div>
  )
}
