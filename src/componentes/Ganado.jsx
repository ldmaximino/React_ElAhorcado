import { useNavigate } from 'react-router-dom'
import imgGanador from '../assets/ganador.png';

export const Ganado = () => {
  const navegacion = useNavigate();
  return (
    <div className="ganador-container">
      <h1>Has ganado, Felicitaciones!!</h1>
      <div className="ganador-img">
        <img src={imgGanador} alt="Caricatura de Ganador" />
      </div>
      <button className="btn-volver-a-jugar" onClick={() => navegacion("/pregunta/")}>Volver a jugar</button> {/* La primer barra de juego significa que parte desde el directorio raíz y desde ahí accede a la ruta juego */}
    </div>
  )
}
