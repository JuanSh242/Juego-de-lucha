function rectangulosColicion({rectagule1, rectagule2}){
    return(rectagule1.attackBox.position.x + rectagule1.attackBox.width >= rectagule2.position.x && rectagule1.attackBox.position.x <=
        rectagule2.position.x + rectagule2.width && rectagule1.attackBox.position.y + rectagule1.attackBox.height >= rectagule2.position.y 
        && rectagule1.attackBox.position.y <= rectagule2.position.y +rectagule2.height)
}

//detener el juego

function endplay ({player,enemy ,timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayflex').style.display = 'flex'
    if (player.health === enemy.health){
        document.querySelector('#displayflex').innerHTML = 'Tiempo'
    }else if ( player.health > enemy.health){
        document.querySelector('#displayflex').innerHTML = 'Jugador 1 GANA'
    }else if (player.health < enemy.health){
        document.querySelector('#displayflex').innerHTML = 'Jugador 2 GANA'
    }
}

//este es el tenporizador
let timer = 60
let timerId //para detener el tiempo del juego al ganar
function decreseTimer(){ //funcion de tiempo decreccciente
    if(timer > 0) {
        timer--
        timerId =setTimeout(decreseTimer, 1000)
        document.querySelector('#timer').innerHTML = timer //tomar el id del html 
    }
    if( timer === 0){
    endplay({player,enemy})
}
}

decreseTimer()