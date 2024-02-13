import { useNavigate } from 'react-router-dom'

export const Ganado = () => {
  const navegacion = useNavigate();
  return (
    <div className="ganador-container">
      <h1>Has ganado, Felicitaciones!!</h1>
      <div className="ganador-img">
        <img src="../src/assets/ganador.png" alt="Caricatura de Ganador" />
      </div>
      <button className="btn-volver-a-jugar" onClick={() => navegacion("/pregunta/")}>Volver a jugar</button> {/* La primer barra de juego significa que parte desde el directorio raíz y desde ahí accede a la ruta juego */}
    </div>
  )
}
