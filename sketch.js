//Declaring the variables.
var monkey, monkey_jump, monkey_happy, monkey_caught;
var obstacleImage, bananaImage, grassImage, moonImage;
var obstacleGroup, bananaGroup, grassGroup;
var scene, scene2, scene3, ground, sceneImage, invisibleScene;
var sprite1, sprite2;
var backgroundMusic, shortJump, highJump, lifeIncreased, click, error, oh_no, win;
var backButton, levelButton, lock, endless_mode;
var score, target, life, levelsCompleted, currentLevel, variable;
var gameState;

//Preload function.
function preload() {
  //Loading Animations and Images to specific variables.
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkey_jump = loadAnimation("Monkey_01.png");
  monkey_happy = loadImage("monkeyHappy.png");
  monkey_caught = loadImage("monkeyCaught.png");

  backButton = loadImage("Return Button.png");
  levelButton = loadImage("level_button.jpg");
  lock = loadImage("lock.png");
  startButton = loadImage("start.png");
  endless_mode = loadImage("endlessMode.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  grassImage = loadImage("grass.png");
  moonImage = loadImage("moon.png");

  sceneImage = loadImage("jungle.jpg");
  groundImage = loadImage("ground.png");
  
  //Loading Sound to specific variables.
  backgroundMusic = loadSound("Background.mp3");
  shortJump = loadSound("Short_jump.mp3");
  highJump = loadSound("High_jump.mp3");
  lifeIncreased = loadSound("checkPoint.mp3");
  click = loadSound("click.mp3");
  error = loadSound("error.mp3");
  oh_no = loadSound("Oh-No Sound.mp3");
  win = loadSound("win.mp3");
  
  //Looping the background music.
  backgroundMusic.loop();
}

//Setup function.
function setup() {
  //Creating the canvas.
  createCanvas(400, 400);
  
  //Assigning values to specific variables. 
  score = 0;
  target = 0;
  life = 1;
  currentLevel = 0;
  levelsCompleted = 0;
  variable = 0;
  
  //Adjusting the volume of specific sounds.
  click.setVolume(0.2);
  lifeIncreased.setVolume(0.5);
  backgroundMusic.setVolume(0.07);
  oh_no.setVolume(0.7);
  error.setVolume(3);
  win.setVolume(0.5);
  
  //Playing the background music.
  backgroundMusic.play();
  
  //Creating the monkey sprite.
  monkey = createSprite(80, 320, 50, 50);
  //Adding animations to it.
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("jump", monkey_jump);
  //Adjusting its size.
  monkey.scale = 0.12;
  //Making it invisible. 
  monkey.visible = false;
  
  //Creating the ground sprite.
  ground = createSprite(200, 515, 400, 100);
  //Adding image to it.
  ground.addImage(groundImage);
  //Adjusting its size.
  ground.scale = 4;
  //Making it invisible.
  ground.visible = false;
  
  //Creating the scene sprites.
  scene = createSprite(150, 210, 400, 400);
  scene2 = createSprite(639, 210, 400, 400);
  scene3 = createSprite(190, 210, 400, 400);
  //Adding same image to them.
  scene.addImage(sceneImage);
  scene2.addImage(sceneImage);
  scene3.addImage(sceneImage);
  //Adjusting their size.
  scene.scale = 0.5;
  scene2.scale = 0.5;
  scene3.scale = 0.5;
  //Making them invisible.
  scene.visible = false;
  scene2.visible = false;
  scene3.visible = false;
  
  //Adjusting the depths.
  scene2.depth = scene3.depth;
  scene2.depth = scene2.depth + 1;
  
  scene.depth = scene3.depth;
  scene.depth = scene.depth + 1;
  
  monkey.depth = scene.depth;
  monkey.depth = monkey.depth + 1;
  
  monkey.depth = scene2.depth;
  monkey.depth = monkey.depth + 1;
  
  //Creating an invisible scene.
  invisibleScene = createSprite(200, 390, 400, 80);
  invisibleScene.visible = false;
  
  //Creating two invisible sprites.
  sprite1 = createSprite(190, 245, 225, 20);
  sprite1.visible = false;
  sprite2 = createSprite(190, 340, 225, 20);
  sprite2.visible = false;
  
  //Creating the groups.
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  grassGroup = createGroup();
  
  //Setting initial gameState as "story".
  gameState = "story";
}

//Draw function. 
function draw() {
  //Setting background color as lightgreen.
  background(rgb(144, 238, 144));
  //Creating edge sprites.
  edges = createEdgeSprites();
  
  //Assigning functions when gameState is "story".
  if (gameState === "story") {
    //Displaying text.
    fill("black");
    textStyle(BOLD);
    textFont("cursive");
    textSize(15);
    text("Story:", 10, 25);
    text("The monkey has reached to the forest safely from", 10, 50);
    text("the zoo. But wait a second...........", 10, 70);
    text("Thank God his animal friends were there to free", 10, 140);
    text("him from the cage.", 10, 160);
    text("Help the monkey to run and escape from the", 10, 190);
    text("hunters before they get to him !!", 10, 210);
    textSize(16);
    text("CLICK HERE TO CONTINUE", 80, 250);
    fill("red");
    text("The hunters reached to the Forest and caught", 10, 100);
    text("the monkey !!!!", 10, 120);
    
    //Displaying red color text and underline when mouse is over sprite1.
    if (mouseIsOver(sprite1)) {
      textSize(16);
      text("CLICK HERE TO CONTINUE", 80, 250);

      var underline1 = createSprite(194, 255, 225, 2.5);
      underline1.shapeColor = "red";
      underline1.lifetime = 1;
    }
    
    //Changing gameState to "instructions" and playing click sound effect when mouse is pressed over sprite1.
    if (mousePressedOver(sprite1)) {
      gameState = "instructions";
      click.play();
    }
  } 
  
  //Assigning functions when gameState is "instructions".
  else if (gameState === "instructions") {
    //Displaying text.
    fill("black");
    textStyle(NORMAL);
    textFont("cursive");
    textSize(17);
    text("Instructions:", 10, 35);
    text("~ Press the Up Arrow key to make a high jump.", 10, 65);
    text("~ Press the Space key to make a short jump.", 10, 90);
    text("~ The banana indicates monkey's life. Increase", 10, 115);
    text("monkey's life by eating bananas.", 28, 140);
    text("~ Getting hit by a stone will decrease monkey's", 10, 165);
    text("life by 1.", 28, 190);
    text("~ Complete the target to unlock a new level.", 10, 215);
    text("~ Each level gives a new target to achieve.", 10, 240);
    text("~ Your score indicates your progress.", 10, 265);
    text("~ Complete level 3 to unlock the 'Endless' mode.", 10, 290);
    text("~ 'Endless' mode has no target to achieve.",10,315);
    textSize(16);
    text("Back", 350, 25);
    text("PRESS 'SPACE' TO CONTINUE", 75, 345);
    
    //Creating a sprite named back1.
    var back1 = createSprite(320, 20, 10, 10);
    //Adding image to it.
    back1.addImage(backButton);
    //Giving it a lifetime.
    back1.lifetime = 1;
    //Adjusting its size.
    back1.scale = 0.07;
    
    //Changing gameState to "story" and playing click sound effect when mouse is pressed over back1.
    if (mousePressedOver(back1)) {
      gameState = "story";
      click.play();
    }
    
    //Changing gameState to "level_select" and playing click sound effect when space key is pressed. 
    if (keyDown("space")) {
      gameState = "level_select";
      click.play();
    }
  }
  
  //Calling the selectLevel function when gameState is "level_select".
  else if (gameState === "level_select") {
    selectLevel();
  }
  
  //Assigning functions when gameState is "start".
  if (gameState === "start") {
    //Calling the selectLevel function.
    selectLevel();
    
    //Creating a sprite named start.
    var start = createSprite(350, 370, 10, 10);
    //Adjusting its size.
    start.scale = 0.7;
    //Giving it a lifetime.
    start.lifetime = 1;
    //Adding image to it.
    start.addImage(startButton);
    
    //Changing gameState to "play" and playing the click sound effect when mouse is pressed over start.
    if (mousePressedOver(start)) {
      gameState = "play";
      click.play();
    }
  } 
  
  //Assigning functions when gameState is "play".
  else if (gameState === "play") {
    //Making monkey, scene, scene2 and scene3 visible.
    monkey.visible = true;
    scene.visible = true;
    scene2.visible = true;
    scene3.visible = true;
    
    //Changing the background color.
    background(rgb(1, 60, 40));
    
    //Increasing the score with the help of frame rate.
    score = score + Math.round(getFrameRate() / 60);
        
    //Giving scene, scene2 and scene3 X velocity when score <= 1000.
    if(score <= 1000) {
      scene.velocityX = -(3 + 3 * score / 400);
      scene2.velocityX = -(3 + 3 * score / 400);
    }
    
    //Assigning functions when space key is pressed and monkey's y position >= 313.
    if (keyDown("space") && monkey.y >= 313) {
      //Changing its velocityY to -9;
      monkey.velocityY = -9;
      //Changing its animation.
      monkey.changeAnimation("jump");
      //Playing sound effect.
      shortJump.play();
      shortJump.setVolume(0.15);
    }
    //Assigning functions when Up Arrow key is pressed and monkey's y position >= 313.
    else if (keyDown(UP_ARROW) && monkey.y >= 313) {
      //Changing its velocityY to -11;
      monkey.velocityY = -11;
      //Changing its animation.
      monkey.changeAnimation("jump");
      //Playing sound effect.
      highJump.play();
      highJump.setVolume(0.1);
    }
    
    //Changing monkey's animation when space or Up Arrow key is no longer pressed.
    if (keyWentUp("space") || keyWentUp(UP_ARROW)) {
      monkey.changeAnimation("running");
    }
    
    //Adding gravity for the monkey.
    monkey.velocityY = monkey.velocityY + 0.5;
    
    //Calling the spawnObstacles, spawnfood, and spawngrass functions.
    spawnObstacles();
    spawnfood();
    spawngrass();
    
    //Changing sprite2's velocity x when bananaGroup touches monkey.
    if (bananaGroup.isTouching(monkey)) {
      sprite2.velocityX = -50;
    }
    
    //Assigning functions when sprite2 touches the edges.
    if (sprite2.isTouching(edges)) {
      //Changing sprite2's velocity x to 0;
      sprite2.velocityX = 0;
      //Changing sprite2's x position.
      sprite2.x = 200;
      //Increasing life's value by 1.
      life = life + 1;
      //Playing sound effect.
      lifeIncreased.play();
      //Destroying the bananaGroup.
      bananaGroup.destroyEach();
    }
    
    //Changing obstacleGroup's velocity x and making the monkey jump when obstacleGroup touches the monkey.
    if (obstacleGroup.isTouching(monkey)) {
      sprite1.velocityX = -5;
      monkey.velocityY = -8;
    }
    
    //Assiging functions when sprite1 touches the edges.
    if (sprite1.isTouching(edges)) {
      //Changing sprite1's x position.
      sprite1.x = 185;
      //Changing sprite1's x velocity. 
      sprite1.velocityX = 0;
      //Decreasing life by 1.
      life = life - 1;
      //Playing sound effect.
      error.play();
    }
    
    //Assigning functions when life is equal to 0.
    if (life === 0) {
      //Changing gameState to "end".
      gameState = "end";

      //Changing all the groups' velocity to 0.
      obstacleGroup.setVelocityEach(0, 0);
      bananaGroup.setVelocityEach(0, 0);
      grassGroup.setVelocityEach(0, 0);
      //Changing scene and scene2's velocity x to 0.
      scene.velocityX = 0;
      scene2.velocityX = 0;
      
      //Playing sound effect.
      oh_no.play();
    }
    
    //Assigning functions when score >= target.
    if (score >= target) {
      //Changing gameState to "win".
      gameState = "win";
      
      //Changing variable' value to 1 when variable is 0 and target is 350. 
      if(variable === 0 && target === 350) {
        variable = 1;
      }
      //Changing variable' value to 2 when variable is 1 and target is 700. 
      else if(variable === 1 && target === 700) {
        variable = 2;
      }
      //Changing variable' value to 3 when variable is 2 and target is 1200. 
      else if(variable === 2 && target === 1200) {
        variable = 3;
      }
      //Changing variable' value to 4 when variable is 3 and target is 1900. 
      else if(variable === 3 && target === 1900) {
        variable = 4;
      }
      //Changing variable' value to 5 when variable is 4 and target is 2500. 
      else if(variable === 4 && target === 2500) {
        variable = 5;
      }

      //Playing sound effect.
      win.play();
    }
  } 
  
  //Assigning functions when gameState is "end".
  else if (gameState === "end") {
    //Stop playing background music.
    backgroundMusic.stop();

    //Changing background's color to dark green when score <= 1000.
    if (score <= 1000) {
      background(rgb(1, 60, 40));
    } 
    //Changing background's color to black when score > 1000.
    else if (score > 1000) {
      background("black");
    }
    
    //Changing monkey's animation.
    monkey.changeAnimation("jump");
    //Setting its velocity to 0.
    monkey.setVelocity(0, 0);
    
    //Giving every group a lifetime of -1.
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    grassGroup.setLifetimeEach(-1);
    
    //Creating a sprite named monkeyCaught.
    var monkeyCaught = createSprite(monkey.x + 21, monkey.y - 25, 10, 10);
    //Giving it a lifetime of 1.
    monkeyCaught.lifetime = 1;
    //Adjusting its size.
    monkeyCaught.scale = 0.13;
    //Adding image to it.
    monkeyCaught.addImage(monkey_caught);
    
    //Calling the reset function when ctrl key is pressed.
    if (keyDown("ctrl")) {
      reset();
    }
  } 
  
  //Assigning functions when gameState is "win".
  else if (gameState === "win") {
    //Stop playing the background music.
    backgroundMusic.stop();
    
    //Changing background's color to dark green when score <= 1000.
    if (score <= 1000) {
      background(rgb(1, 60, 40));
    } 
    //Changing background's color to black when score > 1000.
    else if (score > 1000) {
      background("black");
    }
    
    //Changing monkey's animation.
    monkey.changeAnimation("jump");
    //Setting its velocity to 0.
    monkey.setVelocity(0, 0);
    
    //Changing scene and scene2's velocity x to 0.
    scene.velocityX = 0;
    scene2.velocityX = 0;
    
    //Giving every group a lifetime of -1.
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    grassGroup.setLifetimeEach(-1);
    
    //Changing all the groups' velocity to 0.
    bananaGroup.setVelocityEach(0, 0);
    obstacleGroup.setVelocityEach(0, 0);
    grassGroup.setVelocityEach(0, 0);
    
    //Creating a sprite named monkeyHappy.
    var monkeyHappy = createSprite(monkey.x + 21, monkey.y - 25, 10, 10);
    //Giving it a lifetime of 1.
    monkeyHappy.lifetime = 1;
    //Adjusting its size.
    monkeyHappy.scale = 0.13;
    //Adding image to it.
    monkeyHappy.addImage(monkey_happy);
    
    //Calling the reset function when ctrl key is pressed.
    if (keyDown("ctrl")) {
      reset();
    }
  }
  
  //Assigning functions when gameState is "end" or "win".
  if(gameState === "end" || gameState === "win") {
    //Changing sprite2's velocity x to 0;
    sprite2.velocityX = 0;
    //Changing sprite2's x position.
    sprite2.x = 200;
    
    //Changing sprite1's x position.
    sprite1.x = 185;
    //Changing sprite1's x velocity. 
    sprite1.velocityX = 0;
  }
  
  //Creating a sprite named banana_life when gameState is "play", "win" or "end".
  if (gameState === "play" || gameState === "win" || gameState === "end") {
    var banana_life = createSprite(40, 80, 10, 10);
    //Giving it a lifetime.
    banana_life.lifetime = 1;
    //Adding image to it.
    banana_life.addImage(bananaImage);
    //Adjusting its size.
    banana_life.scale = 0.06;
  }
 
  //Assigning functions when score < 500.
  if (score < 500) {
    //Changing scene's x position to 640 if its x position <= -250.
    if (scene.x <= -250) {
      scene.x = 640;
    }
    //Changing scene2's x position to 639 if its x position <= -250.
    if (scene2.x <= -250) {
      scene2.x = 639;
    }
  } 
  //Assigning functions when score > 500.
  else if (score > 500) {
    //Changing scene's x position to 640 if its x position <= -240.
    if (scene.x <= -240) {
      scene.x = 640;
    }
    //Changing scene2's x position to 639 if its x position <= -240.
    if (scene2.x <= -240) {
      scene2.x = 639;
    }
  }
  
  //Changing levelsCompleted's value to 1 if levelsCompleted = 0 and variable = 1.
  if(levelsCompleted === 0 && variable === 1) {
    levelsCompleted = 1;
  } 
  //Changing levelsCompleted's value to 2 if levelsCompleted = 1 and variable = 2.
  else if(levelsCompleted === 1 && variable === 2) {
    levelsCompleted = 2;
  } 
  //Changing levelsCompleted's value to 3 if levelsCompleted = 2 and variable = 3.
  else if(levelsCompleted === 2 && variable === 3) {
    levelsCompleted = 3;
  } 
  //Changing levelsCompleted's value to 4 if levelsCompleted = 3 and variable = 4.
  else if(levelsCompleted === 3 && variable === 4) {
    levelsCompleted = 4;
  } 
  //Changing levelsCompleted's value to 5 if levelsCompleted = 4 and variable = 5.
  else if(levelsCompleted === 4 && variable === 5) {
    levelsCompleted = 5;
  }
  
  //Colliding the monkey with the invisibleScene.
  monkey.collide(invisibleScene);
  
  //Assigning functions when score > 1000.
  if (score > 1000) {
    //Setting background color as black.
    background("black");
    
    //Creating a sprite named moon.
    var moon = createSprite(350, 50, 10, 10);
    //Adjusting its Size
    moon.scale = 0.5;
    //Adding image to it.
    moon.addImage(moonImage);
    //Giving it a lifetime.
    moon.lifetime = 1;
    
    //Making scene, scene2 and scene3 invisible.
    scene.visible = false;
    scene2.visible = false;
    scene3.visible = false;
    //Making ground visible.
    ground.visible = true;
    
    //Setting scene and scene2's x velocity to 0.
    scene.velocityX = 0;
    scene2.velocityX = 0;
    
    //Changing scene and scene2's x position.
    scene.x = 150;
    scene2.x = 649;
  }
  
  //Drawing all the sprites.
  drawSprites();
  
  //Displaying text when gameState is "level_select" or "start".
  if (gameState === "level_select" || gameState === "start") {
    fill(rgb(35, 23, 255));
    textStyle(BOLD);
    textSize(20);
    textFont("segoe script");
    text("1", 72, 130);
    if (levelsCompleted >= 1) {
      text("2", 312, 130);
    }
    if (levelsCompleted >= 2) {
      text("3", 193, 210);
    }
    if (levelsCompleted >= 3) {
      text("4", 72, 290);
    }
    if (levelsCompleted >= 4) {
      text("5", 312, 290);
    }
  }

  //Displaying text when gameState is "play", "end" or "win".
  if (gameState === "play" || gameState === "win" || gameState === "end") {
    fill("white");
    textFont("georgia");
    textSize(20);
    text("Score: " + score, 10, 55);
    text("= " + life, 80, 85);
    textStyle(ITALIC);
    textFont("cursive");
    text("Target: " + target, 10, 25);
  }
  
  //Displaying text when gameState is "win".
  if (gameState === "win") {
    fill("red");
    textFont("cursive");
    textStyle(BOLD);
    textSize(17);
    text("Press 'ctrl' to go to the level selection menu", 20, 220);
    textSize(35);
    text("Target Achieved !!", 50, 170);
  }

  //Displaying text when gameState is "end".
  if (gameState === "end") {
    fill("red");
    textFont("cursive");
    textStyle(BOLD);
    textSize(17);
    text("Press 'ctrl' to go to the level selection menu", 20, 200);
    textSize(35);
    text("Oops !!", 150, 75);
    textSize(25);
    text("The Hunters caught the Monkey.", 1, 120);
    text("You Failed !", 140, 155);
  }
  
  console.log(sprite1.x);
}

//spawnfood function.
function spawnfood() {
  if (frameCount % 1000 === 0) {
    //Creating a banana sprite after every 1000 frames.
    var banana = createSprite(410, 240, 10, 10);
    //Giving x velocity to it.
    if(score <= 350) {
      banana.velocityX = scene.velocityX - 0.15;
    }
    else if(score > 350) {
      banana.velocityX = -(3 + 3 * score / 400);
    }
    //Adjusting its size.
    banana.scale = 0.06;
    //Adding image to it.
    banana.addImage(bananaImage);
    //Giving lifetime to it.
    banana.lifetime = 225;
    
    //Adjusting its depth.
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //Adding it to the bananagroup.
    banana.addToGroup(bananaGroup);
  }
}

//spawngrass function.
function spawngrass() {
  if (frameCount % 200 === 0 && score > 1000) {
    //Creating a grass sprite after every 200 frames and when score > 1000. 
    var grass = createSprite(Math.round(random(410, 500)), 328, 10, 10);
    //Giving x velocity to it.
    grass.velocityX = -(3 + 3 * score / 400);
    //Adding image to it.
    grass.addImage(grassImage);

    //Adjusting its depth.
    grass.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //Adding it to the grassgroup.
    grass.addToGroup(grassGroup);
  }
}

//spawnobstacles function
function spawnObstacles() {
  //Creating two obstacle sprites, one after every 80 frames and if score > 100 and another after every 50 frames and if score > 1000.
  //Giving x velocity to them.
  //Adjusting their size.
  //Adding image to them.
  //Giving a lifetime to them.
  //Setting a collider for each one of them.
  //Adding them to the obstaclegroup.
  //Adjusting their depth.

  if (frameCount % 80 === 0 && score > 100) {
    var obstacle = createSprite(420, 320, 10, 10);
    if(score <= 350) {
      obstacle.velocityX = scene.velocityX - 0.15;
    }
    else if(score > 350) {
      obstacle.velocityX = -(3 + 3 * score / 400);
    }
    obstacle.scale = 0.15;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 225;
    obstacle.setCollider("circle", 0, 10, 120);
    obstacle.addToGroup(obstacleGroup);

    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  } 
  else if (frameCount % 50 === 0 && score > 1000) {
    var obstacle2 = createSprite(420, 320, 10, 10);
    obstacle2.velocityX = -(3 + 3 * score / 400);
    obstacle2.scale = 0.15;
    obstacle2.addImage(obstacleImage);
    obstacle2.lifetime = 225;
    obstacle2.setCollider("circle", 0, 10, 120);

    obstacle2.addToGroup(obstacleGroup);

    obstacle2.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

//reset function.
function reset() {
  //Setting gameState as "level_select".
  gameState = "level_select";
  
  //Playing sound effect.
  click.play();
  
  //Changing score and life's value.
  score = 0;
  life = 1;
  
  //Making monkey invisible.
  monkey.visible = false;
  //Changing its animation.
  monkey.changeAnimation("running");
  
  //Making scene, scene2, scene3 and ground invisible.
  scene.visible = false;
  scene2.visible = false;
  scene3.visible = false;
  ground.visible = false;
  
  //Changing scene and scene2's x position.
  scene.x = 150;
  scene2.x = 649;
  
  //Destroying obstacleGroup, bananaGroup and grassGroup.
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  grassGroup.destroyEach();
  
  //Playing the background music.
  backgroundMusic.play();
}

//selectLevel function.
function selectLevel() {
  //Displaying text.
  fill("black");
  textStyle(NORMAL);
  textFont("cursive");
  textSize(17);
  text("Select your level:", 10, 50);
  textSize(16);
  text("Back", 360, 50);
  
  //Creating 5 sprites for different levels.
  //Adding image to them.
  //Giving them a lifetime.
  //Adjusting their size.
  
  var level1 = createSprite(80, 120, 10, 10);
  level1.addImage(levelButton);
  level1.lifetime = 1;
  level1.scale = 0.37;

  var level2 = createSprite(320, 120, 10, 10);
  level2.lifetime = 1;
  if (levelsCompleted >= 1) {
    level2.addImage(levelButton);
    level2.scale = 0.37;
  } else {
    level2.addImage(lock);
    level2.scale = 1.5;
  }

  var level3 = createSprite(200, 200, 10, 10);
  level3.lifetime = 1;
  if (levelsCompleted >= 2) {
    level3.addImage(levelButton);
    level3.scale = 0.37;
  } else {
    level3.addImage(lock);
    level3.scale = 1.5;
  }

  var level4 = createSprite(80, 280, 10, 10);
  level4.lifetime = 1;
  if (levelsCompleted >= 3) {
    level4.addImage(levelButton);
    level4.scale = 0.37;
  } else {
    level4.addImage(lock);
    level4.scale = 1.5;
  }

  var level5 = createSprite(320, 280, 10, 10);
  level5.lifetime = 1;
  if (levelsCompleted >= 4) {
    level5.addImage(levelButton);
    level5.scale = 0.37;
  } else {
    level5.addImage(lock);
    level5.scale = 1.5;
  }
  
  //Creating a sprite for endless mode if levelsCompleted >= 3.
  if (levelsCompleted >= 3) {
    var endlessMode = createSprite(200, 350, 10, 10);
    //Giving it a lifetime.
    endlessMode.lifetime = 1;
    //Adding image to it.
    endlessMode.addImage(endless_mode);
    //Adjusting its size.
    endlessMode.scale = 0.37;
    
    //Assigning functions when mouse is pressed over endlessMode.
    if(mousePressedOver(endlessMode)) {
      //Changing gameState to "start".
      gameState = "start";
      //Changing the value of target.
      target = "0     [Endless Mode]";
      //Playing the sound effect.
      click.play();
    }
  }
  
  //Assigning different functions when mouse is pressed over different levels.
  
  if (mousePressedOver(level1)) {
    gameState = "start";
    target = 350;
    if(levelsCompleted === 0) {  
      currentLevel = 1;
    }
  }

  if (mouseWentDown("leftButton") && mouseIsOver(level1)) {
    click.play();
  }

  if (mousePressedOver(level2)) {
    if (levelsCompleted >= 1) {
      gameState = "start";
      target = 700;
    }
    
    if(levelsCompleted === 1) {
       currentLevel = 2;
    }

    if (mouseWentDown("leftButton") && mouseIsOver(level2)) {
      click.play();
    }
  }

  if (mousePressedOver(level3)) {
    if (levelsCompleted >= 2) {
      gameState = "start";
      target = 1200;
    }
    if(levelsCompleted === 2) {
       currentLevel = 3;
    }
    
    if (mouseWentDown("leftButton") && mouseIsOver(level3)) {
      click.play();
    }
  }

  if (mousePressedOver(level4)) {
    if (levelsCompleted >= 3) {
      gameState = "start";
      target = 1900;
    }
    
    if(levelsCompleted === 3) {
       currentLevel = 4;
    }
    
    if (mouseWentDown("leftButton") && mouseIsOver(level4)) {
      click.play();
    }
  }

  if (mousePressedOver(level5)) {
    if (levelsCompleted >= 4) {
      gameState = "start";
      target = 2500;
    }
    
    if(levelsCompleted === 4) {
       currentLevel = 5;
    }
    
    if (mouseWentDown("leftButton") && mouseIsOver(level5)) {
      click.play();
    }
  }
  
  //Creating a sprite named back2.
  var back2 = createSprite(380, 20, 10, 10);
  //Adding image to it.
  back2.addImage(backButton);
  //Giving it a lifetime.
  back2.lifetime = 1;
  //Adjusting its size.
  back2.scale = 0.07;
  
  //Changing gameState to "instructions" and playing sound effect when mouse is pressed over back2. 
  if (mousePressedOver(back2)) {
    gameState = "instructions";
    click.play();
  }
}