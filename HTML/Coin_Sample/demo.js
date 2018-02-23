(function draw() {
    var coin,
		coinImage,
		canvas;
    function gameLoop(){
        coin.render();
    };
    function sprite(options){
      var that = {};
      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;
      that.render = function () {
          // Draw the animation
          that.context.drawImage(that.image,0,0,that.width,that.height, 0,0,that.width,that.height);
      };
      return that;
    };


// Get canvas
    canvas = document.getElementById("canvas");
    canvas.width = 100;
    canvas.height = 100;
 // Create sprite sheet
    coinImage = new Image();

    coin = sprite({
          context:canvas.getContext("2d");
          width: 1000;
          height: 100;
          image: coinImage;
    });
    coinImage.addEventListener('load',gameLoop);
    coinImage.src = "coin-sprite-animation.png";


}());
