import { useContext, useState } from 'react';
import { PALABROS } from '../assets/palabros';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import imgElAhorcado1 from '../assets/el_ahorcado1.png';
import imgElAhorcado2 from '../assets/el_ahorcado2.png';
import imgElAhorcado3 from '../assets/el_ahorcado3.png';
import imgElAhorcado4 from '../assets/el_ahorcado4.png';
import imgElAhorcado5 from '../assets/el_ahorcado5.png';
import imgElAhorcado6 from '../assets/el_ahorcado6.png';
const imagenes = [imgElAhorcado1,imgElAhorcado2,imgElAhorcado3,imgElAhorcado4,imgElAhorcado5,imgElAhorcado6];
import aciertoAudio from '../assets/success.mp3';
const aciertoSound = new Audio(aciertoAudio);
import desAciertoAudio from '../assets/error.mp3';
const desAciertoSound = new Audio(desAciertoAudio);

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
        aciertoSound.play();
    }else {
        setInCorrectas([...inCorrectas,letra]);
        setImagen(imagen + 1);
        desAciertoSound.play();
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
                {/* <img className="palo-img" src={`../src/assets/el_ahorcado${imagen}.png`} alt="El Ahorcado" />
                La imagen dinámica no se pudo hacer con esta línea porque en Netlify no se mostraban correctamente.
                Hubo que importar todas las imágenes, guardarlas en el array imagenes y mostrarlas como se ve en la siguiente línea:*/}
                <img className="palo-img" src={imagenes[imagen-1]} alt="El Ahorcado" />
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
