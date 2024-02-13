import { useNavigate } from "react-router-dom"

export const Opciones = () => {
  const navegacion = useNavigate();
  return (
    <div className="contenedor-opciones">
        <h2 className="opciones">Opciones</h2>
        <button className="btn-opManual" onClick={() => navegacion("/ingresopalabra")}>Ingresar la palabra a descubrir</button>
        <button className="btn-opAutomatico" onClick={() => navegacion("/juego")}>La palabra se genera automáticamente</button>
    </div>
  )
}
