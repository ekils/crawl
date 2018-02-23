define(function DNA_Journey() {
    var map,
		mapImage,
        hero,
        hero_action,
        points,
        currentFrame;
    var currentX = 10;
    var currentY = 10;
    var framecount = 60;







    function gameLoop(){
        window.requestAnimationFrame(gameLoop);
        map.render();
        hero_action.render();
        hero_action.update(0.005);  //控制移動速率
        console.log("Log is working")
    }







    function mapCanvas(options){
      var that = {};
      that.context= ctx;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;
      that.render = function () {
          // Draw the animation
          that.context.drawImage(that.image,0,0,that.width,that.height, 0,0,that.width,that.height);
      };
      return that;
    }


    function sprite_hero(options){
        var that = {};

        that.context= ctx;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;
        that.hero_x = options.hero_x;
        that.hero_y = options.hero_y;
        that.render = function () {
            that.context.drawImage(that.image,that.hero_x,that.hero_y);
        };

        that.update = function (modifier) {
            if (38 in keysDown ){
                that.hero_y -= hero.speed* modifier;
                if(that.hero_y < ctx.vertialBoundaryStart) {
                    that.hero_y += hero.speed * modifier;
                }
            }
            if (40 in keysDown) { // Player holding down
                that.hero_y += hero.speed * modifier;
                if(that.hero_y > ctx.vertialBoundaryEnd) {
                    that.hero_y -= hero.speed * modifier;
                }
            }
            if (37 in keysDown ) { // Player holding left
                that.hero_x -= hero.speed * modifier;
                if(that.hero_x < ctx.horizontalBoundaryStart) {
                    that.hero_x += hero.speed * modifier;
                }
            }
            if (39 in keysDown) { // Player holding right
                that.hero_x += hero.speed * modifier;
                if(that.hero_x > ctx.horizontalBoundaryEnd){
                     that.hero_x -= hero.speed * modifier;
                }
            }
        };

        return that;
    }


    function handleMouseDown(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);
            $("#downlog").html("Coordinate:   " + "("+ mouseX + " , " + mouseY + ")");

            points = filmFrame(mouseX,mouseY,currentX,currentY,framecount);
            currentFrame = 0;
            currentX = mouseX;
            currentY = mouseY;
            alert("Going to call animate()");
            function animate() {
                //alert("Now in the animate()");
                var point = points[currentFrame++];

                if (currentFrame < points.length) {
                    timer = setTimeout(animate, 1000 / 60);
                }
            }
            animate();
    }

    function filmFrame(x1, y1, x2, y2, frames) {
        //alert("filmFrame");
	    var dx = x2 - x1;
            var dy = y2 - y1;
            //var length = Math.sqrt(dx * dx + dy * dy);
            var incrementX = dx / frames;
            var incrementY = dy / frames;
            var a =[];

            a.push({
                x: x1,
                y: y1
            });
            for (var frame = 0; frame < frames - 1; frame++) {
                a.push({
                    x: x1 + (incrementX * frame),
                    y: y1 + (incrementY * frame)
                });
            }
            a.push({
                x: x2,
                y: y2
            });
            return (a);
        }



// Get canvas

    var Context = {
        canvas: null,
        context: null,
        create: function () {
            this.canvas = document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");
            return this.context;
        }
    };

    var ctx = Context.create();
    ctx.vertialBoundaryStart = 0;
    ctx.vertialBoundaryEnd = 1000;
    ctx.horizontalBoundaryStart = 0;
    ctx.horizontalBoundaryEnd = 800+120;



 // Create sprite sheet
    mapImage = new Image();  // HTML Element
    heroImage = new Image();

    map = mapCanvas({
          width: 1300,
          height: 1300,
          image: mapImage
    });
    hero = {
        speed: 256,
        x:0,
        y:0
    };

    hero_action = sprite_hero({
          width: 1000,
          height: 1000,
          hero_x: hero.x,
          hero_y: hero.y,
          image: heroImage
    });
    mapImage.addEventListener('load',gameLoop);
    mapImage.src = "./img/map.png";
    heroImage.src = "./img/Leon.png";

    var keysDown = {};
    document.addEventListener("keydown",function (e) {
           keysDown[e.keyCode] = true;
            e.preventDefault(); //視窗不移動
        });
    document.addEventListener("keyup",function (e) {
            delete keysDown[e.keyCode];
        });

    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    document.addEventListener("mousedown",function (e) {
        handleMouseDown(e);
    })




}());

