import { useContext, useState } from 'react';
import { PALABROS } from '../assets/palabros';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';

export const Juego = () => {
  let cantEspacios = 0;
  const [azar, setAzar] = useState(0);
  const [palabra,setPalabra] = useState([]);
  const [misLetras, setMisLetras] = useState([]);
  const [correctas, setCorrectas] = useState([]);
  const [inCorrectas, setInCorrectas] = useState([]);
  const [imagen, setImagen] = useState(1);
  const teclas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  const arr_teclas = teclas.split("");
  const colores = [{backgroundColor:"burlywood",color:"black"},{backgroundColor:"green",color:"burlywood"},{backgroundColor:"red",color:"burlywood"}];
  const navegacion = useNavigate();
  const { escribirRespuesta, palabraPista, setPalabraPista } = useContext(Contexto);
  
  if(palabraPista.palabraIng.length === 0) {
    //Ingresa por acá si no se ingresó palabra manual
    useEffect(() => {
        setAzar(Math.floor(Math.random()*PALABROS.length))    
      }, []);
      
      useEffect(() => {
        setPalabra(PALABROS[azar].palabro.split(""));
        escribirRespuesta(PALABROS[azar].palabro);
      }, [azar])
      cantEspacios = palabra.filter(letra => letra === ' ');
      cantEspacios = cantEspacios.length;
  }else {
    //Ingresa por acá si se ingresó palabra manual
    useEffect(() => {
        setPalabra(palabraPista.palabraIng.split(""));
        escribirRespuesta(palabraPista.palabraIng);
      }, [])
      cantEspacios = palabra.filter(letra => letra === ' ');
      cantEspacios = cantEspacios.length;
  }
  
  const pulsaTecla = (e) => {
    const letra = e.target.innerHTML;
    setMisLetras([...misLetras,letra]);
   
    if(palabra.indexOf(letra) >= 0) {
        setCorrectas([...correctas,letra]);
    }else {
        setInCorrectas([...inCorrectas,letra]);
        setImagen(imagen + 1);
        if(imagen > 5) {
            setPalabraPista({
                palabraIng: '',
                pistaIng: ''
              });
            navegacion("/final");
        }
    }
  };

  useEffect(() => {
    let noEncontrada = 0;
    palabra.map((letra) => {
        if (misLetras.find(le => le === letra) === undefined) {
            (letra != ' ') && noEncontrada++; //se descartan los espacios en blanco ' ' y se toma como noEncontrada solo letras.
        }
    });
    if(noEncontrada === 0 && correctas.length > 0) {
        setPalabraPista({
            palabraIng: '',
            pistaIng: ''
          });
        navegacion("/ganado");
    }
  },[correctas]);

  return (
    <>
        <div className="pregunta">
            {
                palabraPista.palabraIng.length > 0
                    ? palabraPista.pistaIng
                    : PALABROS[azar].pregunta
            }
        </div>
        <div className="contenedor-imagenpalabra">
            <div className="palabra">
                {
                    palabra.map((letra,i) => ( 
                        misLetras.indexOf(letra) === -1
                        ?
                            (letra != " ") 
                                ? <div className="palo" key={i}></div> 
                                : <div className="palo-espacio" key={i}></div>
                        :
                            <div className="palo" key={i}>{letra.toUpperCase()}</div>
                    ))
                }
            </div>
            <div className="imagen">
                <img className="palo-img" src={`../src/assets/el_ahorcado${imagen}.png`} alt="El Ahorcado" />
            </div>
        </div>
        <div className="botones">
            {
                arr_teclas.map((letra) => (
                    (correctas.find(e => e===letra))
                        ? <button key={letra} style={colores[1]}>{letra}</button>
                        : (inCorrectas.find(e => e === letra))
                            ? <button key={letra} style={colores[2]}>{letra}</button>
                            : <button key={letra} style={colores[0]} onClick={pulsaTecla}>{letra}</button>
                    
                ))
            }
        </div>
    </>
  )
}
