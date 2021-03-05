var dog,database,foodS,foodStock,foodObj,Feed,AddFood,lastFed;

var happyDog,dog_img;



function preload()
{
  
  happyDog=loadImage("images/dogImg.png")
  dog_img=loadImage("images/dogImg1.png")


}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();

  foodObj=new Food();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  dog=createSprite(250,300,20,20);
  dog.addImage(dog_img);
  dog.scale=0.15;
  
  Feed=createButton("FEED THE DOG");
  Feed.position(700,95);
  Feed.mousePressed(feedDog);

  AddFood=createButton("ADD FOOD");
  AddFood.position(800,95);
  AddFood.mousePressed(addFoods);
  
 
}


function draw() {  
background(46,139,87);


foodObj.display()

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed=data.val();

})

console.log(lastFed);
fill(255,255,254);
textSize(15);
if(lastFed>=12){
text("Last Feed :"+lastFed%12+"PM",350,30);
}else if(lastFed==0){
text("lastFed:12AM",350,30)
}else{
text("Last Feed :"+lastFed+"AM",350,30);
}



  drawSprites();
  //add styles here

 
 

} 

function readStock(data){

foodS=data.val();
foodObj.updateFoodStock(foodS);

}

// hint 3
function feedDog(){

dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
food :foodObj.getFoodStock(),
FeedTime:hour()
})

}

function addFoods(){

  foodS++;
  database.ref('/').update({
  food:foodS

  })


}

