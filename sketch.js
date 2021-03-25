var dog,happyDog,database,foodS,foodStock;
var dog_image,happyDog_image;

function preload() 
{
  dog_image = loadImage("dogImg.png");
  happyDog_image = loadImage("dogImg1.png");
}

function setup() 
{
  database = firebase.database();
  createCanvas(500,500);

  dog = createSprite(250,250);
  dog.addImage("Dog", dog_image);
  dog.scale=0.4;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock,showError);
}

function draw() 
{
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) 
  {
    writeStock(foodS);
    dog.addImage(happyDog_image);
  }
  drawSprites();
  fill("Black");
  text("Food Remaining" + foodS, 20, 20);
  text("Press Up Arrow To Feed The Dog", 20, 40);
}

function readStock(data) 
{
  foodS = data.val();
}

function writeStock(x)
{
  if (x <= 0) 
  {
    x = 0
  }
  else
      x = x-1;

  database.ref("/").update(
    {
      Food:x
    }
  )
} 

function showError() 
{
  console.log("Error!!!");
}
