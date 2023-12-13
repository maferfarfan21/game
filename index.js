//variables
let tarjetasdestapadas= 0;
let movimientos = 0;
let timer = 40;
let aciertos = 0; 
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let tiempoRegresivo = null;
let temporizador = false;

//musica
let clickAudio = new Audio('./sounds/click.mp3');
let errorAudio = new Audio('./sounds/error.mp3');
let loseAudio = new Audio('./sounds/lose.mp3');
let rightAudio = new Audio('./sounds/right.mp3');
let winAudio = new Audio('./sounds/win.mp3');

// objetos
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');

//numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

// funciones extras
function contarTiempo(){
  tiempoRegresivo = setInterval(()=>{
    timer--;
    mostrarTiempo.innerHTML =  `Tiempo: ${timer} segundos`;
    if(timer == 0){
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
      loseAudio.play();
    }
  }, 1000);
}

function bloquearTarjetas(){
  for(let i = 0; i <=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
  }
}

//funcion principal
function destapar(id){
  if(temporizador == false){
    contarTiempo();
    temporizador = true;
  }

  tarjetasdestapadas++;
  console.log(tarjetasdestapadas);
  
  if(tarjetasdestapadas == 1){
    //mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
    clickAudio.play();

    //desabilitar boton selecionado
    tarjeta1.disabled=true;
  }else if(tarjetasdestapadas == 2){
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;
    clickAudio.play();

     //desabilitar boton selecionado
     tarjeta2.disabled=true;

     //incrementar movimientos
     movimientos++;
     mostrarMovimientos.innerHTML= `Movimientos: ${movimientos}`;
    if(primerResultado == segundoResultado){
      tarjetasdestapadas = 0;
      //aumento aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos} `;
      rightAudio.play();

      if(aciertos == 8){
        winAudio.play();
        clearInterval(tiempoRegresivo);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}🥳`;
        mostrarTiempo.innerHTML =  `Tiempo total:  ${30- timer} segundos 🥳`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}🥳`;
      }

    }else{
      errorAudio.play();
      //mostrar mostrar valores y volver a tapar
      setTimeout(()=>{
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasdestapadas = 0;
      }, 1500)
    }
  }
}