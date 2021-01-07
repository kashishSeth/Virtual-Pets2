//creating global variables
var dog, happyDog;
var foodS, foodStock;
var database;
var lastFed;
var foodObj;

function preload()
{
  //loading the images
  sittingDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkBottles = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(800, 500);

  //assigning firebase database to variable database
  database=firebase.database();

  //Getting foodStock from the database 
  foodStock = database.ref('foodS');
  foodStock.on("value",readStock);

  //creating a dog sprite with a given image
  dog = createSprite(620,320,30,30);
  dog.addImage(sittingDog);
  dog.scale = 0.2;

  foodObj = new Food();
  //foodObj.addImage(milkBottles);

  feed = createButton("Feed the dog");
  feed.position(670,95);
  feed.mousePressed(()=>{
    feedDog();
    foodObj.deductFood();
  })

  addFood = createButton("Add Food");
  addFood.position(770,95);
  addFood.mousePressed(()=>{
    addFoods();
  })
}

function draw(){  
  background(46,139,87);
  
  //changing the dog image when up arrow is pressed
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }*/

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Fed : "+ lastFed % 12 + "PM", 350,30);
  }
  else if(lastFed == 0){
    text("Last Fed : 12 AM", 350,30);
  }
  else{
    text("Last Fed : "+ lastFed + "AM", 350,30);
  }
  
  drawSprites();

  foodObj.display(); 
  console.log(foodObj.foodStock);
  /*
  fill("White");
  text("Note: Press UP_ARROW Key to feed Scooby Milk!", 120, 30);
*/
  //text to display remaining food
  fill("White");
  text("Food remaining: " + foodS, 330, 100);

 }
  //function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    foodS:foodS
  })
  foodObj.foodStock = foodObj.foodStock + 1;
}

function feedDog(){
    dog.addImage(happyDog);
  }

//Function to read values from database
function readStock(data){
  foodS = data.val();
   foodObj.foodStock = foodS
}

//Function to write values in database
function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x--; 
  }
  foodObj.foodStock = x;

  database.ref('/').update({
    Food:x
  })
}


