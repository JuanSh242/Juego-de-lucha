

class Sprite{
    //se pasan los argumentos como propiedad de un objeto para mantenerlos ordenados en el codigo y linpio
    constructor({position , imageSrc , scale=1 , frameMax =1, offset = { x:0, y:0}}){ //la posicion 
        this.position = position
        this.height =150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale  
        this.frameMax = frameMax
        this.framesCurrent = 0
        this.framesElapse = 0
        this.framesHold = 5
        this.offset = offset
      }
    //el regtangulo de personaje
    draw(){ 
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width /this.frameMax),
            0,
            this.image.width /this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale
            )
    }

    animeframe(){
        this.framesElapse++
      if( this.framesElapse % this.framesHold === 0){
      if(this.framesCurrent < this.frameMax -1){
      this.framesCurrent++
      }else{
        this.framesCurrent = 0
      }
    }
    }

    update(){
      this.draw()
      this.animeframe()
    }
  
}

class Luchador extends Sprite{
    //se pasan los argumentos como propiedad de un objeto para mantenerlos ordenados en el codigo y linpio
    constructor({position , velocity, color ='red', imageSrc , scale=1 , frameMax =1, offset = { x:0, y:0},sprites,attackBox = {offset:{}, width: undefined ,height:undefined }}){ //la posicion 
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset 
        })
        this.velocity = velocity
        this.height =150
        this.width = 50
        this.lastkey
        this.attackBox = {//el ataque 
            position :{
                x: this.position.x,
                y: this.position.y
            } ,
            offset: attackBox.offset,
            width : attackBox.width,
            height: attackBox.height       
      }
      
      this.color = color
      this.isAttaking
      this.health = 100
      this.framesCurrent = 0
      this.framesElapse = 0
      this.framesHold = 5
      this.sprites = sprites
      this.muerte = false

      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
      console.log(this.sprites)
    }
    //el regtangulo de personaje
   /* draw(){
        c.fillStyle = this.color //color del regtangulo
        c.fillRect(this.position.x,this.position.y, this.width, this.height) //posiicon de objeto
       if(this.isAttaking) {
        c.fillStyle ='yellow'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
       }
    } */

    update(){
        this.draw()
        if(!this.muerte)
        this.animeframe()
        //caja de ataques
        this.attackBox.position.x =this.position.x + this.attackBox.offset.x
        this.attackBox.position.y =this.position.y + this.attackBox.offset.y

        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width , this.attackBox.height)

        this.position.x += this.velocity.x //para el movimiento del personaje
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height -95){
            this.velocity.y = 0
        } else  this.velocity.y += gravity
    }
    //ataques 
    attack(){
        this.cambioSprites('attack1')
        this.isAttaking = true
      
    }
    takehit(){
     
    this.health -= 5 
     if(this.health <=0){
      this.cambioSprites('muerte')
     }else  this.cambioSprites('takehit')
    }

    //para cambiar los espirtes en cada accion usamos sentencia Swihs
cambioSprites (sprite) {
    //animacion de muerte
    if(this.image === this.sprites.muerte.image){
      if(this.framesCurrent === this.sprites.muerte.frameMax -1)
      this.muerte = true
      return}
   //cada vez que la animacion tenga una acccion
  if(this.image === this.sprites.attack1.image &&
    this.framesCurrent < this.sprites.attack1.frameMax -1) return
    //cada vez que un luchador toma un golpe
    if(this.image === this.sprites.takehit.image &&
      this.framesCurrent < this.sprites.takehit.frameMax -1) return
  switch (sprite) {
  case 'idle' :
       if(this.image !== this.sprites.idle.image){
       this.image = this.sprites.idle.image
       this.frameMax = this.sprites.idle.frameMax
       this.framesCurrent = 0
       }
  break;

  case 'run' :
       if(this.image !== this.sprites.run.image) {
       this.image = this.sprites.run.image
       this.frameMax = this.sprites.run.frameMax
       this.framesCurrent = 0
       }
  break;

  case  'jump' :
         if(this.image !== this.sprites.jump.image) {
         this.image = this.sprites.jump.image
         this.frameMax = this.sprites.jump.frameMax
         this.framesCurrent = 0
         }
  break;

  case 'fall':
         if(this.image !== this.sprites.fall.image) {
         this.image = this.sprites.fall.image
         this.frameMax = this.sprites.fall.frameMax
         this.framesCurrent = 0
         }
  break;

  case 'attack1':
         if(this.image !== this.sprites.attack1.image) {
         this.image = this.sprites.attack1.image
         this.frameMax = this.sprites.attack1.frameMax
         this.framesCurrent = 0
         }
  break;

  case 'takehit':
    if(this.image !== this.sprites.takehit.image) {
    this.image = this.sprites.takehit.image
    this.frameMax = this.sprites.takehit.frameMax
    this.framesCurrent = 0
    }
   break;

   case 'muerte':
    if(this.image !== this.sprites.muerte.image) {
    this.image = this.sprites.muerte.image
    this.frameMax = this.sprites.muerte.frameMax
    this.framesCurrent = 0
    }
  
  }
}

}
