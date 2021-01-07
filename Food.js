class Food {
  constructor(){
    this.image = loadImage("images/Milk.png");
    this.foodStock = 0;
    this.lastFedRef = 0;
}

getFoodStock(){
  var foodStockRef = database.ref('foodS');
  foodStockRef.on("value",(data)=>{
   foodS = data.val();
  })
  this.foodStock = foodS;
}

updateFoodsStock(stock){
 database.ref('/').update({
   foodS: stock
 })
 this.foodStock = stock;
}

deductFood(){
  database.ref('/').update({
    foodS: foodS - 1
  })
  this.foodStock = this.foodStock - 1;
}

display(){
  var x=80, y=100;

  imageMode(CENTER);
  if(this.foodStock>0){
    for(var i = 0; i < this.foodStock; i++){
      console.log(x);
      if(i % 10 == 0){
        x=10;
        y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
    }
    
  }
}

}