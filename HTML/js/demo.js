define(function draw() {
    var coin,
		coinImage,
		canvas;
    function gameLoop(){
        window.requestAnimationFrame(gameLoop);
        coin.render();
        coin.update();
        console.log(
            "This is what I wnat to print : %s ," +
            "but there really has no %s",'shit','ass')


    }
    function sprite(options){
      var that = {},
          frameIndex = 0,
          tickCount = 0,
          ticksPerFrame = options.ticksPerFrame || 0,
          numberOfFrame = options.numberOfFrame || 1;

      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;


      that.update = function(){
          tickCount += 1;
          if (tickCount > ticksPerFrame){
              tickCount = 0;
              if (frameIndex < numberOfFrame -1 ){
                  frameIndex += 1;
              }
              else{
                  frameIndex = 0;
              }
          }
      };



      that.render = function () {
            // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
          // Draw the animation
          that.context.drawImage(
              that.image,
              frameIndex * that.width / numberOfFrame,
              0,
              that.width / numberOfFrame,
              that.height,
              0,
              0,
              that.width / numberOfFrame,
              that.height);
      };
      return that;
    }


// Get canvas
    canvas = document.getElementById("canvas");
    canvas.width = 100;
    canvas.height = 100;
 // Create sprite sheet
    coinImage = new Image();

    coin = sprite({
          context:canvas.getContext("2d"),
          width: 1000,
          height: 100,
          image: coinImage,
          numberOfFrame: 10,
          ticksPerFrame: 6
    });
    coinImage.addEventListener('load',gameLoop);
    coinImage.src = "./img/coin-sprite-animation.png";


}());

