const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height)

//hacer el personaje y el oponente como rectangulos primero .
//funcion de crear objeto 

const gravity = 0.7 //la gravedad de como caen los objetos 
//objeto de imagen de fondo

const background = new Sprite ({
    position:{
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})

//imagen de la tienda de fondo
const shop = new Sprite ({
    position:{
        x:600,
        y:127
    },
    imageSrc: './img/shop.png',
    scale : 2.75,
    frameMax: 6
})

//objeto creado 
const player = new Luchador({
    position:{ 
    x: 0,
    y:0},
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    frameMax : 8,
    scale:2.5,
    offset :{
        x:215 ,
        y:157
    },
    sprites : {
        idle :{
            imageSrc : './img/samuraiMack/Idle.png',
            frameMax : 8
        },
        run : {
            imageSrc : './img/samuraiMack/Run.png',
            frameMax : 8,
            image : new Image()
    },
    jump :{
        imageSrc : './img/samuraiMack/Jump.png',
        frameMax : 2,
        image : new Image()
    },
    fall :{
        imageSrc : './img/samuraiMack/Fall.png',
        frameMax : 2,
        image : new Image()
    },
    attack1 :{
        imageSrc : './img/samuraiMack/Attack1.png',
        frameMax : 6,
        image : new Image()
    },
    takehit: {
        imageSrc : './img/samuraiMack/Take Hit - white silhouette.png',
        frameMax : 4,
        image : new Image()
    },
    takehit: {
        imageSrc : './img/samuraiMack/Take Hit - white silhouette.png',
        frameMax : 4,
        image : new Image()
    },
    muerte : {
        imageSrc : './img/samuraiMack/Death.png',
        frameMax : 6,
        image : new Image()
    }
    },
    attackBox: {
        offset : {
            x:110,
            y:50
        },
        height:50,
        width:100
    }
})



///crear el enemigo

const enemy = new Luchador({
    position:{ 
        x: 400,
        y:100
    },
        velocity:{
            x:0,
            y:0
        },
        color : 'blue',
        offset:{
            x:-50,
            y:0
        },
        imageSrc: './img/kenji/Idle.png',
        frameMax : 4,
        scale:2.5,
        offset :{
            x:215 ,
            y:167
        },
        sprites : {
            idle :{
                imageSrc : './img/kenji/Idle.png',
                frameMax : 4
            },
            run : {
                imageSrc : './img/kenji/Run.png',
                frameMax : 8,
                image : new Image()
        },
        jump :{
            imageSrc : './img/kenji/Jump.png',
            frameMax : 2,
            image : new Image()
        },
        fall :{
            imageSrc : './img/kenji/Fall.png',
            frameMax : 2,
            image : new Image()
        },
        attack1 :{
            imageSrc : './img/kenji/Attack1.png',
            frameMax : 4,
            image : new Image()
        },
        takehit: {
            imageSrc : './img/kenji/Take hit.png',
            frameMax : 3,
            image : new Image()
        },
        muerte : {
            imageSrc : './img/kenji/Death.png',
            frameMax : 7,
            image : new Image()
        }
        },
        attackBox: {
            offset : {
                x:-160,
                y: 50
            },
            height:50,
            width:160
        }
})




//animacion de los personajes y enemigo 
//ciclo infinito para llamar a la animacion 
//keys 

const keys = {
    a:{
        pressed :false
    },
    d: {
        pressed :false
    },
    w:{
        pressed :false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }
}




function animate (){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width,canvas.height)
    background.update()
    shop.update( )
    c.fillStyle = 'rgba(255,255,255,0.15)'
    c.fillRect(0,0, canvas.width,canvas.height)
    player.update()
   enemy.update()

    //player moveset
    player.velocity.x = 0
    enemy.velocity.x = 0
     // player.image = player.sprites.idle.image
    if(keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
        player.cambioSprites('run')
      //  player.image = player.sprites.run.image
    }else if (keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
        player.cambioSprites('run')
        // player.image = player.sprites.run.image

    } else{
        player.cambioSprites('idle')
    }

    //JUMP

    if(player.velocity.y < 0){
       
       player.cambioSprites('jump')
        // player.image = player.sprites.jump.image
      //  player.frameMax = player.sprites.jump.frameMax
    }else if (player.velocity.y >0){
        player.cambioSprites('fall')
    }
    ///enemy moveset
    if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.cambioSprites('run')
    }else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.cambioSprites('run')
    }else{
        enemy.cambioSprites('idle')
    }
    
    if(enemy.velocity.y < 0){
       
        enemy.cambioSprites('jump')
         // enemy.image = enemy.sprites.jump.image
       //  enemy.frameMax = enemy.sprites.jump.frameMax
     }else if (enemy.velocity.y >0){
         enemy.cambioSprites('fall')
     }
    //detectar la colicion de los PNJ y animacion de golpe
    if(rectangulosColicion({
        rectagule1 : player ,
        rectagule2 : enemy
    })&& player.isAttaking && player.framesCurrent === 4){
            enemy.takehit()
            player.isAttaking = false
        
        gsap.to('#enemyhp',{
            width : enemy.health + '%'
        })
    }

    if(player.isAttaking && player.framesCurrent === 4){
        player.isAttaking == false
    }

    if(rectangulosColicion({
        rectagule1 : enemy,
        rectagule2 : player
    })&& enemy.isAttaking&& enemy.framesCurrent ){
            player.takehit()
            enemy.isAttaking = false
            gsap.to('#playerhp',{
                width : player.health + '%'
            })
        }

        if(enemy.isAttaking && enemy.framesCurrent === 2){
            enemy.isAttaking == false
        }

    //Fin del Juego y detener los personajes
    if (enemy.health <= 0|| player.health <=0){
        endplay({player,enemy, timerId})
    }
}
animate()

window.addEventListener('keydown', (event)=> {
    if(!player.muerte){


   switch (event.key) {
    case 'd':
        keys.d.pressed = true //con esto se mueve hacia un lado
        player.lastkey = 'd'
        break;
   case 'a':
        keys.a.pressed = true //con esto se mueve hacia atras
        player.lastkey = 'a'
        break;
   case 'w':
        player.velocity.y = -10 //salto
        break;
   case ' ' :
        player.attack()
        break
    
   }
}   
if(!enemy.muerte){
   switch(event.key){
           //enemigo
           case 'ArrowRight':
            keys.ArrowRight.pressed = true //con esto se mueve hacia un lado
            enemy.lastkey = 'ArrowRight'
            break;
       case 'ArrowLeft':
            keys.ArrowLeft.pressed = true //con esto se mueve hacia atras
            enemy.lastkey = 'ArrowLeft'
            break;
       case 'ArrowUp':
            enemy.velocity.y = -10 //salto
            break;
    
       case 'ArrowDown':
            enemy.attack()
            break
   }
}
}
)


window.addEventListener('keyup', (event)=> {
    switch (event.key) {
     case 'd':
        keys.d.pressed = false //con esto se detiene
         break;
    case 'a':
        keys.a.pressed  = false //con esto se mueve hacia atras
        break;
    }
    //enemigo keys
    switch (event.key){
    case 'ArrowRight':
        keys.ArrowRight.pressed = false //con esto se detiene
         break
    case 'ArrowLeft':
        keys.ArrowLeft.pressed  = false //con esto se mueve hacia atras
        break
    }
    //enemigo keys
    
 })